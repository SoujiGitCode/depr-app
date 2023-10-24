import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../profile.module.scss"; // Asegúrate de importar tus estilos correctamente

function TitleSection() {
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        paddingLeft: "7.3rem",
      }}
    >
      <Typography variant="h4" className={styles["title"]}>
        Profile
      </Typography>
    </Box>
  );
}

export default TitleSection;
