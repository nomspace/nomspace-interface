import React from "react";
import { useHistory } from "react-router-dom";
import { Text } from "theme-ui";

export const Logo: React.FC = () => {
  const history = useHistory();
  return (
    <Text
      variant="logo"
      onClick={() => {
        history.push("/");
      }}
    >
      Nomspace
    </Text>
  );
};
