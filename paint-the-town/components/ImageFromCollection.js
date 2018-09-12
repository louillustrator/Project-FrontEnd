import React, { Component } from "react";
import { Image, Text, View, TouchableHighlight } from "react-native";
import * as api from "../utils/api";
import { universalStyles, imageStyles } from "../styles.js";
import { Font } from "expo";

class ImageFromCollection extends Component {
  state = {
    fontLoaded: false
  };
  render() {
    const { image } = imageStyles;
    const { button, text } = universalStyles;
    let { img } = this.props.navigation.getParam("img");

    return (
      <View>
        <Image style={image} source={{ uri: img }} />
        {this.state.fontLoaded ? (
          <TouchableHighlight style={button} onPress={this.editJourney}>
            <Text style={text}>Edit Journey</Text>
          </TouchableHighlight>
        ) : null}
      </View>
    );
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
    const { navigate, getParam } = this.props.navigation;
    let { id } = getParam("img");
    api.getJourney(id).then(journey => navigate("Tracker", { journey }));
  };
}

export default ImageFromCollection;
