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
  state = {
    images: [
      "../testImages/image2.jpg",
      "../testImages/image3.jpg",
      "../testImages/image3.jpg",
      "../testImages/image2.jpg",
      "../testImages/image2.jpg",
      "../testImages/image3.jpg",
      "../testImages/image2.jpg"
    ]
  };
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.navBarText}>My Gallery</Text>
        <ScrollView contentContainerStyle={styles.container}>
          {this.state.images.map(imageLink => {
            console.log(imageLink);
            return (
              <Image style={styles.image} source={require(`${imageLink}`)} />
            );
          })}
        </ScrollView>
        ;
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
