import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import NumberCard from "../components/NumberCard";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import StyledButton from "../components/StyledButton";

const StartScreen = ({ onStartGame }) => {
  const [inputNumber, setInputNumber] = useState("");
  const [selectedNumber, setSelectedNumber] = useState();
  const [userConfirmation, setUserConfirmation] = useState(false);
  const [btnWidth, setBtnWidth] = useState(Dimensions.get("window").width / 4);

  useEffect(() => {
    const listener = Dimensions.addEventListener("change", () => {
      setBtnWidth(Dimensions.get("window").width / 4);
    });

    return () => {
      listener?.remove();
    };
  }, []);

  const inputHandler = (inputText) => {
    inputText = inputText.replace(/[^0-9]/g, "");
    setInputNumber(inputText);
  };

  const resetHandler = () => {
    setInputNumber("");
    setUserConfirmation(false);
  };

  const confirmHandler = () => {
    const number = parseInt(inputNumber);
    if (isNaN(number) || number <= 0 || number > 99) {
      Alert.alert("Invalid Number", "The Number has to be between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }

    setUserConfirmation(true);
    setSelectedNumber(number);
    setInputNumber("");
    Keyboard.dismiss();
  };

  let confirmedMsg;
  if (userConfirmation) {
    confirmedMsg = (
      <Card style={styles.summaryContainer}>
        <BodyText>You Selected</BodyText>
        <NumberCard>{selectedNumber}</NumberCard>
        <StyledButton
          title="Start Game"
          onPress={() => onStartGame(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TitleText>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={inputHandler}
                value={inputNumber}
              />
              <View style={styles.btnContainer}>
                <View style={{ width: btnWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetHandler}
                    color={Colors.accent}
                  />
                </View>
                <View style={{ width: btnWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedMsg}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    maxWidth: "90%",
    minWidth: 300,
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  btn: {
    width: Dimensions.get("window").width / 4,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartScreen;
