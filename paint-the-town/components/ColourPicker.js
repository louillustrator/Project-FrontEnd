import React from 'react';
import { ColorPicker } from 'react-native-color-picker';

const ColourPicker = ({navigation}) => {
            const currentColour = navigation.getParam("currentColour", "#3600ff");
            const changeColour = navigation.getParam("changeColour");
            return  <ColorPicker
            defaultColor={currentColour}
            onColorSelected={colour => changeColour(colour)}
            style={{flex: 1}}
          />
};

export default ColourPicker;