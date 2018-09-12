import React from 'react';
import {Platform, View} from 'react-native';
import MapView from 'react-native-maps'

const Polylines = ({route}) => {
    if (Platform.OS === 'android'){
      const iosRoute = getIosRoute(route)
      return (<View>
          {route.map((path, index) =>
          {
            return <MapView.Polyline
            key={index}
            coordinates={path.latLng}
            strokeWidth={path.width}
            strokeColor={path.colour}
            lineCap="round"
            linejoin="round"
            />}
          )}
        </View>
      );
    } else {
      const iosRoute = getIosRoute(route)
      return (<View>
        {iosRoute.coords.map((line, index) => {
          return <MapView.Polyline
          key={index}
          coordinates={line}
          strokeWidth={1}
          strokeColors={iosRoute.colourMap[index]}
          lineCap="round"
          linejoin="round"
          />
        })}
      </View>)
    }
};

const getIosRoute = (route) => {
  let coords = [], colourMap = [];
  route.forEach((obj, index) => {
    if (index === 0) {
      coords.push(obj.latLng);
      let currentObjColours = []
      for (let i = 0; i < obj.latLng.length; i++){
        currentObjColours.push(obj.colour)
      }
      colourMap.push(currentObjColours)
    } else if(obj.latLng[0] === route[index - 1].latLng[route[index - 1].latLng.length-1]){
      coords[coords.length -1] = coords[coords.length -1].concat(obj.latLng)
      let currentObjColours = []
      for (let i = 0; i < obj.latLng.length; i++){
        currentObjColours.push(obj.colour)
      }
      colourMap[colourMap.length-1] = colourMap[colourMap.length-1].concat(currentObjColours)
    } else {
      coords.push(obj.latLng);
      let currentObjColours = []
      for (let i = 0; i < obj.latLng.length; i++){
        currentObjColours.push(obj.colour)
      }
      colourMap.push(currentObjColours)
    }
  })
  console.log(coords)
  return {coords, colourMap}
}

export default Polylines;

// return (<View>
//   {route.forEach(path => {path.latLng.map((coords, index) =>
//   {
//     let lineCoords = {latitude: coords.latitude, longitude: coords.longitude} 
//     return <MapView.Polyline
//     key={index}
//     coordinates={lineCoords}
//     strokeWidth={path.width}
//     strokeColor={path.colour}
//     lineCap="round"
//     linejoin="round"
//     />}
//   )}
// )}
// </View>
// );