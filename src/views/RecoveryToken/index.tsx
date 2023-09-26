import { Grid, Box, Typography, TextField, Button, useTheme, useMediaQuery, IconButton, InputAdornment } from "@mui/material";
import styles from "./styles.module.scss";

import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useLocation, useParams } from "react-router-dom";


import CustomLabel from "@/components/CustomLabel";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiRequest from "@/utils/services/apiService";
import { useEffect, useState } from "react";
import useAlert from "@/hooks/useAlert";

const RecoveryToken = () => {
  // 1. Rearrange useState Hooks:
  const { t } = useParams();
  const cleanT = cleanToken(t);
  console.log(cleanT);
  const [token, setToken] = useState(cleanT ?? '');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { setAlert } = useAlert();
  const navigate = useNavigate();


  // Other states and hooks...

  // Helper function
  function cleanToken(token: string) {
    return token.startsWith("t=") ? token.slice(2) : token;
  }

  // 2. Rearrange useEffects:
  useEffect(() => {
    if (token) {
      checkToken();
    }
  }, [token]);


  const goBack = () => {
    navigate('/');
  }

  const checkToken = async () => {
    console.log('checkToken:', token)
    try {
      const api = new ApiRequest();
      api.resource = "/user";
      api.token = token;

      const response = await api.get({
      });

      console.log(response)

    } catch (error) {
      setToken('');
      console.log(error);
      throw error;
    }
  };

  const onSave = async () => {
    try {
      const recoveryRequest = {
        password: password,
      };

      const api = new ApiRequest();
      api.resource = "/user/changepwd";
      api.token = token;

      const response = await api.post({
        body: recoveryRequest,
      });
      console.log(response)

      if (response.code === 200) {
        setAlert('Password Changed!', "success");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }

    } catch (error) {
      setAlert('Error', "error");
      setToken('');
      console.log(error);
      throw error;
    }
  };


  const primaryColor = "#009999";
  const placeholderColor = "rgba(51, 51, 51, 0.4)";

  const customTextField = {
    width: "60%",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryColor,
      borderRadius: 0,
      border: "2px solid " + primaryColor,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryColor,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryColor,
    },
    "& .MuiInputLabel-outlined": {
      fontSize: "1rem",
      color: placeholderColor,
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: primaryColor,
    },
    "& .MuiOutlinedInput-input": {
      padding: "0.7rem",
    },
    // Estilo para el autocompletado
    "& .MuiOutlinedInput-input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
      WebkitTextFillColor: 'inherit', // Esto es para el color del texto, si quieres mantenerlo
    },
  };

  const isPasswordValid = () => {
    if (password !== '' && password === confirmPassword && passwordError === '') return true;
    return false;
  }

  function isPasswordValidFunction() {
    // Regular expression to match password requirements
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*();])[a-zA-Z\d!@#$%^&*();]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError('Password must have at least 8 characters, a number, a capital letter, and a symbol.');
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords must match.');
      return false;
    }

    // If both checks pass, reset any previous error message and return true
    setPasswordError('');
    return true;
  }

  useEffect(() => {
    isPasswordValidFunction();
  }, [password, confirmPassword]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box className={styles["recovery-container"]}>
            <Box className={styles["background-image"]}></Box>
          </Box>
        </Grid>

        {/* Password Creation Section */}
        <Grid item xs={12} md={6} sx={{ py: 1 }}>


          {token !== '' ? (
            <Box
              sx={{ display: "flex", gap: "1rem" }}
              className={styles["container-recovey"]}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    New Password
                  </Typography>
                </Grid>
                {/* -------------------------------------------------Password -----------------------------------------*/}
                <Grid item xs={12}>
                  <CustomLabel name="Password" required={true} />
                  <TextField
                    sx={customTextField}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* --------------------------------------------Repeat Password -------------------------------------------------------- */}
                <Grid item xs={12}>
                  <CustomLabel name="Confirm Password" required={true} />
                  <TextField
                    sx={customTextField}
                    placeholder="Confirm Password"
                    name="confirmPasword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} className="mb-1 mt-1">
                  {passwordError && (
                    <Typography color="error" sx={{ fontSize: '12px' }}>
                      {passwordError}
                    </Typography>
                  )}
                </Grid>

                <Box sx={{ marginBottom: "3rem !important" }}>
                  <Grid container spacing={2} justifyContent="start" sx={{ py: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="outlined"
                        className={styles.cancelButton}
                        fullWidth
                        onClick={() => goBack()}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        disabled={!isPasswordValid()}
                        type="submit"
                        variant="contained"
                        fullWidth
                        className={styles.submitButton}
                        onClick={() => onSave()}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

              </Grid>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: "1rem" }}
              className={styles["container-recovey"]}>
              <Typography variant="h6" gutterBottom>
                Token Expired
              </Typography>
            </Box>
          )}

        </Grid>

      </Grid >
    </>
  );
};

export default RecoveryToken;