import { Alert, Stack, AlertTitle } from "@mui/material";
import { useContext } from "react";
import AlertContext from "@/hooks/useAlert";  // Asegúrate de que la importación sea correcta

const AlertPopup = () => {
  const { text, type, isOpen, hideAlert } = AlertContext();

  if (isOpen && text) {
    return (
      <Stack
        sx={{
          width: '25%',
          position: 'fixed',
          "z-index": 999,
          top: 0, right: 0,
        }}
        spacing={2}
      >
        <Alert severity={type} onClose={hideAlert} sx={{ justifyContent: 'space-between' }}>
          <AlertTitle sx={{ textTransform: 'capitalize' }}>{type}</AlertTitle>
          {text}
        </Alert>
      </Stack>
    );
  } else {
    return null;
  }
};

export default AlertPopup;
