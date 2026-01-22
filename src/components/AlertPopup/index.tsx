import { Alert, Stack, AlertTitle, useTheme, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import AlertContext from "@/hooks/useAlert";

const AlertPopup = () => {

  const { text, type, isOpen, hideAlert } = AlertContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const titles = {
    success: "éxito",
    warning: "advertencia",
    error: "error",
    info: "Información"
  }

  if (isOpen && text) {
    return (
      <Stack
        sx={{
            width: isMobile ? '100%' : '25%',
            position: 'fixed',
          "z-index": 999,
          top: 0, right: 0,
        }}
        spacing={2}
      >
        <Alert severity={type} onClose={hideAlert} sx={{ justifyContent: 'space-between' }}>
          <AlertTitle sx={{ textTransform: 'capitalize' }}>{titles[type]}</AlertTitle>
          {text}
        </Alert>
      </Stack>
    );
  } else {
    return null;
  }
};

export default AlertPopup;
