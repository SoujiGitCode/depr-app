import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Options = ({
  text,
  redirect,
  children,
}: {
  text: string;
  redirect?: string | (() => void);
  children: ReactNode;
}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (typeof redirect === 'string') {
      navigate(redirect); // Navegar a la URL si redirect es un string
    } else if (typeof redirect === 'function') {
      redirect(); // Ejecutar la función si redirect es una función
    } else {
      navigate("/"); // Navegar al inicio como fallback
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleRedirect} // Usar handleRedirect para manejar el evento click
    >
      {children}
      <Typography variant="body1" sx={{ color: "white", textAlign: "center" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default Options;
