import React from "react";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import styles from "./styles";

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default ({
  capturing = false,
  currentStatus = false,
  prediction = null,
  cameraType = CameraTypes.back,
  flashMode = CameraFlashModes.off,
  setFlashMode,
  setCameraType,
  onCaptureIn,
  onCaptureOut,
  onLongCapture,
  onShortCapture
}) => (
  <Grid
    style={
      null !== prediction
        ? [
            styles.bottomBar,
            currentStatus ? styles.greenBorder : styles.redBorder
          ]
        : ""
    }
  >
    <Row>
      <Text
        style={{
          fontSize: 20,
          alignSelf: "center",
          textAlign: "center",
          color: "white"
        }}
      >
        {currentStatus ? `Healthy: ${prediction}` : `${prediction}`}
      </Text>
    </Row>
  </Grid>
);
