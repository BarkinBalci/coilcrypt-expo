import React from "react";
import { Appbar, Text, Button, Surface } from "react-native-paper";
import { useAuth, useUser } from "@realm/react";
import { OfflineModeButton } from "./OfflineModeButton";

export default function Settings() {
  const user = useUser();
  const { logOut } = useAuth();
  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <Surface elevation={0} style={{ paddingHorizontal:20 }}>
        <OfflineModeButton />
        <Button mode="contained" onPress={logOut}>{`Logout ${user?.profile.email}`}</Button>
      </Surface>
    </Surface>
  );
}
