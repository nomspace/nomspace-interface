// mobile, tablet, laptop, desktop
export const preset = {
  breakpoints: ["768px", "1023px", "1499px", "1400px"],
  colors: {
    // defaults
    purple25: "#F5F2FF",
    purple50: "#ECE6FE",
    purple100: "#CCC3FC",
    purple300: "#7C71FC",
    purple400: "#5352FC",
    black800: "#363945",

    primaryTextColor: "#5452FC",
    secondaryBackground: "#E5E5FD",
    primary: "#5452FC",

    textColor: "#333333",
    primaryButtonTextColor: "#FAFAFA",
    accent: "#7C71FD",
    background: "#fff",
    secondary: "#F5F5F5",
    muted: "#f6f6f9",
    gray: "#bababa",
    darkgray: "#8d8d8d",
    highlight: "hsla(205, 100%, 40%, 0.125)",
    box: "#F1F4F4",
    disabled: "#BDBDBD",

    // custom components
    modalBackground: "rgba(255, 255, 255, 0.44)",
    modes: {
      dark: {
        primaryTextColor: "#CCC3FC",
        secondaryBackground: "#363945",
        primary: "#7C71FC",

        textColor: "#FAFAFA",
        primaryButtonTextColor: "#FAFAFA",
        accent: "#5352FC",
        background: "#212121",
        secondary: "#121212",
        muted: "#757575",
        gray: "#bababa",
        darkgray: "#BDBDBD",
        highlight: "hsla(205, 100%, 40%, 0.125)",
        box: "#363945",
        disabled: "#BDBDBD",
        // custom components
        modalBackground: "rgba(0,0,0,0.44)",
      },
    },
  },
  fonts: {
    body: "Sen",
    heading: "Sen",
    monospace: "Sen",
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 96],
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: {
    mobile: "5%",
    tablet: "10%",
    desktop: "62px",
  },
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
      color: "textColor",
      fontFamily: "body",
      fontWeight: "500",
      fontSize: [18],
      lineHeight: "20px",
    },
    heading: {
      color: "textColor",
    },
    primary: {
      variant: "text.default",
      color: "primaryTextColor",
    },
    logo: {
      color: "textColor",
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
    form: {
      fontStyle: "body",
      fontSize: [14],
      lineHeight: "16px",
      color: "textColor",
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
    color: "textColor",
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
      color: "primaryButtonTextColor",
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
      color: "textColor",
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
      color: "primaryTextColor",
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
        color: "primaryTextColor",
      },
      color: "primaryTextColor",
      cursor: "pointer",
    },
    h1: {
      fontSize: 24,
    },
  },
  cards: {
    primary: {
      color: "textColor",
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
      color: "primaryTextColor",
      px: 3,
      py: 2,
    },
  },
  search: {
    details: {
      container: {
        width: "100%",
        // height: "100%",

        textAlign: "left",
        "& > div": {},
        backgroundColor: "background",
        color: "textColor",
      },
      heading: {
        flexDirection: ["column", null, null, "row"],
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
    },
    heading: {
      fontSize: [25, null, null, 39],
      marginLeft: ["mobile", "tablet", "desktop"],
      marginBottom: 9,
      marginTop: 9,
    },
    rowScrollContainer: {
      overflowX: "auto",
      paddingLeft: ["mobile", "tablet", "desktop"],
      paddingRight: ["mobile", "tablet", "desktop"],
      display: "inline-flex",
      width: "100%",
      overflowY: "visible",
      paddingBottom: 20,
    },
    banner: {
      image: {
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
      },
      container: {
        position: "relative",
        width: "100%",
        minHeight: [103, null, null, 298],
        marginBottom: [49, null, null, 120],
      },
      avatar: {
        position: "absolute",
        left: ["mobile", "tablet", "desktop"],
        bottom: "-40%",
        height: [125, null, null, 300],
        width: [125, null, null, 300],
        borderRadius: "50%",
      },
    },
    nomstronautTip: {
      container: {
        marginRight: ["mobile", "tablet", "desktop"],
        marginTop: [13, null, null, 49],
        justifyContent: "flex-end",
        alignItems: "center",
      },
      imageContainer: {
        height: [37, null, null, 70],
        width: [37, null, null, 70],
      },
      image: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: "100%",
        height: "100%",
      },
      tip: {
        marginLeft: 11,
        borderRadius: ["28px", null, null, "36px"],
        fontSize: [17, null, null, 31],
        padding: ["8px 28px", null, null, "14px 56px"],
        filter: "drop-shadow(0px 3px 6px #00000029)",
      },
      edit: {
        marginLeft: 11,
        borderRadius: ["28px", null, null, "36px"],
        fontSize: [17, null, null, 31],
        padding: ["8px 28px", null, null, "14px 56px"],
        filter: "drop-shadow(0px 3px 6px #00000029)",
        backgroundColor: "box",
        border: "4px solid var(--theme-ui-colors-primary)",
        color: "textColor",
      },
      connectionsContainer: {
        marginLeft: 11,
        display: ["none", null, null, "block"],
      },
    },
    name: {
      container: {
        marginLeft: ["mobile", "tablet", "desktop"],
      },

      heading: {
        fontSize: [35, null, null, 64],
        overflowWrap: "break-word",
      },
      subHeading: {
        fontFamily: "Sen",
        fontSize: [20, null, null, 36],
        fontWeight: 200,
        marginBottom: 16,
      },
      nameContainer: {
        alignItems: "center",
        flexWrap: "wrap",
      },
      source: {
        imageContainer: {
          width: 43,
          height: 43,
          marginRight: 16,
          display: ["none", null, null, "block"],
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
    connection: {
      container: {
        marginLeft: ["mobile", "tablet", "desktop"],
        marginBottom: 16,
        alignItems: "center",
        display: ["block", null, null, "none"],
      },
      imageContainer: {
        width: [46, null, null, 72],
        height: [46, null, null, 72],
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
        width: "100%",
        height: "100%",
        margin: ["2px", null, null, "7px"],
      },
    },
    tag: {
      default: {
        borderRadius: 14,
        padding: ["6px 15px", null, null, "8px 25px"],
        marginRight: 9,
        marginTop: [null, null, null, 39],
        fontFamily: "Sen",
        fontWeight: "600",
        fontSize: [17, null, null, 26],
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
        minWidth: [133, null, null, 300],
        minHeight: [133, null, null, 300],
        marginRight: 18,
        boxShadow: "0px 3px 6px #00000029",
        overflow: "hidden",
        borderRadius: "11px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        minWidth: [65, null, null, 100],
        minHeight: [65, null, null, 100],
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
        marginLeft: ["mobile", "tablet", "desktop"],
        marginRight: ["mobile", "tablet", "desktop"],
        marginBottom: 18,
        backgroundColor: [null, null, null, "secondary"],
        borderRadius: "22px",
        display: [null, null, null, "flex"],
        justifyContent: "space-around",
        alignItems: "center",
        justifyItems: "center",
      },
      row: {
        alignItems: "center",
        padding: [null, null, null, "35px 10px"],

        margin: "auto",
      },
      divider: {
        display: ["none", null, null, "block"],
        height: "69px",
        width: "1px",
        margin: "auto",
        backgroundColor: "#707070",
        opacity: "24%",
      },

      icon: {
        height: 32,
        width: 32,
        position: "relative",
        marginRight: 12,
      },
      life2Icon: {
        top: 0,
        left: 8,
        position: "absolute",
      },
      heading: {
        fontFamily: "Sen",
        fontSize: [20, null, null, 35],
      },
      text: {
        fontFamily: "Sen",
        fontWeight: "700",
        fontSize: [20, null, null, 35],
      },
    },
    source: {
      imageContainer: {
        width: [43, null, null, 65],
        height: [43, null, null, 65],
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
      text: {
        fontFamily: "Sen",
        display: ["none", null, null, "block"],
        color: "#52D07F",
        fontSize: "35px",
      },
    },
    sidebar: {
      container: {
        display: ["block"],
        backgroundColor: "secondary",
        color: "textColor",
        minWidth: [200, 300, 430],
        padding: "24px 38px",
        height: "100%",
      },
      walletContainer: { marginTop: 20 },
      heading: {
        variant: "search.sidebar.item",
        fontFamily: "Sen",
        fontSize: 42,
        marginTop: 48,
      },
      nom: {
        container: {
          minWidth: 83,
          minHeight: 83,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        image: {
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minWidth: "83px",
          minHeight: "83px",
        },
        name: {
          fontSize: "20px",
          marginLeft: "20px",
        },
        date: {
          opacity: "50%",
          fontSize: "20px",
        },
      },
      item: {
        fontFamily: "Sen",
        fontSize: 30,
        width: "100%",
        "::before": {
          content: '"  "',
          display: "inline-block",
          width: "15px",
          height: "10px",
        },
        "::after": {
          content: '""',
          display: "block",
          width: "100%",
          height: 1,
          backgroundColor: "#707070",
          opacity: "24%",
          margin: "20px 0px",
        },
      },
    },
  },
  modal: {
    title: {
      fontSize: "50px",
      fontWeight: "800",
    },
    wallet: {
      desktop: {
        fontSize: "35px",
        display: ["none", null, null, "block"],
      },
      mobile: {
        fontSize: "20px",
        margin: "13px 0px",
        width: "80%",
        textAlign: "center",
        overflowWrap: "anywhere",
        display: ["block", null, null, "none"],
      },
    },
    container: {
      minWidth: ["80%", null, null, "100%"],
      width: "100%",
      margin: ["10px", null, null, "50px 0px"],
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: ["column", null, null, "row"],
    },
    qrCode: {
      width: [130, null, null, 300],
      height: [130, null, null, 300],
    },
    form: {
      container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      },
      item: {
        width: ["100%", 395],
        height: 85,
        fontSize: 32,
      },
      input: {
        // width: ["100%"],
        height: ["100%"],
        position: "relative",
        paddingRight: 23,
        // borderRadius: 11,
        textAlign: "right",
        // backgroundColor: "white",
        // border: "none",
        filter: "drop-shadow(0px 3px 6px #00000029)",

        //themed
        backgroundColor: "secondaryBackground",
        border: "4px solid var(--theme-ui-colors-primary)",
        borderRadius: "12px",

        ":focus": {
          outline: "hsla(241, 97%, 65%, 1) solid",
        },
      },
      selectWrapper: {
        variant: "modal.form.item",
        marginBottom: "10px",
      },
      inputWrapper: {
        variant: "modal.form.item",
        marginBottom: "20px",
        position: "relative",
      },
      amountWrapper: {
        variant: "modal.form.inputWrapper",
        "::after": {
          content: '"Amount:"',
          variant: "modal.form.inputText",
        },
      },
      durationWrapper: {
        variant: "modal.form.inputWrapper",
        "::after": {
          content: '"Duration"',
          variant: "modal.form.inputText",
        },
      },
      totalCostWrapper: {
        variant: "modal.form.inputWrapper",
        "::after": {
          content: '"Cost"',
          variant: "modal.form.inputText",
        },
      },
      inputText: {
        fontWeight: "400",
        display: "block",
        position: "absolute",
        width: 1,
        left: 21,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: [25, null, null, 32],
        whiteSpace: ["wrap", "nowrap"],
      },
      submit: {
        variant: "modal.form.item",
        borderRadius: "11px",
        backgroundColor: "hsla(145, 55%, 56%, 1)",
        ":hover": {
          backgroundColor: "hsla(145, 55%, 35%, 1)",
        },
        ":disabled": {
          backgroundColor: "grey",
        },
      },
    },
  },
  modals: {
    // Modal components
    backdrop: {
      zIndex: `backdrop`,
      position: `absolute`,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `rgba(0,0,0,0.2)`,
      backdropFilter: "blur(5px)",
    },
    content: {
      px: "1rem",
      flexGrow: 1,
    },
    footer: {
      minHeight: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: "1rem",
    },
    title: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 16,
      px: "1rem",
    },

    // Modal variants

    default: {
      backgroundColor: "modalBackground",
      color: "textColor",
      backdropFilter: "blur(50px) brightness(132%)",
      padding: ["5px", "10px", null, "90px 100px"],
      borderRadius: "30px",
      boxShadow: `md`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: "center",
      maxHeight: `80vh`,
      minHeight: "16rem",
      minWidth: "16rem",
      maxWidth: "90vw",
      position: `relative`,
      top: [`5%`, `10%`, `10%`],
      zIndex: `modal`,
    },
  },
  zIndices: {
    backdrop: 100,
    modal: 110,
  },
};

export default preset;
