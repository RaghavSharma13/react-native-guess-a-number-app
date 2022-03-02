import React from "react";
import { StyleSheet, View } from "react-native";

const Card = ({ style, children }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
});

export default Card;
