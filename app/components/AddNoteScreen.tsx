import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Surface, Appbar } from "react-native-paper";
import { Note } from "../models/Note";
import { useRealm, useUser } from "@realm/react";
import { Cryptography } from "../libraries/cryptography";
import { v4 as uuidv4 } from "uuid";

export const AddNoteScreen: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const realm = useRealm();
  const user = useUser();

  const [content, setDescription] = React.useState("");
  const [name, setTitle] = React.useState("");

  const handleAddNote = useCallback(async (): Promise<void> => {
    if (!content || !name) {
      return;
    }
    const iv = uuidv4().replace(/-/g, "");
    const fields = { name, content };
    const encryptedFields = {};

    for (const key in fields) {
      encryptedFields[key] = await Cryptography.encrypt(fields[key], iv);
    }
    realm.write(() => {
      return realm.create(Note, {
        userId: user.id,
        iv,
        ...encryptedFields,
      });
    });

    navigation.goBack();
  }, [realm, navigation, content, name]);

  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Note" />
        <Appbar.Action icon="plus" onPress={handleAddNote} />
      </Appbar.Header>
      <Surface style={styles.content}>
        <TextInput mode="outlined" label="Name" value={name} onChangeText={setTitle} />
        <TextInput multiline mode="outlined" label="Content" value={content} onChangeText={setDescription} />
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
