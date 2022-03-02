import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Header from "./components/header.js";
import GameOverScreen from "./screens/GameOverScreen.js";
import GameScreen from "./screens/GameScreen.js";
import StartScreen from "./screens/StartScreen.js";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userChoice, setUserChoice] = useState();
  const [gameRounds, setGameRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (<AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)}
    />);
  }

  const restartGame = () => {
    setGameRounds(0);
    setUserChoice(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserChoice(selectedNumber);
    setGameRounds(0);
  };

  const gameOverHandler = (rounds) => {
    setGameRounds(rounds);
  };

  let content = <StartScreen onStartGame={startGameHandler} />;

  if (userChoice && gameRounds === 0) {
    content = (
      <GameScreen userChoice={userChoice} onGameOver={gameOverHandler} />
    );
  } else if (gameRounds > 0) {
    content = (
      <GameOverScreen
        userChoice={userChoice}
        rounds={gameRounds}
        onRestart={restartGame}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
