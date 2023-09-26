const sxStyles = (isVeryScreenSmall: any, isMedium: any, isScreenLg: any) => ({
  infoGridItem: {
    flexDirection: "column",
    display: "flex",
    padding: "1rem -6rem 0rem",
  },

  boxMain: {
    height: "100vh",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    ...(isVeryScreenSmall && {
      display: "flex",
      flexDirection: "column",
    }),
  },

  boxButtoPhoto: {
    height: "90%",
    width: "25%",
    paddingLeft: "5%",
    ...(isVeryScreenSmall && {
      width: "100%",
      paddingLeft: "9%",
    }),
  },

  containButtonPhoto: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    paddingTop: "6%",
    height: "80%",
    ...(isVeryScreenSmall && {
      width: "100%",
      height: "100%",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: "6%",
      paddingBottom: "10%",
    }),

    ...(isMedium && {
      paddingRight: "70%",
    }),
  },

  itemPhoto: {
    paddingLeft: "10%",
    ...(isVeryScreenSmall && {
      paddingLeft: "1%",
      display: "flex",
      flexDirection: "column",
    }),
  },

  itemButtons: {
    paddingLeft: "10%",
    ...(isVeryScreenSmall && {
      paddingLeft: "1%",
      display: "flex",
      flexDirection: "column",
    }),

    ...(isMedium && {
      display: "flex",
      flexDirection: "column",
      paddingRight: "16%",
    }),
  },

  personalInformation: {
    height: "90%",
    width: "65%",
    ...(isVeryScreenSmall && {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    }),

    ...(isMedium && {
      paddingLeft: "6%",
    }),
  },

  sidebarBox: {
    width: "12%",
    height: "120vh",
    ...(isVeryScreenSmall && {
      display: "none",
    }),

    ...(isScreenLg && {
      height: "110vh",
    }),
  },

  title: {
    ...(isVeryScreenSmall && {
      textAlign: "center",
      paddingLeft: "9%",
    }),
  },

  listItem: {
    ...(isVeryScreenSmall && {
      display: "flex",
      flexDirection: "column",
    }),
  },

  listItemTextstyle: {
    flex: 1,
    paddingRight: "16rem",
  },

  listItemName: {
    width: "25%",
    fontWeight: "normal",
    fontSize: "1rem",
  },

  listItemNameLg: {
    width: "37%",
    fontSize: "1rem",
    fontWeight: "normal",
  },
  listItemNameXl: {
    width: "55%",
    fontSize: "1rem",
    fontWeight: "normal",
  },

  textFieldSeparator: {
    paddingLeft: "20%",
  },
});

export default sxStyles;
