import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

class Collection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../testImages/image.jpg")}
        />
        <Image
          style={styles.image}
          source={require("../testImages/image.jpg")}
        />
        <Image
          style={styles.image}
          source={require("../testImages/image.jpg")}
        />
        <Image
          style={styles.image}
          source={require("../testImages/image.jpg")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fa983a"
  },
  image: {
    padding: 10,
    width: 200,
    height: 200
  }
});

export default Collection;
