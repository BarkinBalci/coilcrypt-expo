import React, { useState } from "react";
import { View, StyleSheet, SectionList, Image } from "react-native";
import { Realm } from "@realm/react";
import { Card, IconButton, Text, Menu, Surface, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Login } from "../models/Login";
import { Note } from "../models/Note";
import { Card as CardModal } from "../models/Card";
import { Identity } from "../models/Identity";
import Clipboard from "@react-native-community/clipboard";

type ItemListProps = {
  logins: Realm.Results<Login>;
  notes: Realm.Results<Note>;
  cards: Realm.Results<CardModal>;
  identities: Realm.Results<Identity>;
  onDeleteItem: (item: Login | Note) => void;
};

export const ItemList: React.FC<ItemListProps> = ({ logins, notes, cards, identities, onDeleteItem }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<Login | Note>();
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const openMenu = (item: Login | Note) => {
    setSelectedItem(item);
    setVisible((prevState) => ({ ...prevState, [item._id.toString()]: true }));
  };

  const closeMenu = () => {
    setVisible((prevState) => ({ ...prevState, [selectedItem._id.toString()]: false }));
  };

  const copyPassword = () => {
    if ("password" in selectedItem) {
      Clipboard.setString(selectedItem.password);
    }
    closeMenu();
  };

  const handleImageError = (id: string) => {
    // New function to handle image error
    setImageError((prevState) => ({ ...prevState, [id]: true }));
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "login":
        return (
          <Card key={item._id.toString()} style={styles.card} mode="contained" onPress={() => navigation.navigate("View Item", { item: item })}>
            <Card.Content>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {imageError[item._id] ? (
                  <Icon source="key" size={24} />
                ) : (
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={{ uri: `https://www.google.com/s2/favicons?sz=64&domain_url=${item.url}` }}
                    onError={() => handleImageError(item._id.toString())} // Call the new function on error
                  />
                )}
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text variant="titleSmall">{item.name}</Text>
                  <Text style={{ opacity: 0.6 }} variant="bodySmall">
                    {item.username}
                  </Text>
                </View>
                <Menu
                  visible={visible[item._id]}
                  onDismiss={closeMenu}
                  anchor={<IconButton style={{ margin: -5 }} icon="dots-vertical" onPress={() => openMenu(item)} size={24} />}
                >
                  <Menu.Item onPress={copyPassword} title="Copy" />
                  <Menu.Item onPress={() => onDeleteItem(item)} title="Delete" />
                </Menu>
              </View>
            </Card.Content>
          </Card>
        );

      case "note":
        return (
          <Card key={item._id.toString()} style={styles.card} mode="contained" onPress={() => navigation.navigate("View Item", { item: item })}>
            <Card.Content>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {imageError[item._id] ? (
                  <Icon source="note" size={24} />
                ) : (
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={{ uri: `https://www.google.com/s2/favicons?sz=64&domain_url=${item.url}` }}
                    onError={() => handleImageError(item._id.toString())} // Call the new function on error
                  />
                )}
                <Text style={{ marginLeft: 10, paddingVertical: 8, flex: 1 }} variant="titleSmall">
                  {item.name}
                </Text>
                <Menu
                  visible={visible[item._id]}
                  onDismiss={closeMenu}
                  anchor={<IconButton style={{ margin: -5 }} icon="dots-vertical" onPress={() => openMenu(item)} size={24} />}
                >
                  <Menu.Item onPress={copyPassword} title="Copy" />
                  <Menu.Item onPress={() => onDeleteItem(item)} title="Delete" />
                </Menu>
              </View>
            </Card.Content>
          </Card>
        );
      case "card":
        return (
          <Card key={item._id.toString()} style={styles.card} mode="contained" onPress={() => navigation.navigate("View Item", { item: item })}>
            <Card.Content>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {imageError[item._id] ? (
                  <Icon source="credit-card" size={24} />
                ) : (
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={{ uri: `https://www.google.com/s2/favicons?sz=64&domain_url=${item.url}` }}
                    onError={() => handleImageError(item._id.toString())} // Call the new function on error
                  />
                )}
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text variant="titleSmall">{item.name}</Text>
                  <Text style={{ opacity: 0.6 }} variant="bodySmall">
                    {item.number.replace(/(\d{6})(\d+)(?=\d{4})/g, "$1" + "*".repeat(item.number.length - 10)).replace(/(.{4})/g, "$1 ")}
                  </Text>
                </View>
                <Menu
                  visible={visible[item._id]}
                  onDismiss={closeMenu}
                  anchor={<IconButton style={{ margin: -5 }} icon="dots-vertical" onPress={() => openMenu(item)} size={24} />}
                >
                  <Menu.Item onPress={copyPassword} title="Copy" />
                  <Menu.Item onPress={() => onDeleteItem(item)} title="Delete" />
                </Menu>
              </View>
            </Card.Content>
          </Card>
        );
      case "identity":
        return (
          <Card key={item._id.toString()} style={styles.card} mode="contained" onPress={() => navigation.navigate("View Item", { item: item })}>
            <Card.Content>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {imageError[item._id] ? (
                  <Icon source="account" size={24} />
                ) : (
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={{ uri: `https://www.google.com/s2/favicons?sz=64&domain_url=${item.url}` }}
                    onError={() => handleImageError(item._id.toString())} // Call the new function on error
                  />
                )}
                <Text style={{ marginLeft: 10, paddingVertical: 8, flex: 1 }} variant="titleSmall">
                  {item.name}
                </Text>
                <Menu
                  visible={visible[item._id]}
                  onDismiss={closeMenu}
                  anchor={<IconButton style={{ margin: -5 }} icon="dots-vertical" onPress={() => openMenu(item)} size={24} />}
                >
                  <Menu.Item onPress={copyPassword} title="Copy" />
                  <Menu.Item onPress={() => onDeleteItem(item)} title="Delete" />
                </Menu>
              </View>
            </Card.Content>
          </Card>
        );
      default:
        // Default rendering or return null
        return null;
    }
  };
  const renderSectionHeader = ({ section: { title } }) => <Text>{title}</Text>;

  return (
    <Surface style={styles.content}>
      <SectionList
        sections={[
          { title: "Credentials", data: Array.from(logins) },
          { title: "Notes", data: Array.from(notes) },
          { title: "Cards", data: Array.from(cards) },
          { title: "Identities", data: Array.from(identities) },
        ]}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(login) => login._id.toString()}
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 40,
  },
  card: {
    marginTop: 6,
    marginBottom: 4,
  },
});

export default ItemList;
