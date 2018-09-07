import React, { Component } from "react";
import { Image, Text, StyleSheet, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

class ImageFromCollection extends Component {
  render() {
    const { navigate } = this.props.navigation;
    let img = this.props.navigation.getParam("img");

    return (
      <View>
        <Image style={styles.image} source={{ uri: img.img }} />
      </View>
    );

    //navigate.getParams
    //first arg is name, 2nd is a default
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#fff"
  },
  image: {
    margin: 10,

    width: width,
    height: width
    // height: 160
  }
});

export default ImageFromCollection;
