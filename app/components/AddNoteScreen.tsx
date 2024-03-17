import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Surface, Appbar } from "react-native-paper";
import { Note } from "../models/Note";
import { useRealm, useUser } from "@realm/react";

export const AddNoteScreen: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const realm = useRealm();
  const user = useUser();

  const [content, setDescription] = React.useState("");
  const [name, setTitle] = React.useState("");

  const handleAddNote = useCallback((): void => {
    if (!content || !name) {
      return;
    }

    realm.write(() => {
      return realm.create(Note, {
        name,
        content,
        userId: user.id,
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
