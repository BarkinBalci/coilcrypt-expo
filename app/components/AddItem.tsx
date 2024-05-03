import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Surface, Appbar } from "react-native-paper";
import TextInputMask from "react-native-text-input-mask";
import { useRealm, useUser } from "@realm/react";
import { Cryptography } from "../libraries/cryptography";
import { v4 as uuidv4 } from "uuid";

const AddItemScreen = ({ navigation, model, fields, labels, maskedFields = [] }) => {
  const realm = useRealm();
  const user = useUser();
  const [formData, setFormData] = useState({});

  const handleAddItem = useCallback(async () => {
    if (Object.values(formData).some((value) => !value)) {
      return;
    }

    const iv = uuidv4().replace(/-/g, "");
    const encryptedFields = {};

    for (const key of fields) {
      encryptedFields[key] = await Cryptography.encrypt(formData[key], iv);
    }

    realm.write(() => {
      return realm.create(model, {
        userId: user.id,
        iv,
        ...encryptedFields,
      });
    });
    navigation.goBack();
  }, [realm, navigation, formData, model, fields]);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

const renderInput = (key: string, label: string, isMasked = false) => {
  const inputProps: { mode: "outlined" | "flat"; label: string; value: string; onChangeText: (value: string) => void } = {
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

  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`Add ${model}`} />
        <Appbar.Action icon="plus" onPress={handleAddItem} />
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

export const AddCardScreen = ({ navigation }) => {
  const fields = ["name", "ownerName", "number", "expirationDate", "cvv"];
  const labels = {
    name: "Name",
    ownerName: "Owner Name",
    number: "Number",
    expirationDate: "Expiration Date",
    cvv: "CVV",
  };
  const maskedFields = [
    { key: "number", mask: "[0000] [0000] [0000] [0000]" },
    { key: "expirationDate", mask: "[00]/[00]" },
    { key: "cvv", mask: "[000]"}
  ];
  return <AddItemScreen navigation={navigation} model="Card" fields={fields} labels={labels} maskedFields={maskedFields} />;
};

export const AddLoginScreen = ({ navigation }) => {
    const fields = ["name", "url", "username", "password"]
    const labels = {
        name:  "Name",
        url: "URL",
        username: "Username",
        password: "Password"
    }
    return <AddItemScreen navigation={navigation} model="Login" fields={fields} labels={labels} />;
}

export const AddNoteScreen = ({ navigation }) => {
  const fields = ["name", "content"];
  const labels = {
    name: "Name",
    content: "Content",
  };
  return <AddItemScreen navigation={navigation} model="Note" fields={fields} labels={labels} />;
};

export const AddIdentityScreen = ({ navigation }) => {
  const fields = ["name", "firstName", "middleName", "lastName", "dateOfBirth", "identityNumber", "email", "phone"];
  const labels = {
    name: "Name",
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    dateOfBirth: "Date of Birth",
    identityNumber: "Identity Number",
    email: "Email",
    phone: "Phone",
  };
  return <AddItemScreen navigation={navigation} model="Identity" fields={fields} labels={labels} />;
};
