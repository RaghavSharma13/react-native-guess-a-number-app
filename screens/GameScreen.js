import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../components/Card";
import NumberCard from "../components/NumberCard";
import StyledButton from "../components/StyledButton";
import { Ionicons } from "@expo/vector-icons";
import GuessList from "../components/GuessList";

const guessRndNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNumber = Math.floor(Math.random() * (max - min)) + min;
  if (rndNumber === exclude) {
    return guessRndNumber(min, max, exclude);
  } else {
    return rndNumber;
  }
};

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = guessRndNumber(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guesses, setGuesses] = useState([initialGuess]);
  const [winHeight, setWinHeight] = useState(Dimensions.get("window").height);

  const minBound = useRef(1);
  const maxBound = useRef(100);

  useEffect(() => {
    const listener = Dimensions.addEventListener("change", () => {
      setWinHeight(Dimensions.get("window").height);
    });

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(guesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "higher" && currentGuess > userChoice)
    ) {
      Alert.alert("Heyy Don't Lie!!", "You know that was wrong...", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBound.current = currentGuess;
    } else {
      minBound.current = currentGuess + 1;
    }
    const number = guessRndNumber(
      minBound.current,
      maxBound.current,
      currentGuess
    );
    setCurrentGuess(number);
    setGuesses((currRecord) => [number, ...currRecord]);
  };

  if (winHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Choice</Text>
        <Card style={{...styles.btnContainer, ...styles.btnContainerLandscape}}>
          <StyledButton
            title={<Ionicons name="md-remove" size={18} color="white" />}
            onPress={() => nextGuessHandler("lower")}
          />
          <NumberCard>{currentGuess}</NumberCard>
          <StyledButton
            title={<Ionicons name="md-add" size={18} color="white" />}
            onPress={() => nextGuessHandler("higher")}
          />
        </Card>
        <GuessList guessList={guesses} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Choice</Text>
      <NumberCard>{currentGuess}</NumberCard>
      <Card style={styles.btnContainer}>
        <StyledButton
          title={<Ionicons name="md-remove" size={18} color="white" />}
          onPress={() => nextGuessHandler("lower")}
        />
        <StyledButton
          title={<Ionicons name="md-add" size={18} color="white" />}
          onPress={() => nextGuessHandler("higher")}
        />
      </Card>
      <GuessList guessList={guesses} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
  btnContainerLandscape:{
    padding: 10,
    marginTop: 5
  }
});

export default GameScreen;
