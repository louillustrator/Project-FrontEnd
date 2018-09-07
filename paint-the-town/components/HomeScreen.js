import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

class HomeScreen extends React.Component {
  state = {
    clicked: false
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.login}>
          <Text >Hi {this.props.screenProps.currentUser}</Text>
          <Button
          title={"Log Out"}
          accessibilityLabel={"Log Out"}
          color={"#786fa6"}
          onPress={this.logout}
          />
        </View>
        <Text>Hello I'm the homescreen</Text>
        <Button
          title={"Start Route"}
          accessibilityLabel={"Start Route"}
          color={"#786fa6"}
          onPress={() => this.props.navigation.navigate("Tracker")}
        />
      </View>
    );
  }
  logout = () => {
    this.props.screenProps.updateUser("");
    this.props.navigation.navigate("LoginOut")
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  login: {
    fontSize: 20,
   alignSelf: "flex-end",
   color: "white",
   position: "absolute",
   top: "2%",
   right: "5%"
  }
});

export default HomeScreen;
