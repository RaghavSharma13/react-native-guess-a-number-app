import React from "react";
import { StyleSheet, Text } from "react-native";

const BodyText = ({ style, children }) => {
  return <Text style={{...style, ...styles.body}}>{children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans",
  },
});

export default BodyText;
