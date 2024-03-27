import React from "react";
import { Paragraph, Button, Surface } from "react-native-paper";
import { StyleSheet, Linking } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const IntroText = () => {
  return (
    <Surface style={styles.content}>
      <Paragraph style={styles.paragraph}>Welcome to Coilcrypt</Paragraph>
      <Paragraph style={styles.paragraph}>You can start by adding an item using the button at the bottom right of the screen.</Paragraph>
      <Button
        mode="contained"
        icon={() => <Icon name="github" size={24} />}
        onPress={() => Linking.openURL("https://github.com/BarkinBalci/coilcrypt")}
      >
        GitHub
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  paragraph: {
    marginVertical: 10,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
  },
  link: {
    fontWeight: "bold",
  },
});
