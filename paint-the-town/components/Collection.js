import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { _ } from "lodash";
import ImageFromCollection from "./ImageFromCollection";
import config from "../config";
import firebase from "firebase";
firebase.initializeApp(config);

class Collection extends Component {
  state = {
    images: {}
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.view}>
        <Text style={styles.navBarText}>My Gallery</Text>
        {Object.keys(this.state.images).length === 0 ? (
          <ActivityIndicator
            size={70}
            color="#fa8231"
            animating={Object.keys(this.state.images).length === 0}
          />
        ) : (
          <ScrollView contentContainerStyle={styles.container}>
            {_.map(Object.values(this.state.images), imageLink => {
              return (
                <TouchableOpacity
                  key={imageLink._id}
                  onPress={() =>
                    navigate("ImageFromCollection", { img: imageLink })
                  }
                >
                  <Image
                    style={styles.image}
                    source={{ uri: `${imageLink.img}` }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
  componentDidMount() {
    this.retrievePics().then(images => {
      this.setState({ images });
    });
  }

  retrievePics = async () => {
    //we will need to check which user is logged in for this
    const user =
      (this.props.currentUser && this.props.currentUser.username) ||
      "aDifferentTaraTest";

    let images = await firebase
      .database()
      .ref(user)
      .once("value")
      .then(function(snapshot) {
        return snapshot.val();
      });
    return images;
  };
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
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Collection;
