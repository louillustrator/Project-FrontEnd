import React from "react";
import { Platform, View } from "react-native";
import MapView from "react-native-maps";

const Polylines = ({ route }) => {
  if (Platform.OS === "android") {
    const iosRoute = getIosRoute(route);
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
  } else {
    const iosRoute = getIosRoute(route);
    return (
      <View>
        {iosRoute.coords.map((line, index) => {
          return (
            <MapView.Polyline
              key={index}
              coordinates={line}
              strokeWidth={iosRoute.widthMap[index]}
              strokeColors={iosRoute.colourMap[index]}
              lineCap="round"
              linejoin="round"
            />
          );
        })}
      </View>
    );
  }
};

const getIosRoute = route => {
  let coords = [],
    colourMap = [],
    widthMap = [];
  route.forEach((obj, index) => {
    if (index === 0) {
      coords.push(obj.latLng);
      let currentObjColours = [];
      for (let i = 0; i < obj.latLng.length; i++) {
        currentObjColours.push(obj.colour);
      }
      colourMap.push(currentObjColours);
      widthMap.push(obj.width);
    } else if (
      obj.latLng[0] ===
        route[index - 1].latLng[route[index - 1].latLng.length - 1] &&
      obj.width === route[index - 1].width
    ) {
      coords[coords.length - 1] = coords[coords.length - 1].concat(obj.latLng);
      let currentObjColours = [];
      for (let i = 0; i < obj.latLng.length; i++) {
        currentObjColours.push(obj.colour);
      }
      colourMap[colourMap.length - 1] = colourMap[colourMap.length - 1].concat(
        currentObjColours
      );
    } else {
      coords.push(obj.latLng);
      let currentObjColours = [];
      for (let i = 0; i < obj.latLng.length; i++) {
        currentObjColours.push(obj.colour);
      }
      colourMap.push(currentObjColours);
      widthMap.push(obj.width);
    }
  });

  return { coords, colourMap, widthMap };
};

export default Polylines;