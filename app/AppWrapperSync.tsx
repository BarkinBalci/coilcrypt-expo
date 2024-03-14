import React from "react";
import { AppProvider, UserProvider } from "@realm/react";
import { SafeAreaView, StyleSheet, View, useColorScheme } from "react-native";
import { schemas } from "./models";
import { LoginScreen } from "./components/LoginScreen";
import { AppSync } from "./AppSync";
import { PaperProvider, useTheme, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { RealmProvider } from "@realm/react";
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";

export const AppWrapperSync: React.FC<{
  appId: string;
}> = ({ appId }) => {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const paperTheme = colorScheme === "dark" ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };
  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppProvider id={appId}>
          <UserProvider fallback={<LoginScreen />}>
            <RealmProvider
              schema={schemas}
              sync={{
                flexible: true,
                existingRealmFileBehavior: {
                  type: OpenRealmBehaviorType.OpenImmediately,
                },
              }}
            >
              <AppSync />
            </RealmProvider>
          </UserProvider>
        </AppProvider>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default AppWrapperSync;
