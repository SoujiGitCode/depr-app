import { useState, useEffect } from "react";

import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import loginImage from "../../assets/login.png";
import { CustomLabel } from "@/components";
import { PATH } from "@/routes/constants";
import useAuthStore from "@/hooks/useAuthStore";
import useAlert from "@/hooks/useAlert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const setLogin = useAuthStore((state: any) => state.setLogin);
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const authenticateUser = async () => {
    try {
      await setLogin(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      setAlert("Credenciales de accesso invalidas", "error");
    }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.trim() !== "";

    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  return (
    <Grid container style={{ width: "100%", margin: 0 }}>
      <Grid item xs={12} lg={6} style={{ overflow: "hidden", height: "620px" }}>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={loginImage}
            alt="Grupo de jóvenes graduados sonrientes lanzando birretes al aire en celebración"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </Grid>
      <Grid
        item
        xs={12} lg={6}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          padding: "2em",
        }}
      >
        <form style={{ width: "70%" }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              color: "#4B4B95",
              fontSize: "2.2em !important",
              fontWeight: "bolder",
              marginBottom: "1em !important",
            }}
          >
            Inicio Sesión
          </Typography>
          <FormControl
            fullWidth
            margin="normal"
            required
            sx={{ marginBottom: "1.5em !important" }}
          >
            <CustomLabel name="Correo Electrónico" required={true} />
            <TextField
              id="email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            required
            sx={{ marginBottom: "1.5em !important" }}
          >
            <CustomLabel name="Contraseña" required={true} />
            <TextField
              id="password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormHelperText
            sx={{
              textAlign: "left",
              marginBottom: "3em !important",
              marginTop: "1.5em !important",
            }}
          >
            <Typography
              variant="caption"
              component="a"
              href="#"
              sx={{ fontSize: "16px !important", color: "#2E2EFF" }}
              onClick={() => navigate('/recovery')}
            >
              Olvidé mi contraseña
            </Typography>
          </FormHelperText>
        </form>
        <Box
          mt={2}
          sx={{
            gap: 2,
            width: "70%",
            display: "flex",
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            style={{
              width: "100%",
              height: "48px",
              padding: "8px 30px",
              borderRadius: "4px",
              border: "2px solid",
              marginRight: "16px",
            }}
            href={PATH.REGISTER}
          >
            Registrarme
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            style={{
              width: "100%",
              height: "48px",
              padding: "8px 30px",
              borderRadius: "4px",
              marginRight: "16px",
            }}
            onClick={() => authenticateUser()}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
