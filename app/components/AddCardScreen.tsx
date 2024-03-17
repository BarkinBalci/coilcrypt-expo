import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Surface, Appbar } from "react-native-paper";
import { Card } from "../models/Card";
import { useRealm, useUser } from "@realm/react";

export const AddCardScreen: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const realm = useRealm();
  const user = useUser();

  const [name, setTitle] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  const handleAddCard = useCallback((): void => {
    if (!name) {
      return;
    }

    realm.write(() => {
      return realm.create(Card, {
        name,
        ownerName,
        number,
        expirationDate,
        cvv,
        userId: user.id,
      });
    });

    navigation.goBack();
  }, [realm, navigation, name, ownerName, number, expirationDate, cvv]);

  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Card" />
        <Appbar.Action icon="plus" onPress={handleAddCard} />
      </Appbar.Header>
      <Surface style={styles.content}>
        <TextInput mode="outlined" label="Name" value={name} onChangeText={setTitle} />
        <TextInput mode="outlined" label="Owner Name" value={ownerName} onChangeText={setOwnerName} />
        <TextInput mode="outlined" label="Number" value={number} onChangeText={setNumber} maxLength={16} />
        <TextInput mode="outlined" label="Expiration Date" value={expirationDate} onChangeText={setExpirationDate} />
        <TextInput multiline mode="outlined" label="CVV" value={cvv} onChangeText={setCvv} maxLength={3} />
      </Surface>
    </Surface>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  switchPanel: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  switchPanelText: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
  button: {
    marginTop: 10,
  },
});
