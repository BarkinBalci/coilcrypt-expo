import React, { useEffect, useState } from "react";
import { useApp, useAuth, useQuery, useRealm, useUser } from "@realm/react";
import { Appbar, Title, Paragraph, Surface, Text } from "react-native-paper";
import BottomNavigator from "./components/BottomNavigator";
import { NavigationContainer, DefaultTheme, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { Login } from "./models/Login";
import { Note } from "./models/Note";
import { Card } from "./models/Card";
import { Identity } from "./models/Identity";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import { AddLoginScreen } from "./components/AddLoginScreen";
import { AddNoteScreen } from "./components/AddNoteScreen";
import { AddCardScreen } from "./components/AddCardScreen";
import ItemDetailsScreen from "./components/ItemDetails";
import { AddIdentityScreen } from "./components/AddIdentityScreen";

enableScreens();

const Stack = createStackNavigator();

const SearchScreen: React.FC = () => {
  return (
    <Surface style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen</Text>
    </Surface>
  );
};

export const App: React.FC = () => {
  const realm = useRealm();
  const colorScheme = useColorScheme();
  const [showDone, setShowDone] = useState(false);
  const logins = useQuery(Login, (collection) => (showDone ? collection.sorted("createdAt") : collection.filtered("favorite == false").sorted("createdAt")));
  const notes = useQuery(Note, (collection) => (showDone ? collection.sorted("createdAt") : collection.filtered("favorite == false").sorted("createdAt")));
  const cards = useQuery(Card, (collection) => (showDone ? collection.sorted("createdAt") : collection.filtered("favorite == false").sorted("createdAt")));
  const identities = useQuery(Identity, (collection) =>
    showDone ? collection.sorted("createdAt") : collection.filtered("favorite == false").sorted("createdAt")
  );

  useEffect(() => {
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(logins);
      mutableSubs.add(notes);
      mutableSubs.add(cards);
      mutableSubs.add(identities);
    });
  }, [realm, logins, notes, cards, identities]);

  const Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorScheme === "dark" ? "black" : "white",
    },
  };

  return (
    <NavigationContainer theme={Theme}>
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
            header: () => {
              const navigation = useNavigation();
              return (
                <Appbar.Header>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title="View Item" />
                </Appbar.Header>
              );
            },
          }}
        />
        <Stack.Screen name="Add Login" component={AddLoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Add Note" component={AddNoteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Add Card" component={AddCardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Add Identity" component={AddIdentityScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
