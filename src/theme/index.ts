const preset = {
  breakpoints: ["1080px", "1080px"],
  colors: {
    text: "#fff",
    accent: "#7C71FD",
    background: "rgb(8, 55, 127)",
    primary: "#499EE9",
    secondary: "#30c",
    muted: "#f6f6f9",
    gray: "#bababa",
    darkgray: "#8d8d8d",
    highlight: "hsla(205, 100%, 40%, 0.125)",
  },
  fonts: {
    regular: "Regular",
    bold: "Bold",
    demiBold: "DemiBold",
    medium: "Medium",
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 96],
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 24, 32, 48, 64],
  letterSpacings: {
    small: "-0.05em",
  },
  sizes: {
    avatar: 48,
  },
  shadows: {
    card: "0 0 4px rgba(0, 0, 0, .125)",
  },
  text: {
    logo: {
      fontFamily: "Bold",
      color: "white",
      fontSize: [36],
      lineHeight: "28px",
      letterSpacing: "small",
    },
    label: {
      fontFamily: "Regular",
      color: "gray",
      fontSize: [14],
      lineHeight: "28px",
      letterSpacing: "small",
    },
    largeNumber: {
      fontFamily: "DemiBold",
      color: "white",
      fontSize: [40],
      lineHeight: "28px",
      letterSpacing: "small",
    },
  },
  variants: {
    avatar: {
      width: "avatar",
      height: "avatar",
      borderRadius: "circle",
    },
    card: {
      p: 2,
      bg: "background",
      boxShadow: "card",
    },
    link: {
      color: "primary",
      textDecoration: "none",
    },
    nav: {
      fontSize: 1,
      fontWeight: "bold",
      display: "inline-block",
      p: 2,
      color: "inherit",
      textDecoration: "none",
      ":hover,:focus,.active": {
        color: "primary",
      },
    },
  },
  select: {
    borderColor: "gray",
    borderWidth: "1.5px",
  },
  input: {
    borderColor: "gray",
    borderWidth: "1.5px",
  },
  buttons: {
    primary: {
      ":disabled": {
        color: "gray",
        cursor: "auto",
        bg: "#F1F4F4",
      },
      fontFamily: "Bold",
      fontSize: 18,
      lineHeight: "20px",
      cursor: "pointer",
      variant: "bold",
      borderRadius: ["32px", "6px"],
      height: ["48px", "42px"],
      color: "#F1F4F4",
      bg: "#333333",
    },
    secondary: {
      ":disabled": {
        color: " gray",
      },
      fontFamily: "Bold",
      fontSize: 18,
      lineHeight: "20px",
      variant: "buttons.primary",
      color: "#333333",
      bg: "#F1F4F4",
    },
    done: {
      variant: "buttons.secondary",
      color: "accent",
    },
    switcher: {
      bg: "transparent",
      fontFamily: "DemiBold",
      fontSize: 20,
      lineHeight: "16px",
      letterSpacing: "-0.01rem",
      borderRadius: 0,
      borderBottom: "3px solid transparent",
      color: "gray",
      ":focus": {
        outline: "none",
      },
      cursor: "pointer",
      px: 0,
      mr: 3,
      mt: 2,
    },
    switcherSelected: {
      variant: "buttons.switcher",
      borderBottom: "3px solid black",
      color: "text",
    },
  },
  styles: {
    root: {
      fontFamily: "Regular",
      lineHeight: "body",
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
};

export default preset;
