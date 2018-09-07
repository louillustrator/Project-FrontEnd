import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps'

const Polylines = ({route}) => {
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
};

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