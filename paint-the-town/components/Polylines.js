import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

const Polylines = ({ route }) => {
  return (
    <View>
      {route.map((path, index) => {
        const { latLng, width, colour } = path;
        return (
          <MapView.Polyline
            key={index}
            coordinates={latLng}
            strokeWidth={width}
            strokeColor={colour}
            lineCap="round"
            linejoin="round"
          />
        );
      })}
    </View>
  );
};

export default Polylines;
