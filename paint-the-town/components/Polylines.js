import React from "react";
import { Platform, View } from "react-native";
import MapView from "react-native-maps";

const Polylines = ({ route }) => {
  if (Platform.OS === "android") {
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
        <MapView.Polyline
        key={0}
        index={0}
        coordinates={iosRoute.coords[0]}
        strokeWidth={iosRoute.widthMap[0]}
        strokeColors={iosRoute.colourMap[0]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={1}
        index={1}
        coordinates={iosRoute.coords[1]}
        strokeWidth={iosRoute.widthMap[1]}
        strokeColors={iosRoute.colourMap[1]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={2}
        index={2}
        coordinates={iosRoute.coords[2]}
        strokeWidth={iosRoute.widthMap[2]}
        strokeColors={iosRoute.colourMap[2]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={3}
        index={3}
        coordinates={iosRoute.coords[3]}
        strokeWidth={iosRoute.widthMap[3]}
        strokeColors={iosRoute.colourMap[3]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={4}
        index={4}
        coordinates={iosRoute.coords[4]}
        strokeWidth={iosRoute.widthMap[4]}
        strokeColors={iosRoute.colourMap[4]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={5}
        index={5}
        coordinates={iosRoute.coords[5]}
        strokeWidth={iosRoute.widthMap[5]}
        strokeColors={iosRoute.colourMap[5]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={6}
        index={6}
        coordinates={iosRoute.coords[6]}
        strokeWidth={iosRoute.widthMap[6]}
        strokeColors={iosRoute.colourMap[6]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={7}
        index={7}
        coordinates={iosRoute.coords[7]}
        strokeWidth={iosRoute.widthMap[7]}
        strokeColors={iosRoute.colourMap[7]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={8}
        index={8}
        coordinates={iosRoute.coords[8]}
        strokeWidth={iosRoute.widthMap[8]}
        strokeColors={iosRoute.colourMap[8]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={9}
        index={9}
        coordinates={iosRoute.coords[9]}
        strokeWidth={iosRoute.widthMap[9]}
        strokeColors={iosRoute.colourMap[9]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={10}
        index={10}
        coordinates={iosRoute.coords[10]}
        strokeWidth={iosRoute.widthMap[10]}
        strokeColors={iosRoute.colourMap[10]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={11}
        index={11}
        coordinates={iosRoute.coords[11]}
        strokeWidth={iosRoute.widthMap[11]}
        strokeColors={iosRoute.colourMap[11]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={12}
        index={12}
        coordinates={iosRoute.coords[12]}
        strokeWidth={iosRoute.widthMap[12]}
        strokeColors={iosRoute.colourMap[12]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={13}
        index={13}
        coordinates={iosRoute.coords[13]}
        strokeWidth={iosRoute.widthMap[13]}
        strokeColors={iosRoute.colourMap[13]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={14}
        index={14}
        coordinates={iosRoute.coords[14]}
        strokeWidth={iosRoute.widthMap[14]}
        strokeColors={iosRoute.colourMap[14]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={15}
        index={15}
        coordinates={iosRoute.coords[15]}
        strokeWidth={iosRoute.widthMap[15]}
        strokeColors={iosRoute.colourMap[15]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={16}
        index={16}
        coordinates={iosRoute.coords[16]}
        strokeWidth={iosRoute.widthMap[16]}
        strokeColors={iosRoute.colourMap[16]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={17}
        index={17}
        coordinates={iosRoute.coords[17]}
        strokeWidth={iosRoute.widthMap[17]}
        strokeColors={iosRoute.colourMap[17]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={18}
        index={18}
        coordinates={iosRoute.coords[18]}
        strokeWidth={iosRoute.widthMap[18]}
        strokeColors={iosRoute.colourMap[18]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={19}
        index={19}
        coordinates={iosRoute.coords[19]}
        strokeWidth={iosRoute.widthMap[19]}
        strokeColors={iosRoute.colourMap[19]}
        lineCap="round"
        lineJoin="round"
        />
        <MapView.Polyline
        key={20}
        index={20}
        coordinates={iosRoute.coords[20]}
        strokeWidth={iosRoute.widthMap[20]}
        strokeColors={iosRoute.colourMap[20]}
        lineCap="round"
        lineJoin="round"
        />
    </View>);
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