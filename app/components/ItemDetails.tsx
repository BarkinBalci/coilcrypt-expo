import { Divider, FAB, IconButton, Surface, Text } from "react-native-paper";
import { StyleSheet, Linking } from "react-native";
import Clipboard from "@react-native-community/clipboard";
import React, { useState } from "react";

export default function ItemDetailsScreen({ route }) {
  const { login } = route.params;
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  const openURL = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Surface style={styles.surface}>
      <Surface mode="flat" style={styles.surfaceRow}>
        <Surface mode="flat">
          <Text variant="labelSmall">Name</Text>
          <Text variant="bodyLarge">{login.name}</Text>
        </Surface>
        <IconButton icon="content-copy" onPress={() => copyToClipboard(login.name)} />
      </Surface>
      <Divider />
      <Surface mode="flat" style={styles.surfaceRow}>
        <Surface mode="flat">
          <Text variant="labelSmall">Username</Text>
          <Text variant="bodyLarge">{login.username}</Text>
        </Surface>
        <IconButton icon="content-copy" onPress={() => copyToClipboard(login.username)} />
      </Surface>
      <Divider />
      <Surface mode="flat" style={styles.surfaceRow}>
        <Surface mode="flat">
          <Text variant="labelSmall">Password</Text>
          <Text variant="bodyLarge">{showPassword ? login.password : "••••••••"}</Text>
        </Surface>
        <Surface mode="flat" style={styles.surfaceRow}>
          <IconButton icon={showPassword ? "eye-off" : "eye"} onPress={togglePasswordVisibility} />
          <IconButton icon="content-copy" onPress={() => copyToClipboard(login.password)} />
        </Surface>
      </Surface>
      <Divider />
      <Surface mode="flat" style={styles.surfaceRow}>
        <Surface mode="flat">
          <Text variant="labelSmall">URL</Text>
          <Text variant="bodyLarge">{login.url}</Text>
        </Surface>
        <Surface mode="flat" style={styles.surfaceRow}>
          <IconButton icon="web" onPress={() => openURL(login.url)} />
          <IconButton icon="content-copy" onPress={() => copyToClipboard(login.url)} />
        </Surface>
      </Surface>
      <Text variant="labelSmall">Last Updated: {new Date(login.updatedAt).toLocaleString()}</Text>
      <Text variant="labelSmall">Created: {new Date(login.createdAt).toLocaleString()}</Text>
      <FAB icon="pen" style={styles.fab} onPress={() => console.log("Edit Pressed")} />
    </Surface>
  );
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
  surfaceCol: {
    elevation: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
