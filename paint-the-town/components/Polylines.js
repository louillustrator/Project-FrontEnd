import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps'

const Polylines = ({route}) => {
    return (<View>
        {route.map((lineObj, index) => 
        {return <MapView.Polyline
          key={index}
          coordinates={lineObj.line}
          strokeWidth={lineObj.width}
          strokeColor={lineObj.colour}
          lineCap="round"
          linejoin="round"
          />}
        )}
      </View>
);
};

export default Polylines;