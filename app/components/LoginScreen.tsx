import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card, TextInput, Button, Text, Surface } from "react-native-paper";
import { AuthOperationName, useAuth, useEmailPasswordAuth } from "@realm/react";
import { Cryptography } from "../libraries/cryptography";

export const LoginScreen = () => {
  const { result, logInWithEmailPassword } = useAuth();
  const { register } = useEmailPasswordAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      logInWithEmailPassword({ email, password: hashedPassword });
    }
  }, [result, logInWithEmailPassword, email, hashedPassword]);

  return (
    <Surface style={[styles.content]}>
      <Card mode="contained" style={[styles.card]}>
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
            secureTextEntry={!isPasswordVisible}
            autoComplete="password"
            textContentType="password"
            style={styles.input}
            right={<TextInput.Icon icon={isPasswordVisible ? "eye-off" : "eye"} onPress={togglePasswordVisibility} />}
          />

          {result?.error?.operation === AuthOperationName.LogInWithEmailPassword &&
            (console.log(result.error.name),
            (<Text style={styles.errorText}>{result.error.message || "There was an error logging in, please try again"}</Text>))}

          {result?.error?.operation === AuthOperationName.Register && (
            <Text style={styles.errorText}>{result.error.message || "There was an error registering, please try again"}</Text>
          )}

          <Button
            mode="contained"
            onPress={async () => {
              const hashedPassword = await Cryptography.hash(await Cryptography.setEncryptionKey(password, email));
              setHashedPassword(hashedPassword);
              logInWithEmailPassword({ email, password: hashedPassword });
            }}
            disabled={result.pending}
            style={styles.button}
          >
            Login
          </Button>
          <Button
            mode="contained"
            onPress={async () => {
              const hashedPassword = await Cryptography.hash(await Cryptography.setEncryptionKey(password, email));
              setHashedPassword(hashedPassword);
              register({ email, password: hashedPassword });
            }}
            disabled={result.pending}
            style={styles.button}
          >
            Register
          </Button>
        </Card.Content>
      </Card>
    </Surface>
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
