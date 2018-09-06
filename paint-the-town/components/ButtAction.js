import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';


const ButtAction = ({colour, navigation, changeColour}) => {

    const colourPickerFn = () => {
            navigation.navigate("ColourPicker", {
            currentColour: colour,
            changeColour: changeColour
          })
    }
    const rgb = {red: 231, green: 76, blue: 60, alpha: 1}
    return (
        <ActionButton buttonColor= {`rgba(${rgb.red},${rgb.green},${rgb.blue},${rgb.alpha})`} radius={90} position='center' degrees={270} icon={ <Icon name="md-brush" style={styles.actionButtonIcon}/>}outRangeScale={0.8} style={{position:'absolute', top: 200, left: 50, zIndex: 10}}>
          <ActionButton.Item buttonColor='#228B22' title="Start" size={60} onPress={() => console.log("NO SMOKING!")} style={{zIndex: 10}}>
            <Icon name="md-play" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Pause" size={60} onPress={() => {}} style={{zIndex: 10}}>
            <Icon name="md-pause" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#E74C3C' title="Stop" size={60} onPress={() => {}} style={{zIndex: 10}}>
            <Icon name="md-square" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={colour || '#9b59b6'} title="Colour Select" size={60} onPress={colourPickerFn} style={{zIndex: 10}}>
            <Icon name="md-color-palette" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
    );
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
    zIndex: 10
  }
});
export default ButtAction;