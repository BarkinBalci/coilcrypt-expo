import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, TextInput, Button, Text, MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { AuthOperationName, useAuth, useEmailPasswordAuth } from "@realm/react";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";

export const LoginScreen = () => {
  const { theme } = useMaterial3Theme();
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };
  const { result, logInWithEmailPassword } = useAuth();
  const { register } = useEmailPasswordAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backgroundColor = paperTheme.colors.background;
  // Automatically log in after registration
  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      logInWithEmailPassword({ email, password });
    }
  }, [result, logInWithEmailPassword, email, password]);

  return (
    <PaperProvider theme={paperTheme}>
      <View style={[styles.content, { backgroundColor: backgroundColor }]}>
        <Card style={[styles.card]}>
          <Card.Content>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoComplete="email"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
              style={styles.input}
            />

            {result?.error?.operation === AuthOperationName.LogInWithEmailPassword && (
              <Text style={styles.errorText}>There was an error logging in, please try again</Text>
            )}

            {result?.error?.operation === AuthOperationName.Register && <Text style={styles.errorText}>There was an error registering, please try again</Text>}

            <Button mode="contained" onPress={() => logInWithEmailPassword({ email, password })} disabled={result.pending} style={styles.button}>
              Login
            </Button>

            <Button mode="contained" onPress={() => register({ email, password })} disabled={result.pending} style={styles.button}>
              Register
            </Button>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  inputContainer: {
    padding: 10,
    alignSelf: "stretch",
    marginHorizontal: 10,
  },

  error: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  card: {
    padding: 10,
    width: "100%", // Make the card take up the full width of the container
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
