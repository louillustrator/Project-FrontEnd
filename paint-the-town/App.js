import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./components/HomeScreen";
import Tracker from "./components/Tracker";
import Collection from "./components/Collection";
import ColourPicker from "./components/ColourPicker";
import ImageFromCollection from "./components/ImageFromCollection";

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
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
    ImageFromCollection: ImageFromCollection
  },
  {
    intialRouteName: "Home"
  }
);
