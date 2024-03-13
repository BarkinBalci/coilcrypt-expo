import React, { useState } from "react";
import { useRealm } from "@realm/react";
import { Switch, List } from "react-native-paper";

export function OfflineModeButton() {
  const realm = useRealm();

  const [pauseSync, togglePauseSync] = useState(false);

  return (
    <List.Item
      title="Disable Sync"
      right={() => (
        <Switch
          value={realm.syncSession?.state === "inactive"}
          onValueChange={() => {
            if (!pauseSync && realm.syncSession?.state === "active") {
              realm.syncSession.pause();
              togglePauseSync(true);
            } else if (pauseSync && realm.syncSession?.state === "inactive") {
              realm.syncSession.resume();
              togglePauseSync(false);
            }
          }}
        />
      )}
    />
  );
}
