import React from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import ErrorBoundary from './error.boundary'

export default class CameraPage extends React.Component {
    camera = null;
    state = {
        captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        const status = await this.handleUpload(photoData)
        const capture = {data: photoData, status}
        this.setState({ capturing: false, captures: [capture, ...this.state.captures] })
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        const status = await this.handleUpload(videoData)
        const capture = {data:videoData, status}
        this.setState({ capturing: false, captures: [capture, ...this.state.captures] });
    };

    handleUpload = async(data) =>{
        const status = [
            true,
           false,
          ]
          
        return status[Math.floor(Math.random() * status.length)];

        try {
        await fetch('http://example.com', {
          method: "post",
          body: data
        });
      } catch (e) {
        console.error(e);
      }
    }

    async componentDidMount() {
        const camera = await Camera.requestPermissionsAsync();
        const audio = await Audio.requestPermissionsAsync();
        const hasCameraPermission = (camera.status === 'granted' && audio.status ==='granted');
        this.setState({ hasCameraPermission });
    };

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing,captures} = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
            <View>
                <Camera
                    type = {cameraType}
                    flashMode ={flashMode}
                    style={styles.preview}
                    ref={camera => this.camera = camera}
                />
            </View>
            <ErrorBoundary>
            {captures.length > 0 && <Gallery captures={captures}/>}
            </ErrorBoundary>
            <Toolbar
            capturing={capturing}
            flashMode={flashMode}
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
    };
};