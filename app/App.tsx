import React, { useEffect, useState } from "react";
import { useQuery, useRealm } from "@realm/react";
import { Appbar, Surface, Text, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import BottomNavigator from "./components/BottomNavigator";
import { NavigationContainer, DefaultTheme, useNavigation } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { Login } from "./models/Login";
import { Note } from "./models/Note";
import { Card } from "./models/Card";
import { Identity } from "./models/Identity";
import { useColorScheme } from "react-native";
import ItemDetailsScreen from "./components/ItemDetails";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import UpsertItemScreen from "./components/UpsertItem";

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

  const logins = useQuery(Login, (collection) => collection.sorted("createdAt"));
  const notes = useQuery(Note, (collection) => collection.sorted("createdAt"));
  const cards = useQuery(Card, (collection) => collection.sorted("createdAt"));
  const identities = useQuery(Identity, (collection) => collection.sorted("createdAt"));

  const { theme } = useMaterial3Theme();
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };

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
      background: paperTheme.colors.background,
    },
  };

  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
        }}
      >
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
          name="viewItem"
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
        <Stack.Screen name="upsertItem" component={UpsertItemScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
