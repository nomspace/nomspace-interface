import styled from "@emotion/styled";
import { Box } from "theme-ui";

export const Switcher = styled(Box)(({ selected }: { selected: boolean }) => ({
  background: selected
    ? "var(--theme-ui-colors-primary)"
    : "var(--theme-ui-colors-box)",
  padding: "8px",
  cursor: "pointer",
  color: `var(--theme-ui-colors-${
    selected ? "primaryButtonTextColor" : "textColor"
  })`,
}));
