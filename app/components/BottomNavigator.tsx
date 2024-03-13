import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation, Appbar, Button, Switch } from "react-native-paper";
import { buttonStyles } from "../styles/button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Generator from "./Generator";
import Share from "./Share";
import Settings from "./Settings";
import Vault from "./Vault";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

            // Ensure label is a string
            return typeof label === "function" ? "" : label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Vault"
        component={Vault}
        options={{
          tabBarLabel: "Vault",
          tabBarIcon: ({ color, size, focused }) => {
            return <Icon name={focused ? "lock" : "lock-outline"} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Share"
        component={Share}
        options={{
          tabBarLabel: "Share",
          tabBarIcon: ({ color, size, focused }) => {
            return <Icon name={focused ? "send" : "send-outline"} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Generator"
        component={Generator}
        options={{
          tabBarLabel: "Generator",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="refresh" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size, focused }) => {
            return <Icon name={focused ? "cog" : "cog-outline"} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authButtonText: {
    ...buttonStyles.text,
  },
});
