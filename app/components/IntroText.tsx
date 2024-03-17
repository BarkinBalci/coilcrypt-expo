import React from "react";
import { Paragraph, Button, Surface } from "react-native-paper";
import { StyleSheet, Linking } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const IntroText = () => {
  return (
    <Surface style={styles.content}>
      <Paragraph style={styles.paragraph}>Welcome to CoilCrypt</Paragraph>
      <Paragraph style={styles.paragraph}>You can start by adding a login using the button at the bottom right of the screen.</Paragraph>
      <Button
        mode="contained"
        icon={() => <Icon name="github" size={24} />}
        onPress={() => Linking.openURL("https://github.com/BarkinBalci/coilcrypt")}
        style={styles.link}
      >
        GitHub
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: 20,
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
