import React from "react";
import Realm from "realm";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { shadows } from "../styles/shadows";
import colors from "../styles/colors";
import { Login } from "../models/Login";
import { Surface } from "react-native-paper";

type LoginItemProps = {
  login: Login & Realm.Object;
  onToggleStatus: () => void;
  onDelete: () => void;
};

export const LoginItem = React.memo<LoginItemProps>(({ login, onToggleStatus, onDelete }) => {
  return (
    <Surface>
      <Pressable onPress={onToggleStatus} style={[styles.status, login.favorite && styles.completed]}>
        <Text style={styles.icon}>{login.favorite ? "✓" : "○"}</Text>
      </Pressable>
      <Surface style={styles.descriptionContainer}>
        <Text numberOfLines={1} style={styles.description}>
          {login.url}
        </Text>
      </Surface>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </Surface>
  );
});

const styles = StyleSheet.create({
  login: {
    height: 50,
    alignSelf: "stretch",
    flexDirection: "row",
    marginVertical: 8,
    borderRadius: 5,
    ...shadows,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 17,
  },
  status: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  completed: {},
  deleteButton: {
    justifyContent: "center",
  },
  deleteText: {
    marginHorizontal: 10,
    color: colors.gray,
    fontSize: 17,
  },
  icon: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});
