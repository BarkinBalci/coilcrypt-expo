import React from "react";
import { AppProvider, UserProvider } from "@realm/react";
import { SafeAreaView, StyleSheet } from "react-native";

import { schemas } from "./models";
import { LoginScreen } from "./components/LoginScreen";
import { AppSync } from "./AppSync";
import { useTheme } from "react-native-paper";
import { RealmProvider } from "@realm/react";
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm";

export const AppWrapperSync: React.FC<{
  appId: string;
}> = ({ appId }) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
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
  );
};

export default AppWrapperSync;
