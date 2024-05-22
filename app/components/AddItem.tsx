import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Surface, Appbar } from "react-native-paper";
import TextInputMask from "react-native-text-input-mask";
import { useRealm, useUser } from "@realm/react";
import { Cryptography } from "../libraries/cryptography";
import { v4 as uuidv4 } from "uuid";

const AddItemScreen = ({ navigation, route }) => {
  const { type } = route.params;
  const realm = useRealm();
  const user = useUser();
  const [formData, setFormData] = useState({});

  const fieldData = {
    card: {
      fields: ["name", "ownerName", "number", "expirationDate", "cvv"],
      labels: {
        name: "Name",
        ownerName: "Owner Name",
        number: "Number",
        expirationDate: "Expiration Date",
        cvv: "CVV",
      },
      maskedFields: [
        { key: "number", mask: "[0000] [0000] [0000] [0000]" },
        { key: "expirationDate", mask: "[00]/[00]" },
        { key: "cvv", mask: "[000]" },
      ],
    },
    login: {
      fields: ["name", "url", "username", "password"],
      labels: {
        name: "Name",
        url: "URL",
        username: "Username",
        password: "Password",
      },
    },
    note: {
      fields: ["name", "content"],
      labels: {
        name: "Name",
        content: "Content",
      },
    },
    identity: {
      fields: ["name", "firstName", "middleName", "lastName", "dateOfBirth", "identityNumber", "email", "phone"],
      labels: {
        name: "Name",
        firstName: "First Name",
        middleName: "Middle Name",
        lastName: "Last Name",
        dateOfBirth: "Date of Birth",
        identityNumber: "Identity Number",
        email: "Email",
        phone: "Phone",
      },
    },
  };

  const handleAddItem = useCallback(async () => {
    const currentData = fieldData[type];
    if (Object.values(formData).some((value) => !value)) {
      return;
    }

    const iv = uuidv4().replace(/-/g, "");
    const encryptedFields = {};

    for (const key of currentData.fields) {
      encryptedFields[key] = await Cryptography.encrypt(formData[key], iv);
    }

    realm.write(() => {
      return realm.create(
        type.charAt(0).toUpperCase() + type.slice(1), // Capitalize the model name
        {
          userId: user.id,
          iv,
          ...encryptedFields,
        }
      );
    });
    navigation.goBack();
  }, [realm, navigation, formData, type]);

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
      const mask = fieldData[type].maskedFields.find((field) => field.key === key).mask;

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
        <Appbar.Content title={`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`} />
        <Appbar.Action icon="plus" onPress={handleAddItem} />
      </Appbar.Header>
      <Surface style={styles.content}>
        {fieldData[type].fields.map((key) =>
          renderInput(
            key,
            fieldData[type].labels[key],
            fieldData[type].maskedFields?.some((field) => field.key === key)
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

export default AddItemScreen;
