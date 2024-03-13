import React, { useEffect, useState } from "react";
import { useApp, useAuth, useQuery, useRealm, useUser } from "@realm/react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider, BottomNavigation, Searchbar, Appbar, Title, Paragraph, useTheme } from "react-native-paper";
import BottomNavigator from "./components/BottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { Login } from "./models/Login";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import { AddLoginScreen } from "./components/LoginManager";

enableScreens();

const Stack = createStackNavigator();

const SearchScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen</Text>
    </View>
  );
};

function ItemDetailsScreen({ route }) {
  const { login } = route.params;

  return (
    <View style={{ marginTop: 20, marginHorizontal: 20 }}>
      <Title>{login.name}</Title>
      <Paragraph>{login.url}</Paragraph>
      <Paragraph>{login.username}</Paragraph>
      <Paragraph>{login.password}</Paragraph>
    </View>
  );
}

function AddNoteScreen() {
  return (
    <View>
      <Title>Add Note</Title>
      <Paragraph>Form to add a new note</Paragraph>
    </View>
  );
}

function AddCardScreen() {
  return (
    <View>
      <Title>Add Card</Title>
      <Paragraph>Form to add a new card</Paragraph>
    </View>
  );
}

function AddIdentityScreen() {
  return (
    <View>
      <Title>Add Identity</Title>
      <Paragraph>Form to add a new identity</Paragraph>
    </View>
  );
}

export const AppSync: React.FC = () => {
  const realm = useRealm();
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const paperTheme = colorScheme === "dark" ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };
  const backgroundColor = paperTheme.colors.background;
  const [showDone, setShowDone] = useState(false);
  const logins = useQuery(Login, (collection) => (showDone ? collection.sorted("createdAt") : collection.filtered("favorite == false").sorted("createdAt")), [
    showDone,
  ]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(logins);
    });
  }, [realm, logins]);

  return (
    <NavigationContainer>
      <PaperProvider theme={paperTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={BottomNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="View Item" component={ItemDetailsScreen} />
          <Stack.Screen name="Add Login" component={AddLoginScreen} />
          <Stack.Screen name="Add Note" component={AddNoteScreen} />
          <Stack.Screen name="Add Card" component={AddCardScreen} />
          <Stack.Screen name="Add Identity" component={AddIdentityScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};
