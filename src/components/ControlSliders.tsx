import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Slider from "@react-native-community/slider";

const ControlSliders: FC<{
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
}> = ({ width, setWidth, length, setLength }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Width: {Math.round(width)}</Text>
      <Slider
        style={styles.slider}
        step={1}
        minimumValue={0}
        maximumValue={30}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#808080"
        value={width}
        onSlidingComplete={setWidth}
      />
      <Text style={styles.text}>Length: {Math.round(length)}</Text>      
      <Slider
        style={styles.slider}
        step={1}
        minimumValue={0}
        maximumValue={12}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#808080"
        value={length}
        onValueChange={setLength}
      />
    </View>
  );
};

export default ControlSliders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
  slider: {
    width: 300,
    height: 40,
    marginBottom: 20,
  },
});