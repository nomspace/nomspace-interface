import React from "react";
import { Link } from "theme-ui";

export const NewTabLink: React.FC<{ href?: string }> = ({ children, href }) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
      href={href}
    >
      {children}
    </Link>
  );
};
