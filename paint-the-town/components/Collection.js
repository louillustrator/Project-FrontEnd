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
import * as api from "../utils/api";

class Collection extends Component {
  state = {
    images: null,
    loading: true
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.view}>
        <Text style={styles.navBarText}>My Gallery</Text>
        {this.state.loading ? (
          <ActivityIndicator color="#fa8231" />
        ) : !this.state.images ? (
          <Text style={[styles.text, { padding: 10 }]}>
            You haven't recorded any journeys yet!
          </Text>
        ) : (
          <ScrollView contentContainerStyle={styles.container}>
            {_.map(Object.values(this.state.images), imageLink => {
              return (
                <TouchableOpacity
                  key={imageLink.id}
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
      if (images) this.setState({ images, loading: false });
      else this.setState({ loading: false });
    });
  }

  retrievePics = async () => {
    const { currentUser } = this.props.screenProps;

    let images = await api.getPics(currentUser);

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
