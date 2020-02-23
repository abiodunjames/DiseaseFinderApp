import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  preview: {
    height: (winHeight - 4),
    width: (winWidth - 4) ,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2
  },
  greenBorder: {
    borderColor: "green",
    backgroundColor:"green"
  },
  redBorder: {
    borderColor: "red",
    backgroundColor: "red"
  },
  alignCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomToolbar: {
    width: winWidth,
    position: "absolute",
    height: 100,
    bottom: 0
  },
  bottomBar: {
    width: winWidth,
    position: "absolute",
    height: 50,
    bottom: 0,
    borderWidth:2,
    borderColor: 'white',
    color:'white'
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF"
  },
  captureBtnActive: {
    width: 80,
    height: 80
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: "red",
    borderColor: "transparent"
  },
  galleryContainer: {
    bottom: 35
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5
  },
  galleryImage: {
    width: 75,
    height: 75,
    borderWidth: 2
  }
});
