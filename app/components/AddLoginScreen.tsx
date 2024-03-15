import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput, Surface, Appbar } from "react-native-paper";
import { Login } from "../models/Login";
import { useRealm, useUser } from "@realm/react";

export const AddLoginScreen: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const realm = useRealm();
  const user = useUser();
  
  const [url, setDescription] = React.useState("");
  const [name, setTitle] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

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

        userId: user.id,
      });
    });

    navigation.goBack();
  }, [realm, navigation, url, name, username, password]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Login" />
        <Appbar.Action icon="plus" onPress={handleAddLogin} />
      </Appbar.Header>
      <Surface style={styles.content}>
        <TextInput mode="outlined" label="Name" value={name} onChangeText={setTitle} />
        <TextInput mode="outlined" label="URL" value={url} onChangeText={setDescription} />
        <TextInput mode="outlined" label="Username" value={username} onChangeText={setUsername} />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          right={<TextInput.Icon icon={isPasswordVisible ? "eye-off" : "eye"} onPress={togglePasswordVisibility} />}
        />
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
