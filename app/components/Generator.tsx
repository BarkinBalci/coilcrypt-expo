import React, { useState, useEffect } from "react";
import { Appbar, Button, Surface, Text, Switch, TextInput, MD3DarkTheme, MD3LightTheme, Divider, IconButton } from "react-native-paper";
import Slider from "@react-native-community/slider";
import { View, useColorScheme } from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import Clipboard from "@react-native-community/clipboard";

export default function Generator() {
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeSpecials, setIncludeSpecials] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [password, setPassword] = useState(""); // New state variable for password

  const { theme } = useMaterial3Theme();
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };
  
  const generatePassword = async () => {
    const specials = "!@#$%^&*";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let possibleCharacters = "";
    if (includeSpecials) possibleCharacters += specials;
    if (includeLowercase) possibleCharacters += lowercase;
    if (includeUppercase) possibleCharacters += uppercase;
    if (includeNumbers) possibleCharacters += numbers;

    if (possibleCharacters.length === 0) {
      setPassword("");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      const randomIndex = array[0] % possibleCharacters.length;
      generatedPassword += possibleCharacters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  useEffect(() => {
    generatePassword();
  }, [passwordLength, includeSpecials, includeUppercase, includeLowercase, includeNumbers]);

  return (
    <Surface elevation={0} style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Generator" />
      </Appbar.Header>
      <Surface style={{ padding: 20, flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ opacity: 0.6 }} variant="labelSmall">
              Password
            </Text>
            <Text variant="bodyLarge">{password}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton icon="refresh" onPress={generatePassword} />
            <IconButton icon="content-copy" onPress={() => copyToClipboard(password)} />
          </View>
        </View>
        <Divider />
        <View style={{ flexDirection: "row" }}>
          <Text>Length: {passwordLength}</Text>
          <Slider
            thumbTintColor={paperTheme.colors.primary}
            maximumTrackTintColor={paperTheme.colors.primary}
            minimumTrackTintColor={paperTheme.colors.primary}
            value={passwordLength}
            onValueChange={setPasswordLength}
            minimumValue={8}
            maximumValue={128}
            step={1}
            style={{ flex: 1 }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>A-Z</Text>
            <Switch value={includeUppercase} onValueChange={setIncludeUppercase} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>a-z</Text>
            <Switch value={includeLowercase} onValueChange={setIncludeLowercase} />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>0-9</Text>
            <Switch value={includeNumbers} onValueChange={setIncludeNumbers} />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>!@#$%^&*</Text>
            <Switch value={includeSpecials} onValueChange={setIncludeSpecials} />
          </View>
        </View>
      </Surface>
    </Surface>
  );
}
