import React from "react";
import { View } from "react-native";
import { Appbar, Text, Button } from "react-native-paper";
import { useAuth, useUser } from "@realm/react";
import { OfflineModeButton } from "./OfflineModeButton";

export default function Settings() {
  const user = useUser();
  const { logOut } = useAuth();
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <View style={{ padding: 20 }}>
        <OfflineModeButton />
        <Button mode="contained" onPress={logOut}>{`Logout ${user?.profile.email}`}</Button>
      </View>
    </View>
  );
}
