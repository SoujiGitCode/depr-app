import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Steps,
  circleStyle,
  lineStyle,
  boxStyle,
  boxStyleTitles,
  textStyleTitles,
  mainBoxStyle,
  mainInnerBoxStyle,
} from "./style";

interface ProgressStatusProps {
  activeStep: number; // zone activations
  horizontal?: boolean;
  fontSize?: number;
  disableText?: boolean;
  Steps: Steps[];
  Color?: string;
}

const ProgressStatus: React.FC<ProgressStatusProps> = ({
  activeStep,
  horizontal,
  fontSize,
  disableText,
  Steps,
  Color,
}) => {
  const listSteps: number[] = [];

  const LineLayout: React.FC = () => {
    //
    const result = listSteps.map((step) => (
      <Box key={step} sx={boxStyle(step, Steps, horizontal)}>
        {/*  */}
        <div style={circleStyle(activeStep, step, Color)} />

        {step < Steps.length - 1 && (
          <div style={lineStyle(activeStep, step, horizontal)} />
        )}
        {step === Steps.length - 2 && (
          <div style={circleStyle(activeStep, step + 1, Color)} />
        )}
      </Box>
    ));

    return (
      <Box
        sx={{
          display: "flex",
          ...(horizontal && horizontal === true
            ? {
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }
            : {
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
              }),
        }}
      >
        {result}
      </Box>
    );
  };

  const Titles = Steps.map((step, index) => {
    //
    if (Steps.length > index + 1) listSteps.push(index);

    return (
      <Box sx={boxStyleTitles(horizontal)} key={index}>
        <Typography sx={textStyleTitles(fontSize)}>{step.Title}</Typography>
        {!horizontal && (
          <Typography sx={textStyleTitles(fontSize)}>
            {step.SubTitle}
          </Typography>
        )}
      </Box>
    );
  });

  return (
    <Box sx={mainBoxStyle(horizontal)}>
      {disableText && disableText === true && (
        <Box sx={mainInnerBoxStyle(horizontal)}>{Titles}</Box>
      )}

      <Box sx={{ paddingRight: "3rem", padding: "1.5rem" }}>
        <LineLayout />
      </Box>
    </Box>
  );
};

export default ProgressStatus;
