import React, { useState, useEffect, isValidElement } from "react";
import foto from "../../assets/images/recovery.png";
import { Typography, TextField, Button, FormControl } from "@mui/material";
import { CustomLabel } from "@/components";
import useAlert from "@/hooks/useAlert";
import { useNavigate } from "react-router-dom";
import Api from "@/utils/services/api";

interface ResponseData {
  code: number;
  message: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: ResponseData;
}

const Recovery = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    setIsFormValid(isEmailValid);
  }, [email]);

  const sendEmail = async (email: string) => {
    Api.resource = "/user/recoverypwd";
    const send = {
      body: {
        email: email,
      },
    };

    console.log(send);
    try {
      const resp = await Api.post(send);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <div
        style={{
          width: "100%",
          height: "50vh",
          display: "flex",
        }}
      >
        <div style={{ width: "50%", height: "100%" }}>
          <img src={foto} alt="ola" style={{ height: "100%", width: "100%" }} />
        </div>

        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              color: "#807BB8",
              fontSize: "2em !important",
              fontWeight: "bolder",
              marginBottom: "1em !important",
              paddingTop: "1em",
              marginLeft: "-1.6rem !important",
            }}
          >
            Restablecer Contraseña
          </Typography>
          <div style={{ width: "50%" }}>
            <p>
              Enviaremos un enlace a su correo electrónico, el cual le permitirá
              restablecer su contraseña.
            </p>
          </div>
          <FormControl
            fullWidth
            margin="normal"
            required
            sx={{
              marginBottom: "1.5em !important",
              width: "50%",
              paddingTop: "2em",
            }}
          >
            <CustomLabel name="Correo Eléctronico" required={true} />
            <TextField
              id="email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          {/* buttons */}

          <div
            style={{
              width: "53%",
              justifyContent: "space-around",
              display: "flex",
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: "45%" }}
              onClick={() => navigate("/")}
            >
              Regresar
            </Button>
            <Button
              variant="contained"
              sx={{ width: "45%" }}
              disabled={!isFormValid}
              onClick={() => {
                sendEmail(email);
              }}
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Recovery;
