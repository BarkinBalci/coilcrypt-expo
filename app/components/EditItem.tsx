import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Surface, Appbar } from "react-native-paper";
import TextInputMask from "react-native-text-input-mask";
import { useRealm, useUser } from "@realm/react";
import { Cryptography } from "../libraries/cryptography";

const EditItemScreen = ({ route, navigation }) => {
  const realm = useRealm();
  const user = useUser();
  const { item, model } = route.params;
  const [formData, setFormData] = useState({ ...item });

  const handleEditItem = useCallback(async () => {

    const encryptedFields = {};
    for (const key in formData) {
      if (key !== "iv" && key !== "userId" && key !== "updatedAt" && key !== "createdAt") {
        encryptedFields[key] = await Cryptography.encrypt(formData[key], item.iv);
      }
    }
    realm.write(() => {
      realm.create(model, { id: item.id, ...encryptedFields }, "modified");
    });
    navigation.goBack();
  }, [realm, navigation, formData, model, item]);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const renderInput = (key, label, isMasked = false) => {
    const inputProps = {
      mode: "outlined",
      label,
      value: formData[key] || "",
      onChangeText: (value) => handleInputChange(key, value),
    };
        
    if (isMasked) {
      const mask = maskedFields.find((field) => field.key === key).mask;
      return (
        <TextInput
          {...inputProps}
          render={(props) => <TextInputMask {...props} mask={mask} onChangeText={(formatted, extracted) => handleInputChange(key, extracted)} />}
        />
      );
    } else {
      return <TextInput {...inputProps} />;
    }
  };

  // Replace these with the appropriate fields and masks for your item types
  const fields = ["name", "username", "password", "url"]; // Example fields for a "login" item
  const labels = {
    name: "Name",
    username: "Username",
    password: "Password",
    url: "URL",
  };
  const maskedFields = []; // Example: no masked fields for "login" item

  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`Edit ${model}`} />
        <Appbar.Action icon="content-save" onPress={async () => await handleEditItem()} />
      </Appbar.Header>

      <Surface style={styles.content}>
        {fields.map((key) =>
          renderInput(
            key,
            labels[key],
            maskedFields.some((field) => field.key === key)
          )
        )}
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
});

export default EditItemScreen;
