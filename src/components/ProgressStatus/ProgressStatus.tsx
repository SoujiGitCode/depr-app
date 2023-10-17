import React from "react";
import { Box, Typography } from "@mui/material";

interface ProgressStatusProps {
  activeStep: number;
  horizontal?: boolean;
  fontSize?: number;
  disableText?: boolean;
}

const ProgressStatus: React.FC<ProgressStatusProps> = ({
  activeStep,
  horizontal,
  fontSize,
  disableText,
}) => {
  const LineLayout: React.FC = () => {
    return (
      <Box
        sx={{
          display: "flex",
          ...(horizontal && horizontal === true
            ? {
                flexDirection: "row",
              }
            : {
                flexDirection: "column",
              }),
          height: "100%",
        }}
      >
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
          <div
            style={{
              minHeight: "1.5rem",
              minWidth: "1.5rem",
              backgroundColor: "white",
              borderRadius: "100%",
              border: "2px solid white",
              ...(activeStep >= 0 && {
                backgroundColor: "orange",
              }),
            }}
          />

          <div
            style={{
              background: "white",
              ...(activeStep > 0 && {
                backgroundColor: "orange",
              }),

              ...(horizontal && horizontal === true
                ? {
                    width: "100%",
                    height: "0.5rem",
                  }
                : {
                    height: "100%",
                    width: "0.5rem",
                  }),
            }}
          />
        </Box>

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
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }),
          }}
        >
          <div
            style={{
              minHeight: "1.5rem",
              minWidth: "1.5rem",
              backgroundColor: "white",
              borderRadius: "100%",
              border: "2px solid white",
              ...(activeStep >= 1 && {
                backgroundColor: "orange",
              }),
            }}
          />

          <div
            style={{
              background: "white",
              ...(activeStep > 1 && {
                backgroundColor: "orange",
              }),
              ...(horizontal && horizontal === true
                ? {
                    width: "100%",
                    height: "0.5rem",
                  }
                : {
                    height: "100%", // Cambiado a 100%
                    width: "0.5rem",
                  }),
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",

            ...(horizontal && horizontal === true
              ? {
                  flexDirection: "row",
                  alignItems: "center",
                }
              : {
                  flexDirection: "column",
                  alignItems: "center",
                }),
          }}
        >
          <div
            style={{
              minHeight: "1.5rem",
              minWidth: "1.5rem",
              backgroundColor: "white",
              borderRadius: "100%",
              border: "2px solid white",
              ...(activeStep >= 2 && {
                backgroundColor: "orange",
              }),
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
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
      }}
    >
      {disableText && disableText === true ? (
        <></>
      ) : (
        <Box
          sx={{
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
          }}
        >
          <Box
            sx={{
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
            }}
          >
            <Typography
              sx={{
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
              }}
            >
              Paso #1
            </Typography>

            {!horizontal && (
              <Typography
                sx={{
                  color: "white",
                  ...(fontSize
                    ? {
                        fontSize: `${fontSize}vw`,
                      }
                    : {
                        fontSize: "1.2vw",
                      }),
                }}
              >
                Correo electronico
              </Typography>
            )}
          </Box>

          <Box
            sx={{
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
            }}
          >
            <Typography
              sx={{
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
              }}
            >
              Paso #2
            </Typography>

            {!horizontal && (
              <Typography
                sx={{
                  color: "white",
                  ...(fontSize
                    ? {
                        fontSize: `${fontSize}vw`,
                      }
                    : {
                        fontSize: "1.2vw",
                      }),
                }}
              >
                Datos de la escuela
              </Typography>
            )}
          </Box>
          <Box
            sx={{
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
            }}
          >
            <Typography
              sx={{
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
              }}
            >
              Paso #3
            </Typography>

            {!horizontal && (
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "300",
                  ...(fontSize
                    ? {
                        fontSize: `${fontSize}vw`,
                      }
                    : {
                        fontSize: "1.2vw",
                      }),
                }}
              >
                Datos personales
              </Typography>
            )}
          </Box>
        </Box>
      )}

      <Box sx={{ paddingRight: "3rem", padding: "1.5rem" }}>
        <LineLayout />
      </Box>
    </Box>
  );
};

export default ProgressStatus;
