import React from "react";
import { Image, StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import BodyText from "../components/BodyText";
import StyledButton from "../components/StyledButton";
import TitleText from "../components/TitleText";
import Colors from "../constants/Colors";

const GameOverScreen = ({ userChoice, rounds, onRestart }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is over.</TitleText>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/success.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.resultsContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed <Text style={styles.highlight}>{rounds}</Text>{" "}
            tries to guess your number{" "}
            <Text style={styles.highlight}>{userChoice}</Text>.
          </BodyText>
        </View>
        <StyledButton title="Play Again" onPress={onRestart} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    borderRadius: (Dimensions.get('window').width * 0.8)/2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultsContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
