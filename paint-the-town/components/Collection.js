import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { _ } from "lodash";
import * as api from "../utils/api";
import { collectionStyles } from "../styles.js";

class Collection extends Component {
  state = {
    images: null,
    loading: true
  };

  render() {
    const { navigate } = this.props.navigation;
    const { loading, images } = this.state;
    const { navBarText, text, container, image } = collectionStyles;

    return (
      <View>
        <Text style={navBarText}>My Gallery</Text>
        {loading ? (
          <ActivityIndicator color="#fa8231" />
        ) : !images ? (
          <Text style={[text, { padding: 10 }]}>
            You haven't recorded any journeys yet!
          </Text>
        ) : (
          <ScrollView contentContainerStyle={container}>
            {_.map(Object.values(images), imageLink => {
              return (
                <TouchableOpacity
                  key={imageLink.id}
                  onPress={() =>
                    navigate("ImageFromCollection", { img: imageLink })
                  }
                >
                  <Image style={image} source={{ uri: `${imageLink.img}` }} />
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
      this.setState({ images, loading: false });
    });
  }

  retrievePics = async () => {
    return await api.getPics(this.props.screenProps.currentUser);
  };
}

export default Collection;
