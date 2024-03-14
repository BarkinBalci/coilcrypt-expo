import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput, Provider as PaperProvider, Surface } from "react-native-paper";

import { Login } from "../models/Login";
import { useRealm } from "@realm/react";
import { shadows } from "../styles/shadows";

export const AddLoginScreen: React.FC<{
  logins: Realm.Results<Login & Realm.Object>;
  userId?: string;
  setShowDone: (showDone: boolean) => void;
  showDone: boolean;
  navigation: any;
}> = ({ logins, userId, setShowDone, showDone, navigation }) => {
  const realm = useRealm();
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const [url, setDescription] = React.useState("");
  const [name, setTitle] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleAddLogin = useCallback((): void => {
    if (!url || !name) {
      return;
    }

    realm.write(() => {
      return realm.create(Login, {
        name,
        url,
        username,
        password,

        userId: userId ?? "SYNC_DISABLED",
      });
    });

    navigation.goBack();
  }, [realm, userId, navigation, url, name, username, password]);

  return (
    <Surface style={styles.content}>
      <TextInput label="Name" value={name} onChangeText={setTitle} />
      <TextInput label="URL" value={url} onChangeText={setDescription} />
      <TextInput label="Username" value={username} onChangeText={setUsername} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button style={styles.button} mode="contained" onPress={handleAddLogin}>
        Add Login
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  switchPanel: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    ...shadows,
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
