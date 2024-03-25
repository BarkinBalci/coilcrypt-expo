import { Divider, FAB, IconButton, Surface, Text } from "react-native-paper";
import { StyleSheet, Linking } from "react-native";
import Clipboard from "@react-native-community/clipboard";
import React, { useState } from "react";

export default function ItemDetailsScreen({ route }) {
  const { item } = route.params;
  const [showField, setVisibility] = useState(false);
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

  const toggleVisibility = () => {
    setVisibility(!showField);
  };
  switch (item.type) {
    case "login":
      return (
        <Surface style={styles.surface}>
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Name
              </Text>
              <Text variant="bodyLarge">{item.name}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.name)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Username
              </Text>
              <Text variant="bodyLarge">{item.username}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.username)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Password
              </Text>
              <Text variant="bodyLarge">{showField ? item.password : "••••••••"}</Text>
            </Surface>
            <Surface mode="flat" style={styles.surfaceRow}>
              <IconButton icon={showField ? "eye-off" : "eye"} onPress={toggleVisibility} />
              <IconButton icon="content-copy" onPress={() => copyToClipboard(item.password)} />
            </Surface>
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                URL
              </Text>
              <Text variant="bodyLarge">{item.url}</Text>
            </Surface>
            <Surface mode="flat" style={styles.surfaceRow}>
              <IconButton icon="web" onPress={() => openURL(item.url)} />
              <IconButton icon="content-copy" onPress={() => copyToClipboard(item.url)} />
            </Surface>
          </Surface>
          <Text style={styles.label} variant="labelSmall">
            Last Updated: {new Date(item.updatedAt).toLocaleString()}
          </Text>
          <Text style={styles.label} variant="labelSmall">
            Created: {new Date(item.createdAt).toLocaleString()}
          </Text>
          <FAB icon="pen" style={styles.fab} onPress={() => console.log("Edit Pressed")} />
        </Surface>
      );
    case "note":
      return (
        <Surface style={styles.surface}>
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Name
              </Text>
              <Text variant="bodyLarge">{item.name}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.name)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Content
              </Text>
              <Text variant="bodyLarge">{item.content}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.content)} />
          </Surface>
          <Text style={styles.label} variant="labelSmall">
            Last Updated: {new Date(item.updatedAt).toLocaleString()}
          </Text>
          <Text style={styles.label} variant="labelSmall">
            Created: {new Date(item.createdAt).toLocaleString()}
          </Text>
          <FAB icon="pen" style={styles.fab} onPress={() => console.log("Edit Pressed")} />
        </Surface>
      );
    case "card":
      return (
        <Surface style={styles.surface}>
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Name
              </Text>
              <Text variant="bodyLarge">{item.name}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.name)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Owner Name
              </Text>
              <Text variant="bodyLarge">{item.ownerName}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.ownerName)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Number
              </Text>
              <Text variant="bodyLarge">{item.number.replace(/(.{4})/g, "$1 ")}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.number)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Expiration Date
              </Text>
              <Text variant="bodyLarge">{item.expirationDate}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.expirationDate)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                CVV
              </Text>
              <Text variant="bodyLarge">{showField ? item.cvv : "•••"}</Text>
            </Surface>
            <Surface mode="flat" style={styles.surfaceRow}>
              <IconButton icon={showField ? "eye-off" : "eye"} onPress={toggleVisibility} />
              <IconButton icon="content-copy" onPress={() => copyToClipboard(item.cvv)} />
            </Surface>
          </Surface>
          <Text style={styles.label} variant="labelSmall">
            Last Updated: {new Date(item.updatedAt).toLocaleString()}
          </Text>
          <Text style={styles.label} variant="labelSmall">
            Created: {new Date(item.createdAt).toLocaleString()}
          </Text>
          <FAB icon="pen" style={styles.fab} onPress={() => console.log("Edit Pressed")} />
        </Surface>
      );
    case "identity":
      return (
        <Surface style={styles.surface}>
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Name
              </Text>
              <Text variant="bodyLarge">{item.name}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.name)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                First Name
              </Text>
              <Text variant="bodyLarge">{item.firstName}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.firstName)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Middle Name
              </Text>
              <Text variant="bodyLarge">{item.middleName}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.middleName)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Last Name
              </Text>
              <Text variant="bodyLarge">{item.lastName}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.lastName)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Date of Birth
              </Text>
              <Text variant="bodyLarge">{item.dateOfBirth}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.dateOfBirth)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Identity Number
              </Text>
              <Text variant="bodyLarge">{item.identityNumber}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.identityNumber)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Email
              </Text>
              <Text variant="bodyLarge">{item.email}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.email)} />
          </Surface>
          <Divider />
          <Surface mode="flat" style={styles.surfaceRow}>
            <Surface mode="flat">
              <Text style={styles.label} variant="labelSmall">
                Phone
              </Text>
              <Text variant="bodyLarge">{item.phone}</Text>
            </Surface>
            <IconButton icon="content-copy" onPress={() => copyToClipboard(item.phone)} />
          </Surface>
          <Text style={styles.label} variant="labelSmall">
            Last Updated: {new Date(item.updatedAt).toLocaleString()}
          </Text>
          <Text style={styles.label} variant="labelSmall">
            Created: {new Date(item.createdAt).toLocaleString()}
          </Text>
          <FAB icon="pen" style={styles.fab} onPress={() => console.log("Edit Pressed")} />
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
  surfaceCol: {
    elevation: 0,
    flexDirection: "column",
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
