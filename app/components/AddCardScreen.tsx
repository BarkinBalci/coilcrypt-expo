import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Surface, Appbar } from "react-native-paper";
import { Card } from "../models/Card";
import { useRealm, useUser } from "@realm/react";
import { Cryptography } from "../libraries/cryptography";
import { v4 as uuidv4 } from "uuid";
import TextInputMask from "react-native-text-input-mask";

export const AddCardScreen: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const realm = useRealm();
  const user = useUser();

  const [name, setTitle] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [formattedNumber, setFormattedNumber] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  const handleAddCard = useCallback(async (): Promise<void> => {
    if (!name) {
      return;
    }
    const iv = uuidv4().replace(/-/g, "");
    const fields = { name, ownerName, number, expirationDate, cvv };
    const encryptedFields = {};

    for (const key in fields) {
      encryptedFields[key] = await Cryptography.encrypt(fields[key], iv);
    }
    realm.write(() => {
      return realm.create(Card, {
        userId: user.id,
        iv,
        ...encryptedFields,
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
        <TextInput
          mode="outlined"
          label="Number"
          value={formattedNumber}
          render={(props) => (
            <TextInputMask
              {...props}
              mask="[0000] [0000] [0000] [0000]"
              onChangeText={(formatted, extracted) => {
                setFormattedNumber(formatted);
                setNumber(extracted);
              }}
            />
          )}
        />
        <TextInput
          mode="outlined"
          label="Expiration Date"
          value={expirationDate}
          onChangeText={setExpirationDate}
          render={(props) => (
            <TextInputMask
              {...props}
              mask="[00]/[00]"
            />
          )}
        />
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
