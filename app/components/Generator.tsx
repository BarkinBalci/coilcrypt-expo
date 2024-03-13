import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { Appbar, Button } from "react-native-paper";
import Slider from "@react-native-community/slider";

export default function Generator() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeSpecials, setIncludeSpecials] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);

  const generatePassword = () => {
    // Implement your password generation logic here
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Generator" />
      </Appbar.Header>
      <View style={{ padding: 20 }}>
        <Text>Password Length: {passwordLength}</Text>
        <Slider value={passwordLength} onValueChange={setPasswordLength} minimumValue={8} maximumValue={32} step={1} />

        <View>
          <Text>Include Special Characters?</Text>
          <Switch value={includeSpecials} onValueChange={setIncludeSpecials} />
        </View>

        <View>
          <Text>Include Uppercase Letters?</Text>
          <Switch value={includeUppercase} onValueChange={setIncludeUppercase} />
        </View>

        <View>
          <Text>Include Lowercase Letters?</Text>
          <Switch value={includeUppercase} onValueChange={setIncludeUppercase} />
        </View>

        <View>
          <Text>Include Numbers?</Text>
          <Switch value={includeNumbers} onValueChange={setIncludeNumbers} />
        </View>

        <Button mode="contained" onPress={generatePassword}>
          Generate Password
        </Button>
      </View>
    </View>
  );
}
