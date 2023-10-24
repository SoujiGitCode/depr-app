export interface Steps {
  Title: string;
  SubTitle: string;
}

// <------------------------------ Items in mainComponent ----------------------------------->

export const mainBoxStyle = (horizontal: boolean | undefined) => ({
  backgroundColor: "#697FAA",
  ...(horizontal && horizontal === true
    ? {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }
    : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
        height: "100%",
      }),
});

export const mainInnerBoxStyle = (horizontal: boolean | undefined) => ({
  ...(horizontal && horizontal === true
    ? {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }
    : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.3rem",
        height: "100%",
      }),
});

// <------------------------------ Items in LineLayout ----------------------------------->

export const circleStyle = (
  activeStep: number,
  step: number,
  color?: string | undefined
) => ({
  minHeight: "1.5rem",
  minWidth: "1.5rem",
  backgroundColor: activeStep >= step ? "orange" : color ? color : "#697FAA",
  borderRadius: "100%",
  border: "2px solid white",
});

export const lineStyle = (
  activeStep: number,
  step: number,
  horizontal: boolean | undefined
) => ({
  background: activeStep > step ? "orange" : "white",
  ...(horizontal
    ? { width: "100%", height: "0.5rem" }
    : { height: "100%", width: "0.5rem" }),
});

export const boxStyle = (
  step: number,
  Steps: Steps[],
  horizontal: boolean | undefined
) => ({
  display: "flex",
  flexDirection: horizontal ? "row" : "column",
  alignItems: "center",
  ...(horizontal && { width: "100%" }),
  ...(step < Steps.length && { height: "100%" }),
});

// <------------------------------ Items in Titles ----------------------------------->

export const boxStyleTitles = (horizontal: boolean | undefined) => ({
  ...(horizontal && horizontal === true
    ? {
        display: "flex",
        flexDirection: "row",
      }
    : {
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }),
});

export const textStyleTitles = (fontSize: number | undefined) => ({
  color: "white",
  fontWeight: "bold",
  justifyContent: "end",
  display: "flex",
  ...(fontSize
    ? {
        fontSize: `${fontSize}vw`,
      }
    : {
        fontSize: "1.2vw",
      }),
});
