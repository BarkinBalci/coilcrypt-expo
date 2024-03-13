import React from "react";
import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";

export default function Share() {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Share" />
      </Appbar.Header>
      <View style={{ padding: 20 }}>
        <Text>Share!</Text>
      </View>
    </View>
  );
}