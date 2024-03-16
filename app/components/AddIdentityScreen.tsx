import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput, Surface, Appbar } from "react-native-paper";
import { useRealm, useUser } from "@realm/react";
import { Identity } from "../models/Identity";

export const AddIdentityScreen: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const realm = useRealm();
  const user = useUser();

  const [name, setTitle] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [identityNumber, setIdentityNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleAddIdentity = useCallback((): void => {
    if (!name) {
      return;
    }

    realm.write(() => {
      return realm.create(Identity, {
        name,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        identityNumber,
        email,
        phone,
        userId: user.id,
      });
    });

    navigation.goBack();
  }, [realm, navigation, name, firstName, middleName, lastName, dateOfBirth, identityNumber, email, phone]);

  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Identity" />
        <Appbar.Action icon="plus" onPress={handleAddIdentity} />
      </Appbar.Header>
      <Surface style={styles.content}>
        <TextInput mode="outlined" label="Name" value={name} onChangeText={setTitle} />
        <TextInput mode="outlined" label="First Name" value={firstName} onChangeText={setFirstName} />
        <TextInput mode="outlined" label="Middle Name" value={middleName} onChangeText={setMiddleName} />
        <TextInput mode="outlined" label="Last Name" value={lastName} onChangeText={setLastName} />
        <TextInput mode="outlined" label="Date of Birth" value={dateOfBirth} onChangeText={setDateOfBirth} />
        <TextInput mode="outlined" label="Identity Number" value={identityNumber} onChangeText={setIdentityNumber} />
        <TextInput mode="outlined" label="Email" value={email} onChangeText={setEmail} />
        <TextInput mode="outlined" label="Phone" value={phone} onChangeText={setPhone} />
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
