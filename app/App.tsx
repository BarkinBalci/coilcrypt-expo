import React, { useEffect, useState } from "react";
import { useApp, useAuth, useQuery, useRealm, useUser } from "@realm/react";
import { Appbar, Title, Paragraph, Surface, Text } from "react-native-paper";
import BottomNavigator from "./components/BottomNavigator";
import { NavigationContainer, DefaultTheme, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { Login } from "./models/Login";
import { Note } from "./models/Note";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import { AddLoginScreen } from "./components/AddLoginScreen";
import { AddNoteScreen } from "./components/AddNoteScreen";
import ItemDetailsScreen from "./components/ItemDetails";

enableScreens();

const Stack = createStackNavigator();

const SearchScreen: React.FC = () => {
  return (
    <Surface style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen</Text>
    </Surface>
  );
};

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

export const App: React.FC = () => {
  const realm = useRealm();
  const colorScheme = useColorScheme();
  const [showDone, setShowDone] = useState(false);
  const logins = useQuery(Login, (collection) => (showDone ? collection.sorted("createdAt") : collection.filtered("favorite == false").sorted("createdAt")));
  const notes = useQuery(Note, (collection) => (showDone ? collection.sorted("createdAt") : collection.filtered("favorite == false").sorted("createdAt")));

  useEffect(() => {
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(logins);
      mutableSubs.add(notes);
    });
  }, [realm, logins, notes]);

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
        <Stack.Screen
          name="Add Card"
          component={AddCardScreen}
          options={{
            header: () => {
              const navigation = useNavigation();
              return (
                <Appbar.Header>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title="Add Card" />
                </Appbar.Header>
              );
            },
          }}
        />
        <Stack.Screen
          name="Add Identity"
          component={AddIdentityScreen}
          options={{
            header: () => {
              const navigation = useNavigation();
              return (
                <Appbar.Header>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title="Add Identity" />
                </Appbar.Header>
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
