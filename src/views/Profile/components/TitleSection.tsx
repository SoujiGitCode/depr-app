import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../profile.module.scss";

function TitleSection() {
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "2rem",
        paddingBottom: "2rem"
      }}
    >
      <Typography variant="h1" gutterBottom sx={{ color: '#445679', fontSize: '2em !important' }} className="Montserrat-Black">
        Perfil
      </Typography>
    </Box>
  );
}

export default TitleSection;
