import React, { Component } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight
} from "react-native";
import * as api from "../utils/api";
import exportStyles from "../styles.js";
import { Font } from "expo";

const { width, height } = Dimensions.get("window");

class ImageFromCollection extends Component {
  state = {
    fontLoaded: false
  };
  render() {
    const { navigate } = this.props.navigation;
    let img = this.props.navigation.getParam("img");

    return (
      <View>
        <Image style={styles.image} source={{ uri: img.img }} />
        {this.state.fontLoaded ? (
          <TouchableHighlight
            style={exportStyles.button}
            onPress={this.editJourney}
          >
            <Text style={exportStyles.text}>Edit Journey</Text>
          </TouchableHighlight>
        ) : null}
      </View>
    );

    //navigate.getParams
    //first arg is name, 2nd is a default
  }

  componentDidMount() {
    Font.loadAsync({
      "raleway-regular": require("../assets/fonts/Raleway-Regular.ttf")
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });
  }

  editJourney = () => {
    let img = this.props.navigation.getParam("img");
    api
      .getJourney(img.id)
      .then(journey => this.props.navigation.navigate("Tracker", { journey }));
  };
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
