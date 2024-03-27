import React, { useCallback } from "react";
import { Appbar, Button, FAB, Surface, TextInput } from "react-native-paper";
import { Login } from "../models/Login";
import { useQuery } from "@realm/react";
import { useState } from "react";
import ItemList from "./ItemList";
import { useRealm, useUser } from "@realm/react";
import { IntroText } from "./IntroText";
import { useNavigation } from "@react-navigation/native";
import { Note } from "../models/Note";
import { Card } from "../models/Card";
import { Identity } from "../models/Identity";
import { Cryptography } from "../libraries/cryptography";

export default function Vault() {
  const realm = useRealm();
  const _handleSearch = () => {
    console.log("Search");
  };

  const _handleMore = () => console.log("Shown more");
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const [encryptionKey, setEncryptionKey] = useState(Cryptography.getEncryptionKey());
  const [masterPassword, setMasterPassword] = useState("");
  const user = useUser();
  const { open } = state;
  const navigation = useNavigation();

  const handleDeleteItem = useCallback(
    (item: Realm.Object): void => {
      realm.write(() => {
        realm.delete(item);
      });
    },
    [realm]
  );

  const handlePassword = async (password: string, email: string) => {
    await Cryptography.setEncryptionKey(password, email);
    setEncryptionKey(Cryptography.getEncryptionKey());
  };

  const logins = useQuery(Login, (collection) => collection.sorted("createdAt"));
  const notes = useQuery(Note, (collection) => collection.sorted("createdAt"));
  const cards = useQuery(Card, (collection) => collection.sorted("createdAt"));
  const identity = useQuery(Identity, (collection) => collection.sorted("createdAt"));
  const items = [...logins, ...notes, ...cards, ...identity];
  return (
    <>
      {encryptionKey === undefined ? (
        <>
          <Appbar.Header>
            <Appbar.Content title="Verify master password" />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
          </Appbar.Header>
          <Surface style={{ padding: 20, flex: 1 }}>
            <TextInput
              onChangeText={setMasterPassword}
              value={masterPassword}
              label={"Master password"}
              mode="outlined"
              right={<TextInput.Icon icon={"send"} onPress={() => handlePassword(masterPassword, user.profile.email)} />}
            ></TextInput>
          </Surface>
        </>
      ) : (
        <>
          <Appbar.Header>
            <Appbar.Content title="Vault" />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
          </Appbar.Header>

          {items.length === 0 ? <IntroText /> : <ItemList logins={logins} notes={notes} cards={cards} identities={identity} onDeleteItem={handleDeleteItem} />}
          <FAB.Group
            open={open}
            visible
            icon={open ? "minus" : "plus"}
            actions={[
              {
                icon: "account",
                label: "Identity",
                onPress: () => navigation.navigate("Add Identity"),
              },
              {
                icon: "credit-card",
                label: "Card",
                onPress: () => navigation.navigate("Add Card"),
              },
              {
                icon: "note",
                label: "Note",
                onPress: () => navigation.navigate("Add Note"),
              },
              {
                icon: "key",
                label: "Login",
                onPress: () => navigation.navigate("Add Login"),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </>
      )}
    </>
  );
}
