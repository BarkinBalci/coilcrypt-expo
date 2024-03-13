import React from "react";

import { Login } from "./models/Login";
import { AddLoginScreen } from "./components/LoginManager";

import { useQuery } from "@realm/react";

export const AppNonSync = () => {
  const [showDone, setShowDone] = React.useState(false);
  const logins = useQuery(Login, (collection) => (showDone ? collection.sorted("createdAt") : collection.filtered("favorite == false").sorted("createdAt")), [
    showDone,
  ]);

  return <AddLoginScreen logins={logins} setShowDone={setShowDone} showDone={showDone} />;
};
