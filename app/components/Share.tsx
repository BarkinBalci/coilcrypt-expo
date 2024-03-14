import React from "react";
import { Appbar, Surface, Text } from "react-native-paper";

export default function Share() {
  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Share" />
      </Appbar.Header>
        <Text style={{ padding: 20 }}>Share!</Text>
    </Surface>
  );
}