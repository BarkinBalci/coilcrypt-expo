import React, { useState } from "react";
import { Appbar, Button, Surface, Text, Switch } from "react-native-paper";
import Slider from "@react-native-community/slider";

export default function Generator() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeSpecials, setIncludeSpecials] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);

  const generatePassword = () => {
    // Implement your password generation logic here
  };

  return (
    <Surface elevation={0} style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Generator" />
      </Appbar.Header>
      <Surface style={{ padding: 20, flex: 1 }}>
        <Text>Password Length: {passwordLength}</Text>
        <Slider value={passwordLength} onValueChange={setPasswordLength} minimumValue={8} maximumValue={32} step={1} />

        <Text>Include Special Characters?</Text>
        <Switch value={includeSpecials} onValueChange={setIncludeSpecials} />

        <Text>Include Uppercase Letters?</Text>
        <Switch value={includeUppercase} onValueChange={setIncludeUppercase} />

        <Text>Include Lowercase Letters?</Text>
        <Switch value={includeLowercase} onValueChange={setIncludeLowercase} />

        <Text>Include Numbers?</Text>
        <Switch value={includeNumbers} onValueChange={setIncludeNumbers} />

        <Button mode="contained" onPress={generatePassword} style={{ marginTop: 20 }}>
          Generate Password
        </Button>
      </Surface>
    </Surface>
  );
}
