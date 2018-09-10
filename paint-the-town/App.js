import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./components/HomeScreen";
import Tracker from "./components/Tracker";
import Collection from "./components/Collection";
import ColourPicker from "./components/ColourPicker";
import LoginOut from "./components/LoginOut";
import ImageFromCollection from "./components/ImageFromCollection";
import { config } from "./config";
import firebase from "firebase";

firebase.initializeApp(config);

export default class App extends React.Component {
  state = {
    currentUser: ""
  };
  render() {
    return (
      <RootStack
        screenProps={{
          currentUser: this.state.currentUser,
          updateUser: this.updateUser
        }}
      />
    );
  }

  componentDidMount() {
    return AsyncStorage.getItem("currentUser").then(currentUser => {
      if (currentUser) {
        this.setState({
          currentUser
        });
      }
    });
  }

  updateUser = currentUser => {
    AsyncStorage.setItem("currentUser", currentUser);
    this.setState({
      currentUser
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Tracker: Tracker,
    Collection: Collection,
    ColourPicker: ColourPicker,
    LoginOut: LoginOut,
    ImageFromCollection: ImageFromCollection
  },
  {
    initialRouteName: "LoginOut"
  }
);
