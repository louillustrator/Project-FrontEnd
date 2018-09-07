import React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

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
        <Ionicons name="md-walk" size={100} color="white" />

        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Tracker")}
        >
          <Text>New Journey</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Collection")}
        >
          <Text>See Collection</Text>
          {/* title=
            {"Colour Picker"}
            accessibilityLabel=
            {"Pick a colour"}
            color=
            {"#786fa6"}
            onPress=
            {() => this.props.navigation.navigate("ColourPicker")}
            containerViewStyle=
            {{ width: "100%", marginLeft: 0 }} */}
        </TouchableHighlight>
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
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#63cdda"
  },
  login: {
    fontSize: 20,
   alignSelf: "flex-end",
   color: "white",
   position: "absolute",
   top: "2%",
   right: "5%"
  },
  text: {
    fontSize: 20,
    alignSelf: "flex-end",
    color: "white",
    position: "absolute",
    top: "2%",
    right: "5%"
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    opacity: 100,
    padding: 17,
    margin: 10,
    width: "60%"
  }
});

export default HomeScreen;
