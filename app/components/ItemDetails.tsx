import { Divider, FAB, IconButton, Surface, Text } from "react-native-paper";
import { StyleSheet, Linking } from "react-native";
import Clipboard from "@react-native-community/clipboard";
import React, { useState } from "react";
import { Item } from "../models";

export default function ItemDetailsScreen({ route, navigation }) {
  const { item }: { item: Item } = route.params;
  const [showField, setVisibility] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  const copyToClipboard = (text) => Clipboard.setString(text);

  const openURL = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const toggleVisibility = () => setVisibility(!showField);
  const toggleCardNumberVisibility = () => setShowCardNumber(!showCardNumber);

  const formatCardNumber = (number) => {
    return showCardNumber
      ? number.replace(/(.{4})/g, "$1 ") // e.g 1234 5678 1234 5678
      : `${number.slice(0, 4)} •• •••• ${number.slice(-4)}`; // e.g 1234 56** **** 5678
  };

  const renderField = (label, value, isSensitive = false, isURL = false) => (
    <>
      <Surface mode="flat" style={styles.surfaceRow}>
        <Surface mode="flat">
          <Text style={styles.label} variant="labelSmall">
            {label}
          </Text>
          <Text variant="bodyLarge">{isSensitive && !showField ? "•••" : value}</Text>
        </Surface>
        <Surface mode="flat" style={styles.surfaceRow}>
          {(isSensitive || isURL) && (
            <>
              {isSensitive && <IconButton icon={showField ? "eye-off" : "eye"} onPress={toggleVisibility} />}
              {isURL && <IconButton icon="web" onPress={() => openURL(value)} />}
            </>
          )}
          <IconButton icon="content-copy" onPress={() => copyToClipboard(value)} />
        </Surface>
      </Surface>
      <Divider />
    </>
  );

  const renderCommonFields = () => (
    <>
      <Text style={styles.label} variant="labelSmall">
        Last Updated: {new Date(item.updatedAt).toLocaleString()}
      </Text>
      <Text style={styles.label} variant="labelSmall">
        Created: {new Date(item.createdAt).toLocaleString()}
      </Text>
      <FAB icon="pen" style={styles.fab} onPress={() => navigation.navigate("upsertItem", { item: item })} />
    </>
  );

  switch (item.type) {
    case "login":
      return (
        <Surface style={styles.surface}>
          {renderField("Name", item.name)}
          {renderField("Username", item.username)}
          {renderField("Password", item.password, true)}
          {renderField("URL", item.url, false, true)}
          {renderCommonFields()}
        </Surface>
      );
    case "note":
      return (
        <Surface style={styles.surface}>
          {renderField("Name", item.name)}
          {renderField("Content", item.content)}
          {renderCommonFields()}
        </Surface>
      );
    case "card":
      return (
        <Surface style={styles.surface}>
          {renderField("Name", item.name)}
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Number
              </Text>
              <Text variant="bodyLarge">{formatCardNumber(item.number)}</Text>
            </Surface>
            <Surface mode="flat" style={styles.surfaceRow}>
              <IconButton icon={showCardNumber ? "eye-off" : "eye"} onPress={toggleCardNumberVisibility} />
              <IconButton icon="content-copy" onPress={() => copyToClipboard(item.number)} />
            </Surface>
          </Surface>
          <Divider />
          {renderField("Expiration Date", item.expirationDate.replace(/(\d{2})(\d{2})/, "$1/$2"))}
          {renderField("CVV", item.cvv, true)}
          {renderCommonFields()}
        </Surface>
      );
    case "identity":
      return (
        <Surface style={styles.surface}>
          {renderField("Name", item.name)}
          {renderField("First Name", item.firstName)}
          {renderField("Middle Name", item.middleName)}
          {renderField("Last Name", item.lastName)}
          {renderField("Date of Birth", item.dateOfBirth)}
          {renderField("Identity Number", item.identityNumber)}
          {renderField("Email", item.email)}
          {renderField("Phone", item.phone)}
          {renderCommonFields()}
        </Surface>
      );
    default:
      return (
        <Surface style={styles.surface}>
          <Text>Unknown item type</Text>
        </Surface>
      );
  }
}

const styles = StyleSheet.create({
  surface: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  surfaceRow: {
    elevation: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    opacity: 0.6,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});