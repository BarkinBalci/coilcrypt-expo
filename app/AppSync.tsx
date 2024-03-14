import React, { useEffect, useState } from "react";
import { useApp, useAuth, useQuery, useRealm, useUser } from "@realm/react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider, BottomNavigation, Searchbar, Appbar, Title, Paragraph, useTheme, Surface } from "react-native-paper";
import BottomNavigator from "./components/BottomNavigator";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
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
    <Surface style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen</Text>
    </Surface>
  );
};

function ItemDetailsScreen({ route }) {
  const { login } = route.params;

  return (
    <Surface style={{ paddingTop: 20, paddingHorizontal: 20, flex: 1 }}>
      <Title>{login.name}</Title>
      <Paragraph>{login.url}</Paragraph>
      <Paragraph>{login.username}</Paragraph>
      <Paragraph>{login.password}</Paragraph>
    </Surface>
  );
}

function AddNoteScreen() {
  return (
    <Surface style={{ flex: 1 }}>
      <Title>Add Note</Title>
      <Paragraph>Form to add a new note</Paragraph>
    </Surface>
  );
}

function AddCardScreen() {
  return (
    <Surface style={{ flex: 1 }}>
      <Title>Add Card</Title>
      <Paragraph>Form to add a new card</Paragraph>
    </Surface>
  );
}

function AddIdentityScreen() {
  return (
    <Surface style={{ flex: 1 }}>
      <Title>Add Identity</Title>
      <Paragraph>Form to add a new identity</Paragraph>
    </Surface>
  );
}

export const AppSync: React.FC = () => {
  const realm = useRealm();
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const paperTheme = colorScheme === "dark" ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };
  const [showDone, setShowDone] = useState(false);
  const logins = useQuery(Login, (collection) => (showDone ? collection.sorted("createdAt") : collection.filtered("favorite == false").sorted("createdAt")), [
    showDone,
  ]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(logins);
    });
  }, [realm, logins]);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorScheme === "dark" ? "black" : "white",
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={BottomNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            header: () => (
              <Appbar.Header>
                <Appbar.Content title="Search" />
              </Appbar.Header>
            ),
          }}
        />
        <Stack.Screen
          name="View Item"
          component={ItemDetailsScreen}
          options={{
            header: () => (
              <Appbar.Header>
                <Appbar.Content title="View Item" />
              </Appbar.Header>
            ),
          }}
        />
        <Stack.Screen
          name="Add Login"
          component={AddLoginScreen}
          options={{
            header: () => (
              <Appbar.Header>
                <Appbar.Content title="Add Login" />
              </Appbar.Header>
            ),
          }}
        />
        <Stack.Screen
          name="Add Note"
          component={AddNoteScreen}
          options={{
            header: () => (
              <Appbar.Header>
                <Appbar.Content title="Add Note" />
              </Appbar.Header>
            ),
          }}
        />
        <Stack.Screen
          name="Add Card"
          component={AddCardScreen}
          options={{
            header: () => (
              <Appbar.Header>
                <Appbar.Content title="Add Card" />
              </Appbar.Header>
            ),
          }}
        />
        <Stack.Screen
          name="Add Identity"
          component={AddIdentityScreen}
          options={{
            header: () => (
              <Appbar.Header>
                <Appbar.Content title="Add Identity" />
              </Appbar.Header>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
