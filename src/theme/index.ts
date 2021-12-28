export const preset = {
  breakpoints: ["1080px", "1080px"],
  colors: {
    purple25: "#F5F2FF",
    purple50: "#ECE6FE",
    purple100: "#CCC3FC",
    purple300: "#7C71FC",
    purple400: "#5352FC",
    black800: "#363945",

    primaryText: "#5352FC",
    secondaryBackground: "#F5F2FF",
    primary: "#5352FC",

    text: "#333333",
    primaryButtonText: "#FAFAFA",
    accent: "#7C71FD",
    background: "#fff",
    secondary: "#bababa",
    muted: "#f6f6f9",
    gray: "#bababa",
    darkgray: "#8d8d8d",
    highlight: "hsla(205, 100%, 40%, 0.125)",
    box: "#F1F4F4",
    disabled: "#BDBDBD",
    modes: {
      dark: {
        primaryText: "#CCC3FC",
        secondaryBackground: "#363945",
        primary: "#7C71FC",

        text: "#FAFAFA",
        primaryButtonText: "#FAFAFA",
        accent: "#5352FC",
        background: "#212121",
        secondary: "#bababa",
        muted: "#757575",
        gray: "#bababa",
        darkgray: "#BDBDBD",
        highlight: "hsla(205, 100%, 40%, 0.125)",
        box: "#363945",
        disabled: "#BDBDBD",
      },
    },
  },
  fonts: {
    body: "Avenir",
    heading: "Avenir",
    monospace: "Avenir",
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
    default: {
      color: "text",
      fontFamily: "body",
      fontWeight: "500",
      fontSize: [18],
      lineHeight: "20px",
    },
    primary: {
      variant: "text.default",
      color: "primaryText",
    },
    title: {
      fontFamily: "body",
      fontSize: [28],
      lineHeight: "42px",
    },
    logo: {
      fontFamily: "body",
      fontSize: [20],
      lineHeight: "28px",
      letterSpacing: "small",
    },
    wallet: {
      fontFamily: "body",
      color: "accent",
      fontSize: [12],
      lineHeight: "16px",
    },
    account: {
      fontFamily: "body",
      color: "primary",
      fontSize: [12],
      lineHeight: "16px",
    },
    regular: {
      fontFamily: "body",
      fontSize: [18],
      lineHeight: "22px",
      color: "text",
    },
    regularGray: {
      fontFamily: "body",
      fontSize: [18],
      lineHeight: "22px",
      color: "darkgray",
    },
    bold: {
      fontFamily: "Bold",
      fontSize: 18,
      lineHeight: "20px",
      color: "text",
    },
    form: {
      fontStyle: "body",
      fontSize: [14],
      lineHeight: "16px",
      color: "text",
    },
    subtitle: {
      fontStyle: "body",
      fontSize: [20, 18],
      lineHeight: ["24px", "20px"],
      letterSpacing: "-0.01rem",
      color: "text",
    },
    tableHeader: {
      color: "accent",
      fontFamily: "body",
      fontSize: [14],
      lineHeight: "20px",
    },
    summaryTitle: {
      color: "accent",
      fontFamily: "body",
      fontSize: [14],
      lineHeight: "20px",
    },
    largeNumber: {
      fontFamily: "body",
      fontSize: 24,
      lineHeight: "20px",
      color: "text",
    },
    reallyBigNumber: {
      fontFamily: "body",
      fontSize: 32,
      lineHeight: "20px",
      color: "text",
    },
  },
  variants: {
    avatar: {
      width: "avatar",
      height: "avatar",
      borderRadius: "circle",
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
        color: "muted",
        cursor: "auto",
        bg: "disabled",
      },
      fontFamily: "body",
      fontSize: 16,
      fontWeight: 500,
      lineHeight: "20px",
      cursor: "pointer",
      borderRadius: "6px",
      color: "primaryButtonText",
      bg: "primary",
      px: 4,
      py: 2,
    },
    secondary: {
      variant: "buttons.primary",
      ":disabled": {
        borderColor: "gray",
        color: "gray",
        bg: "transparent",
      },
      color: "primary",
      bg: "transparent",
      border: "1px solid",
      borderColor: "primary",
    },
    done: {
      variant: "buttons.secondary",
      color: "accent",
    },
    switcher: {
      bg: "transparent",
      borderRadius: 0,
      fontFamily: "body",
      borderBottom: "2px solid transparent",
      color: "text",
      ":focus": {
        outline: "none",
      },
      cursor: "pointer",
      px: 0,
      py: 1,
      mr: 3,
    },
    switcherSelected: {
      variant: "buttons.switcher",
      borderBottom: "2px solid",
      color: "primaryText",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
    },
    countdown: {
      width: ["180px", "320px"],
      height: ["180px", "320px"],
      color: "accent",
    },
    a: {
      ":visited": {
        color: "primaryText",
      },
      color: "primaryText",
      cursor: "pointer",
    },
    h1: {
      fontSize: 24,
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
      bg: "box",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
    warning: {
      backgroundColor: "secondaryBackground",
      borderRadius: 4,
      color: "primaryText",
      px: 3,
      py: 2,
    },
  },
  images: {
    banner: {
      width: "100%",
    },
  },
  search: {
    bannerImage: {
      width: "100%",
      height: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      position: "relative",
    },
    bannerContainer: {
      position: "relative",
      width: "100vw",
      height: 103,
      marginBottom: 49,
    },
    bannerAvatar: {
      position: "absolute",
      left: 23,
      bottom: "-40%",
      height: 125,
      width: 125,
    },
    detailsContainer: {
      width: "100vw",
      overflowX: "visible",
      textAlign: "left",
    },
    heading: {
      fontSize: 25,
      margin: "0px 0px 18px 23px",
    },
    rowScrollContainer: {
      overflowX: "scroll",
      paddingLeft: 23,
      paddingRight: 23,
      display: "inline-flex",
      maxWidth: "100%",
      overflowY: "visible",
      paddingBottom: 20,
    },
    name: {
      container: {
        marginLeft: 23,
      },
      heading: {
        fontSize: 35,
      },
      subHeading: {
        fontFamily: "Avenir-Book",
        fontSize: 20,
        fontWeight: 200,
        marginBottom: 16,
      },
    },
    connection: {
      container: {
        marginLeft: 23,
        marginBottom: 16,
      },
      imageContainer: {
        width: 46,
        height: 46,
        marginRight: 12,
        padding: "7px",
        backgroundColor: "#5452FC",
        filter: "drop-shadow(0px 3px 6px #00000029)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      image: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: 31,
        height: 22,
      },
    },

    tag: {
      container: {
        overflowX: "scroll",
        paddingLeft: 23,
        paddingRight: 23,
        display: "inline-flex",
        maxWidth: "100%",
      },
      default: {
        borderRadius: 14,
        padding: "6px 15px",
        marginRight: 9,
        fontFamily: "Avenir",
        fontWeight: "600",
        fontSize: 17,
        flexShrink: "0",
      },
      green: {
        variant: "search.tag.default",
        background: "rgba(51, 203, 23, .2)",
        color: "#5D9352",
      },
      blue: {
        variant: "search.tag.default",
        background: "rgba(91, 90, 216, .2)",
        color: "#5B5AD8",
      },
      red: {
        variant: "search.tag.default",
        background: "rgba(188, 31, 31, .2)",
        color: "#BC1F1F",
      },
      yellow: {
        variant: "search.tag.default",
        background: "rgba(188, 122, 31, .2)",
        color: "#BC7A1F",
      },
    },
    nft: {
      imageContainer: {
        minWidth: 133,
        minHeight: 133,
        marginRight: 18,
        boxShadow: "0px 3px 6px #00000029",
        overflow: "hidden",
        borderRadius: "11px",
      },
      image: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
      },
    },
    token: {
      imageContainer: {
        minWidth: 65,
        minHeight: 65,
        marginRight: 18,
        filter: "drop-shadow(0px 3px 6px #00000029)",
        overflow: "hidden",
        borderRadius: "50%",
        border: "solid",
        borderWidth: "3px",
        borderColor: "#FACC5C",
      },
      image: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
      },
    },
    stat: {
      container: {
        marginLeft: 23,
        marginBottom: 18,
      },
      row: {
        alignItems: "center",
      },
      icon: {
        height: 32,
        width: 32,
        position: "relative",
        marginRight: 12,
      },
      life2Icon: {
        left: 8,
        position: "absolute",
      },
      heading: {
        fontFamily: "Avenir-Book",
        fontSize: 20,
      },
      text: {
        fontFamily: "Avenir-Book",
        fontWeight: "200",
        fontSize: 20,
      },
    },
    source: {
      imageContainer: {
        minWidth: 43,
        minHeight: 43,
        marginRight: 16,
        filter: "drop-shadow(0px 3px 6px #00000029)",
        overflow: "hidden",
      },
      image: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
      },
    },
  },
};

export default preset;
