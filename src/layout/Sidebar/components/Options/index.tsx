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
      navigate(redirect);
    } else if (typeof redirect === 'function') {
      redirect();
    } else {
      navigate("/");
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
      onClick={handleRedirect}
    >
      {children}
      <Typography variant="body1" sx={{ color: "white", textAlign: "center" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default Options;
