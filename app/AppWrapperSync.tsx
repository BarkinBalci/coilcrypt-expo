import React from "react";
import { AppProvider, UserProvider } from "@realm/react";
import { useColorScheme, StatusBar } from "react-native";
import { schemas } from "./models";
import { LoginScreen } from "./components/LoginScreen";
import { App } from "./App";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { RealmProvider } from "@realm/react";
import { OpenRealmBehaviorType } from "realm";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import * as NavigationBar from "expo-navigation-bar";

export const AppWrapperSync: React.FC<{
  appId: string;
}> = ({ appId }) => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const paperTheme = colorScheme === "dark" ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };
  NavigationBar.setBackgroundColorAsync(paperTheme.colors.elevation.level2);
  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} backgroundColor={paperTheme.colors.background} />
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
            <App/>
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </PaperProvider>
  );
};

export default AppWrapperSync;
