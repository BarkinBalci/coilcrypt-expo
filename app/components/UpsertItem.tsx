import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Surface, Appbar } from "react-native-paper";
import TextInputMask from "react-native-text-input-mask";
import { useRealm, useUser } from "@realm/react";
import { Cryptography } from "../libraries/cryptography";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../models";

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

const UpsertItemScreen = ({ navigation, route }) => {
  const realm = useRealm();
  const user = useUser();
  const { item, type: passedType } = (route.params as { item: Item; type: string }) || {};
  const type = item?.type || passedType || "";
  const initialFormData = item || {};
  const [formData, setFormData] = useState(initialFormData);

  const handleSaveItem = useCallback(async () => {
    if (!type || !fieldData[type]) {
      console.error("Invalid item type provided.");
      // Handle error (e.g., show an error message, navigate back)
      return;
    }

    const currentData = fieldData[type];
    const encryptedFields = {};
    const iv = uuidv4().replace(/-/g, "");
    const excludedFields = ["_id", "userId", "iv", "type", "createdAt", "updatedAt", "favorite", "repromt", "passwordHistory"];
    let updatedItem;

    for (const key of currentData.fields) {
      if (!excludedFields.includes(key)) {
        encryptedFields[key] = await Cryptography.encrypt(formData[key], item?.iv || iv);
      }
    }

    realm.write(async () => {
      if (item) {
        updatedItem = realm.create(
          type.charAt(0).toUpperCase() + type.slice(1),
          { _id: item._id, userId: user.id, iv: item.iv, createdAt: item.createdAt, updatedAt: new Date(), ...encryptedFields },
          "modified"
        );
        const decryptedFields = {};
        for (const key in updatedItem) {
          if (!excludedFields.includes(key)) {
            decryptedFields[key] = await Cryptography.decrypt(updatedItem[key], item.iv);
          }
        }
        const decryptedItem = { ...updatedItem, ...decryptedFields };

        navigation.navigate("viewItem", { item: decryptedItem });
      } else {
        realm.create(type.charAt(0).toUpperCase() + type.slice(1), {
          userId: user.id,
          iv: iv,
          ...encryptedFields,
        });
        navigation.goBack();
      }
    });
  }, [realm, navigation, formData, item, type]);

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
        <Appbar.Content title={`${item ? "Edit" : "Add"} ${type.charAt(0).toUpperCase() + type.slice(1)}`} />
        <Appbar.Action icon={item ? "content-save" : "plus"} onPress={handleSaveItem} />
      </Appbar.Header>

      <Surface style={styles.content}>
        {fieldData[type].fields.map((key) => (
          <React.Fragment key={key}>
            {renderInput(
              key,
              fieldData[type].labels[key],
              fieldData[type].maskedFields?.some((field) => field.key === key)
            )}
          </React.Fragment>
        ))}
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

export default UpsertItemScreen;
