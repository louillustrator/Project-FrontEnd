import React from 'react';
import { Button } from "react-native";
import { ColorPicker } from 'react-native-color-picker';

class ColourPicker extends React.Component {
    state = {
        colour: '#3600ff',
        pickerDisplayed: false
    }
    render() {
        if (!this.state.pickerDisplayed) {
            return <Button
                title="Pick a colour"
                accessibilityLabel={"Pick Colour"}
                color={this.state.colour}
                onPress={this.showPicker}
            />  
        } else {
            return  <ColorPicker
            defaultColor={this.state.colour}
            onColorSelected={colour => this.changeColour(colour)}
            style={{flex: 1}}
          />
        }
    }
    showPicker = () => {
        this.setState({
            pickerDisplayed: true
        });
    };

    changeColour = (colour) => {
        this.setState({
            colour,
            pickerDisplayed: false
        });
    };
};

export default ColourPicker;