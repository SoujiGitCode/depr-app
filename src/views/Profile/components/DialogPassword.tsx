import React, { useState, useEffect } from "react";
import {
  DialogActions,
  DialogContent,
  Dialog,
  Button,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Api from "@/utils/services/api";
import useAuthStore from "@/hooks/useAuthStore";
import useAlert from "@/hooks/useAlert";

import { FormControl, FormHelperText } from "@mui/material";
import { CustomLabel } from "@/components";

interface PasswordDialogProps {
  open: boolean;
  handleClose: () => void;
}

const DialogPassword: React.FC<PasswordDialogProps> = ({
  open,
  handleClose,
}) => {
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { setAlert } = useAlert();
  const token = useAuthStore((state: any) => state.token);
  const [errorMessage, setErrorMessage] = useState("");

  const changePassword = async (pswd: string) => {
    Api.token = token;
    Api.resource = "/user/changepwd";

    try {
      const send = {
        body: {
          password: pswd,
        },
      };

      const resp = await Api.post(send);
      console.log(resp);

      if (resp.message === "success") {
        handleClose();
        setAlert("Cambio su contraseña exitosamente!", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let newErrorMessage = "";
    let isValid = true;

    if (password.trim() === "") {
      newErrorMessage = "";
      isValid = false;
    } else if (password.length < 8) {
      newErrorMessage = "La contraseña debe tener al menos 8 caracteres.";
      isValid = false;
    } else if (!/\d/.test(password)) {
      newErrorMessage = "La contraseña debe contener al menos un dígito.";
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrorMessage =
        "La contraseña debe contener al menos una letra mayúscula.";
      isValid = false;
    }

    setErrorMessage(newErrorMessage);
    setIsFormValid(isValid);
  }, [password]);

  return (
    <form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={true}
        sx={{
          "& .MuiDialog-paper": {
            minHeight: "40vh",
            maxHeight: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }} // aquí es donde aplicas los estilos personalizados
      >
        {/* <DialogTitle id="form-dialog-title">Cambiar Contraseña</DialogTitle> */}
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            color: "#807BB8",
            fontSize: "2.2em !important",
            fontWeight: "bolder",
            paddingTop: "1em",
          }}
        >
          Cambiar Contraseña
        </Typography>
        <DialogContent
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FormControl fullWidth margin="normal" required>
            <CustomLabel name="Nueva Contraseña" required={true} />
            <TextField
              id="password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#aeacc2c0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#807BB8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#807BB8",
                  },
                },
              }}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errorMessage}
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{
            paddingBottom: "2em",
            display: "flex",
            width: "75%",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            color="primary"
            sx={{ width: "45%" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => changePassword(password)}
            color="primary"
            variant="contained"
            disabled={!isFormValid}
            sx={{ width: "45%" }}
          >
            Cambiar
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default DialogPassword;
