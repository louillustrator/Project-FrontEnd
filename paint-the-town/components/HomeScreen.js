import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";
import PropTypes from 'prop-types';
import { Font } from "expo";
import { universalStyles, homeStyles } from "../styles.js";

class HomeScreen extends Component {
  state = {
    fontLoaded: false
  };

  render() {
    const { container, login, logoutButton, logText, image } = homeStyles;
    const { button, text } = universalStyles;
    const { navigate } = this.props.navigation;

    return this.state.fontLoaded ? (
      <View style={container}>
        <View style={login}>
          <Text style={logText}>Hi {this.props.screenProps.currentUser}</Text>
          <TouchableHighlight style={logoutButton} onPress={this.logout}>
            <Text style={[logText, { fontSize: 14 }]}>Log Out</Text>
          </TouchableHighlight>
        </View>

        <Image style={image} source={require("../assets/logo.png")} />
        <Text style={{ fontSize: 25, fontFamily: "bubblegum-sans-regular" }}>
          <Text style={{ color: "#f43d3d" }}>Paint</Text>
          <Text style={{ color: "#f7f02a" }}> the </Text>
          <Text style={{ color: "#5d67ef" }}>Town</Text>
        </Text>
        <TouchableHighlight style={button} onPress={() => navigate("Tracker")}>
          <Text style={text}>New Journey</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={button}
          color={"white"}
          onPress={() => navigate("Collection")}
        >
          <Text style={text}>See Collection</Text>
        </TouchableHighlight>
      </View>
    ) : null;
  }

  componentDidMount() {
    Font.loadAsync({
      "bubblegum-sans-regular": require("../assets/fonts/BubblegumSans-Regular.ttf"),
      "raleway-regular": require("../assets/fonts/Raleway-Regular.ttf")
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });
  }

  logout = () => {
    this.props.screenProps.updateUser("");
    this.props.navigation.navigate("LoginOut");
  };
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenProps: {
    currentUser: PropTypes.string.isRequired,
    updateUser: PropTypes.func.isRequired
  }
};

export default HomeScreen;
