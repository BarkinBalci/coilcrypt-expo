import React, { useState } from "react";
import { View, StyleSheet, Clipboard, TouchableOpacity, ScrollView, SectionList } from "react-native";
import { Realm } from "@realm/react";
import { Card, Title, Paragraph, IconButton, Avatar, Text, Menu, Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Login } from "../models/Login";

type LoginListProps = {
  logins: Realm.Results<Login & Realm.Object>;
  onToggleLoginStatus: (login: Login & Realm.Object) => void;
  onDeleteLogin: (login: Login & Realm.Object) => void;
};

export const LoginList: React.FC<LoginListProps> = ({ logins, onDeleteLogin }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedLogin, setSelectedLogin] = useState(null);

  const openMenu = (login) => {
    setSelectedLogin(login);
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  const copyDescription = () => {
    Clipboard.setString(selectedLogin.url);
    closeMenu();
  };

  const renderItem = ({ item: login }) => (
    <Card key={login._id.toString()} style={styles.card} mode="contained" onPress={() => navigation.navigate("View Item", { login })}>
      <Card.Title
        title={login.name}
        subtitle={
        <Surface elevation={0} style={{ flexDirection: "row", alignItems: "center"}}>
            <Avatar.Image size={24} source={{ uri: `https://www.google.com/s2/favicons?sz=24&domain_url=${login.url}` }} />
            <Text style={{ marginLeft: 10, fontSize: 12, opacity: 0.6 }}>{login.url}</Text>
          </Surface>
        }
        right={(props) => (
          <Menu
            visible={visible && selectedLogin === login}
            onDismiss={closeMenu}
            anchor={<IconButton {...props} icon="dots-vertical" onPress={() => openMenu(login)} />}
          >
            <Menu.Item onPress={copyDescription} title="Copy" />
            <Menu.Item onPress={() => onDeleteLogin(login)} title="Delete" />
          </Menu>
        )}
      />
    </Card>
  );

  const renderSectionHeader = ({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>;

  return (
    <Surface style={styles.content}>
      <SectionList
        sections={[{ title: "Credentials", data: logins }]}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(login) => login._id.toString()}
        style={styles.listContainer}
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
    marginTop: 8,
  },
  card: {
    marginTop: 8,
  },
});

export default LoginList;
