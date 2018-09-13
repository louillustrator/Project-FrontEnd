import React from "react";
import { StyleSheet } from "react-native";
import ActionButton from "react-native-circular-action-menu";
import Icon from "react-native-vector-icons/Ionicons";

const ActionButt = ({
  colour,
  navigation,
  changeColour,
  stop,
  start,
  pause,
  setShowSlider
}) => {
  const colourPickerFn = () => {
    navigation.navigate("ColourPicker", {
      currentColour: colour,
      changeColour: changeColour
    });
  };
  const rgb = hexToRGB(colour);
  return (
    <ActionButton
      buttonColor={rgb}
      radius={90}
      position="center"
      degrees={270}
      icon={<Icon name="md-brush" style={styles.actionButtonIcon} />}
      outRangeScale={0.8}
      style={{ position: "absolute", top: 200, left: 50, zIndex: 10 }}
    >
      <ActionButton.Item
        buttonColor="#228B22"
        title="Start"
        size={60}
        onPress={start}
        style={{ zIndex: 10 }}
      >
        <Icon name="md-play" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        title="Pause"
        size={60}
        onPress={pause}
        style={{ zIndex: 10 }}
      >
        <Icon name="md-pause" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#E74C3C"
        title="Stop"
        size={60}
        onPress={stop}
        style={{ zIndex: 10 }}
      >
        <Icon name="md-square" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor={colour || "#9b59b6"}
        title="Colour Select"
        size={60}
        onPress={colourPickerFn}
        style={{ zIndex: 10 }}
      >
        <Icon name="md-color-palette" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item 
        buttonColor='#9b59b6' 
        title="Width Select" 
        size={60} 
        onPress={() => setShowSlider(true)} 
        style={{zIndex: 10}}>
            <Icon name="md-arrow-back" style={styles.actionButtonIcon} />
            <Icon name="md-arrow-forward" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  );
};

const hexToRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},1)`;
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
    zIndex: 10
  }
});
export default ActionButt;
