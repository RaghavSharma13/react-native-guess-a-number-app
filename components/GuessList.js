import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import BodyText from "./BodyText";

const listItem = (totalRounds, itemData) => {
    const round = totalRounds-itemData.index
  return (
    <View style={styles.listItem}>
      <BodyText>#{round}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
};

const GuessList = ({ guessList }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        keyExtractor={(item) => item}
        data={guessList}
        renderItem={(itemData) => listItem(guessList.length, itemData)}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: "60%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default GuessList;
