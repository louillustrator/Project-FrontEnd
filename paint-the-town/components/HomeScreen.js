import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

class HomeScreen extends React.Component {
  state = {
    clicked: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello I'm the homescreen</Text>
        <Button
          title={"Start Route"}
          accessibilityLabel={"Start Route"}
          color={"#786fa6"}
          onPress={() => this.props.navigation.navigate("Tracker")}
        />
        <Button
          title={"Pick Colour"}
          accessibilityLabel={"Pick Colour"}
          color={"#786fa6"}
          onPress={() => this.props.navigation.navigate("ColourPicker")}
        />
      </View>
    );
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

export default HomeScreen;
