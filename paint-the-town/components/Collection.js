import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");

class Collection extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.navBarText}>My Gallery</Text>

        <ScrollView contentContainerStyle={styles.container}>
          <Image
            style={styles.image}
            source={require("../testImages/image2.jpg")}
          />
          <Image
            style={styles.image}
            source={require("../testImages/image3.jpg")}
          />
          <Image
            style={styles.image}
            source={require("../testImages/image3.jpg")}
          />
          <Image
            style={styles.image}
            source={require("../testImages/image2.jpg")}
          />
          <Image
            style={styles.image}
            source={require("../testImages/image2.jpg")}
          />
          <Image
            style={styles.image}
            source={require("../testImages/image3.jpg")}
          />
          <Image
            style={styles.image}
            source={require("../testImages/image2.jpg")}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#fff"
  },
  text: {
    alignSelf: "center"
  },
  image: {
    margin: 10,

    width: 160,
    height: 160
  },

  navBarText: {
    backgroundColor: "#63cdda",
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 10
  }
});

export default Collection;
