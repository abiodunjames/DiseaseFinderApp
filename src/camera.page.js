import React from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import styles from "./styles";
import Toolbar from "./toolbar.component";
import Bar from "./bar.component";
import Gallery from "./gallery.component";
import ErrorBoundary from "./error.boundary";
import { Accelerometer } from "expo-sensors";
import uuidv4 from "uuid/v4";
import { Storage } from "aws-amplify";
import axios from "axios";

export default class CameraPage extends React.Component {
  camera = null;
  state = {
    currentStatus: false,
    prediction: "",
    borderWidth: 0,
    captures: [],
    // setting flash to be turned off by default
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    // start the back camera by default
    cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const options = { quality: 0.3 };
    this.setState({status:true})
    const photoData = await this.camera.takePictureAsync(options);
    const { status, prediction } = await this.handleUpload(photoData);
    await this.updateAppState(photoData, status, prediction);
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    const { status, prediction } = await this.handleUpload(videoData);
    await this.updateAppState(videoData, status, prediction);
  };

  async updateAppState(data, status, prediction) {
    const capture = { data, status };
    this.setState({
      capturing: false,
      captures: [capture, ...this.state.captures],
      currentStatus: status,
      prediction: prediction
    });
  }

  handleUpload = async data => {
    const baseUrl =
      "https://gram-to-store-images.s3.eu-west-1.amazonaws.com/public";
    const uuid = uuidv4();
    const { uri } = data;
    const key = `hackathon/${uuid}.jpg`;
    const image = await fetch(uri, { type: "image/jpeg" });
    const imageBlob = await image.blob();
    await Storage.put(key, imageBlob, { contentType: "image/jpeg" });
    let imageUrl = `${baseUrl}/${key}`;

    const response = await axios.post(
      "https://disease-finder-api.herokuapp.com/invocations",
      JSON.stringify({ ImageUrl: imageUrl }),
      { headers: { "Content-Type": "application/json" } }
    );
    const { prediction = "" } = response.data;
    const status = prediction.includes("healthy");

    return { status, prediction };
  };

  async onCameraReady() {
    await this.handleShortCapture();
  }

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const audio = await Audio.requestPermissionsAsync();
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";
    this.setState({ hasCameraPermission });

    Accelerometer.setUpdateInterval(2000);
    this.toggleSubscription();
  }
  async componentWillUnmount() {
    await this.unsubscribe();
  }

  toggleSubscription() {
    if (this.subscription) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  }

  async subscribe() {
    this.subscription = Accelerometer.addListener(async data => {
      const { capturing } = this.state;
      capturing ? "" : await this.handleShortCapture();
    });
  }

  async unsubscribe() {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  }
  render() {
    const {
      currentStatus,
      borderWidth,
      prediction,
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures
    } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={[styles.preview, styles.greenBorder]}
            ref={camera => (this.camera = camera)}
          />
        </View>
        <ErrorBoundary>
          {captures.length > 0 && <Gallery captures={captures} />}
        </ErrorBoundary>
        <Bar
          capturing={capturing}
          flashMode={flashMode}
          prediction={prediction}
          currentStatus={currentStatus}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}
