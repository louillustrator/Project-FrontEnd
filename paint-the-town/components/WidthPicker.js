import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import Slider from 'react-native-slider';

class WidthPicker extends Component {
    state={
        width: 0
    }
    render() {
        return (
          <View style={styles.container}>
          
          <Slider 
          style={styles.slider}
          value={this.state.width}
          step={1}
          minimumValue={0}
          maximumValue={10}
          onValueChange={width => this.setState({width})}
          onSlidingComplete={this.slidingComplete}
          />
          <Text style={styles.text}>{this.state.width}</Text>
          </View>
        );
    }

    componentDidMount() {
        this.setState({
            width: this.props.currentWidth
        })
    }

    slidingComplete = () => {
        this.props.setShowSlider(false);
        this.props.setWidth(this.state.width)
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        justifyContent: 'center',    
        marginLeft: 30,
        marginRight: 30,
        zIndex: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
    },
    text: {
      fontSize: 30,
      textAlign: 'center',
    },
    slider: {
        width: 200
      },
  });

export default WidthPicker;