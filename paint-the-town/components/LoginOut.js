import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import PropTypes from 'prop-types';
import * as api from "../utils/api";
import { Font } from "expo";
import { loginStyles } from "../styles";
class LoginOut extends Component {
  state = {
    allUsernames: [],
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    fontLoaded: false
  };
  render() {
    const {
      fontLoaded,
      passwordError,
      usernameError,
      password,
      username
    } = this.state;
    const { container, button, disabledButton, text, grey } = loginStyles;

    return fontLoaded ? (
      <View style={container}>

        <Text style={{ fontSize: 25, fontFamily: "bubblegum-sans-regular" }}>
          <Text style={{ color: "#f43d3d" }}>Paint</Text>
          <Text style={{ color: "#f7f02a" }}> the </Text>
          <Text style={{ color: "#5d67ef" }}>Town</Text>
        </Text>
        <Text style={text}>Login or Sign Up to get started</Text>
        <FormLabel labelStyle={grey}>USERNAME</FormLabel>
        <FormInput
          inputContainerStyle={grey}
          value={username}
          onChangeText={text => this.handleChange("username", text)}
        />
        <FormValidationMessage>{usernameError}</FormValidationMessage>
        <FormLabel labelStyle={grey}>PASSWORD</FormLabel>
        <FormInput
          value={password}
          secureTextEntry={true}
          onChangeText={text => this.handleChange("password", text)}
        />
        <FormValidationMessage>{passwordError}</FormValidationMessage>
        <TouchableHighlight
          style={!username || !password ? disabledButton : button}
          disabled={!username || !password}
          onPress={() => this.handleLogin()}
        >
          <Text style={grey}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={!username || !password ? disabledButton : button}
          disabled={!username || !password}
          onPress={() => this.handleSignUp()}
        >
          <Text style={grey}>Sign Up</Text>
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

  componentDidUpdate() {
    const { screenProps, navigation } = this.props;

    if (screenProps.currentUser) navigation.navigate("Home");
    api.getUsernames().then(allUsernames => {
      if (this.state.allUsernames.length !== allUsernames.length) {
        this.setState({
          allUsernames
        });
      }
    });
  }

  handleChange = (field, input) => {
    if (field === "username") {
      this.setState({
        username: input,
        usernameError: ""
      });
    } else if (field === "password") {
      this.setState({
        password: input,
        passwordError: ""
      });
    }
  };

  handleLogin = () => {
    const { username, allUsernames, password } = this.state;
    const { screenProps, navigation } = this.props;

    if (allUsernames.includes(username.toLowerCase())) {
      api.checkPassword(username.toLowerCase(), password).then(message => {
        if (message === "Password accepted") {
          screenProps.updateUser(username.toLowerCase());
          this.setState({
            username: "",
            password: ""
          });
          navigation.navigate("Home");
        } else {
          this.setState({
            passwordError: "Incorrect password"
          });
        }
      });
    } else {
      this.setState({
        usernameError: "Username not found!"
      });
    }
  };

  handleSignUp = () => {
    const { username, allUsernames, password } = this.state;
    const { navigation, screenProps } = this.props;

    if (allUsernames.includes(username.toLowerCase())) {
      this.setState({
        usernameError: "Username already exists!"
      });
    } else {
      api.addUser(username.toLowerCase(), password).then(message => {
        if (message === "OK") {
          screenProps.updateUser(username.toLowerCase());
          this.setState({
            username: "",
            password: ""
          });
          navigation.navigate("Home");
        }
      });
    }
  };
}

LoginOut.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenProps: {
    currentUser: PropTypes.string.isRequired,
    updateUser: PropTypes.func.isRequired
  }
};

export default LoginOut;
