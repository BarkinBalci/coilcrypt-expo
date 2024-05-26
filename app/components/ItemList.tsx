import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, SectionList, Image } from "react-native";
import { Realm } from "@realm/react";
import { Card, IconButton, Text, Menu, Surface, Icon, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Clipboard from "@react-native-community/clipboard";
import { Cryptography } from "../libraries/cryptography";
import { Login, Note, Card as CardModel, Identity, Item } from "../models";

const ItemList: React.FC<{
  logins: Realm.Results<Login>;
  notes: Realm.Results<Note>;
  cards: Realm.Results<CardModel>;
  identities: Realm.Results<Identity>;
  onDeleteItem: (item: Item) => void;
}> = ({ logins, notes, cards, identities, onDeleteItem }) => {

  //TODO FIX ANY
  const navigation = useNavigation() as any;
  
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const sections = useMemo(
    () => [
      { title: "Logins", data: Array.from(logins) as Item[] },
      { title: "Notes", data: Array.from(notes) as Item[] },
      { title: "Cards", data: Array.from(cards) as Item[] },
      { title: "Identities", data: Array.from(identities) as Item[] },
    ],
    [logins, notes, cards, identities]
  );

  const openMenu = (item: Item) => {
    setSelectedItem(item);
    setVisible((prevState) => ({ ...prevState, [item._id.toHexString()]: true }));
  };

  const closeMenu = () => {
    setVisible((prevState) => ({
      ...prevState,
      [selectedItem?._id.toHexString()]: false,
    }));
    setSelectedItem(null);
  };

  const copyPassword = () => {
    if (selectedItem && 'password' in selectedItem) { 
      Clipboard.setString(selectedItem.password);
    }
    closeMenu();
  };

  const handleImageError = (id: string) => {
    setImageError((prevState) => ({ ...prevState, [id]: true }));
  };

  const decryptItem = async (item: Item): Promise<Item> => {
    const excludedFields = [
      "_id",
      "userId",
      "iv",
      "createdAt",
      "updatedAt",
      "favorite",
      "repromt",
      "passwordHistory",
      "type",
    ];

    const decryptedFields = {} as any;

    for (const key in item) {
      if (excludedFields.includes(key)) {
        decryptedFields[key] = item[key];
      } else if (item.iv) {
        // Only attempt decryption if 'iv' exists
        decryptedFields[key] = await Cryptography.decrypt(item[key], item.iv);
      } else {
        decryptedFields[key] = item[key];
      }
    }
    return { ...item, ...decryptedFields };
  };

  const renderItem = ({ item }: { item: Item }) => {
    const [decryptedItem, setDecryptedItem] = useState<Item | null>(null);

    useEffect(() => {
      decryptItem(item).then(setDecryptedItem);
    }, [item]);

    if (!decryptedItem) {
      return <ActivityIndicator style={{ paddingVertical: 15 }} animating={true} />;
    }

    return (
      <Card key={decryptedItem._id.toHexString()} style={styles.card} mode="contained" onPress={() => navigation.navigate("viewItem", { item: decryptedItem })} >
        <Card.Content>
          <View style={styles.itemHeader}>
            {renderItemIcon(decryptedItem)}
            {renderItemContent(decryptedItem)}
            <Menu
              visible={visible[decryptedItem._id.toHexString()] || false}
              onDismiss={closeMenu}
              anchor={<IconButton style={styles.menuButton} icon="dots-vertical" onPress={() => openMenu(decryptedItem)} size={24} />}
            >
              {/* Conditionally render Copy option */}
              { 'password' in decryptedItem && <Menu.Item onPress={copyPassword} title="Copy" />}
              <Menu.Item onPress={() => onDeleteItem(item)} title="Delete" />
            </Menu>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderItemIcon = (item: Item) => {
    switch (item.type) {
      case "login":
        return imageError[item._id.toHexString()] ? (
          <Icon source="key" size={24} />
        ) : (
          <Image
            style={styles.icon}
            source={{
              uri: `https://www.google.com/s2/favicons?sz=64&domain_url=${item.url}`,
            }}
            onError={() => handleImageError(item._id.toHexString())}
          />
        );
      case "note":
        return <Icon source="note" size={24} />;
      case "card":
        return <Icon source="credit-card" size={24} />;
      case "identity":
      default:
        return <Icon source="account" size={24} />;
    }
  };

  const renderItemContent = (item: Item) => (
    <View style={styles.itemContent}>
      <Text variant="titleSmall">{item.name}</Text>
      {renderItemSubtitle(item)}
    </View>
  );

  const renderItemSubtitle = (item: Item) => {
    switch (item.type) {
      case "login":
        return <Text style={styles.subtitle}>{item.username}</Text>;
      case "card":
        return 'number' in item && item.number ? (
          <Text style={styles.subtitle}>
            {item.number.length >= 10
              ? item.number.replace(/(\d{6})(\d+)(?=\d{4})/g, "$1" + "*".repeat(item.number.length - 10)).replace(/(.{4})/g, "$1 ")
              : item.number}
          </Text>
        ) : null;
      default:
        return null;
    }
  };

  const renderSectionHeader = ({ section: { title, data } }: { section: { title: string; data: Item[] } }) => {
    return data.length > 0 ? <Text>{title}</Text> : null;
  };

  return (
    <Surface style={styles.content}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item._id.toHexString()}
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
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 24,
    height: 24,
  },
  itemContent: {
    marginLeft: 10,
    flex: 1,
  },
  subtitle: {
    opacity: 0.6,
    variant: "bodySmall",
  },
  menuButton: {
    margin: -5,
  },
});

export default ItemList;