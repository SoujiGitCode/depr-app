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
  MenuItem,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import registerImage from "../../assets/register.png";
import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router-dom";
import {
  SocialDistanceOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
import CustomLabel from "@/components/CustomLabel";
import { requestRegister } from "./functions";
import { useFormik } from "formik";
import useAlert from "@/hooks/useAlert";
import useAuthStore from "@/hooks/useAuthStore";
import { PATH } from "@/routes/constants";
import { ConfirmationModal } from "@/components";
import { registerValidation } from "@/validations/registerValidation";
import SocialSecurityInput from "../Home/components/SocialSecurityInput";

const Register = () => {
  const { setAlert } = useAlert();
  const setLogin = useAuthStore((state: any) => state.setLogin);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"error" | "success">("error");

  const [validate, setValidate] = useState(false);

  const idList = [
    {
      value: "0",
      label: "Licencia / Real ID",
    },
  ];

  const genderList = [
    {
      value: "F",
      label: "Femenino",
    },
    {
      value: "M",
      label: "Masculino",
    },
    {
      value: "N",
      label: "No Indica",
    },
  ];

  const [isFormValid, setIsFormValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showSocialSecurity, setShowSocialSecurity] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>("No");
  const [loading, setLoading] = useState(false);
  const [socialSecurityArray, setSocialSecurityArray] = useState(
    new Array(9).fill("")
  );

  const formik = useFormik({
    validateOnMount: true,

    initialValues: {
      docType: idList[0].value,
      docNumber: "",
      firstName: "",
      middleName: "",
      lastName: "",
      secondLastName: "",
      firstNameDepr: "",
      middleNameDepr: "",
      lastNameDepr: "",
      secondLastNameDepr: "",
      birthdate: "",
      gender: genderList[0].value,
      phoneNumber: "",
      social_security: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: registerValidation,
    onSubmit: async () => {
      await sendUserForRegister();
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const navigate = useNavigate();

  const OnChangeSelectedValue = (value: string) => {
    setSelectedValue(value);

    formik.setFieldValue(
      "firstNameDepr",
      value === "No" ? "" : formik.values.firstName
    );
    formik.setFieldValue(
      "middleNameDepr",
      value === "No" ? "" : formik.values.middleName
    );
    formik.setFieldValue(
      "lastNameDepr",
      value === "No" ? "" : formik.values.lastName
    );
    formik.setFieldValue(
      "secondLastNameDepr",
      value === "No" ? "" : formik.values.secondLastName
    );
  };

  const modalTriger = (type: "error" | "success") => {
    setOpenModal(true);
    setModalType(type);
  };

  // Send data user
  const sendUserForRegister = async () => {
    try {
      setLoading(true);
      await requestRegister({
        email: formik.values.email,
        first_name: formik.values.firstName,
        middle_name: formik.values.middleName,
        last_name: formik.values.lastName,
        second_last_name: formik.values.secondLastName,
        birthdate: formik.values.birthdate,
        identification_type: formik.values.docType,
        identification: formik.values.docNumber,
        gender: formik.values.gender,
        depr_first_name: formik.values.firstNameDepr,
        depr_middle_name: formik.values.middleNameDepr,
        depr_last_name: formik.values.lastNameDepr,
        depr_second_last_name: formik.values.secondLastNameDepr,
        phone: formik.values.phoneNumber,
        // social_security: formik.values.social_security,
        social_security: socialSecurityArray.join(""),
        password: formik.values.password,
      });
      setAlert("Registro Completado!", "success");
      setLogin(formik.values.email, formik.values.password);
      modalTriger("success");
      // Agrega una espera de 3 segundos antes de logear al usuario
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert(
        "El Registro no pudo ser completado, intente nuevamente",
        "error"
      );
      modalTriger("error");
    }
  };

  if (validate) {
    sendUserForRegister();
    setValidate(false);
  }

  useEffect(() => {
    if (selectedValue === "No") {
      formik.setFieldValue("firstNameDepr", formik.values.firstName);
      formik.setFieldValue("middleNameDepr", formik.values.middleName);
      formik.setFieldValue("lastNameDepr", formik.values.lastName);
      formik.setFieldValue("secondLastNameDepr", formik.values.secondLastName);
    }

    if (selectedValue === "Si") {
      formik.setFieldValue("firstNameDepr", "");
      formik.setFieldValue("middleNameDepr", "");
      formik.setFieldValue("lastNameDepr", "");
      formik.setFieldValue("secondLastNameDepr", "");
    }
  }, [
    selectedValue,
    formik.values.firstName,
    formik.values.middleName,
    formik.values.lastName,
    formik.values.secondLastName,
  ]);

  useEffect(() => {
    if (!formik.isValid) {
      console.log(formik.errors);
    }
    console.log(formik.isValid);
  }, [formik.isValid, formik.errors]);

  const toggleSocialSecurityVisibility = () => {
    setShowSocialSecurity(!showSocialSecurity);
    if (!showSocialSecurity) {
      formik.setFieldValue("social_security", socialSecurityArray.join("")); // Mostrar valor real
    } else {
      formik.setFieldValue(
        "social_security",
        maskSocialSecurity(socialSecurityArray.join(""))
      );
    }
  };

  //----------------Funciones del Social Security Input-------------------//

  const handleSocialSecurityChange = (e: any) => {
    const { value: input, selectionStart, selectionEnd } = e.target;

    // Crear una copia del array actual
    let updatedArray = [...socialSecurityArray];

    // Calcular la diferencia de longitud entre el input y el array actual
    const diff = input.length - updatedArray.join("").length;

    // Manejar la adición o eliminación de caracteres
    if (diff > 0) {
      // Adición de caracteres
      const newChars = input.slice(selectionStart - diff, selectionStart);
      updatedArray.splice(selectionStart - diff, 0, ...newChars.split(""));
    } else if (diff < 0) {
      // Eliminación de caracteres
      updatedArray.splice(selectionStart, -diff);
    }

    // Asegurar que el array no exceda la longitud máxima y rellenar con espacios vacíos si es necesario
    updatedArray = updatedArray.slice(0, 9);
    while (updatedArray.length < 9) {
      updatedArray.push("");
    }

    // Actualizar el estado y el valor de Formik
    setSocialSecurityArray(updatedArray);
    formik.setFieldValue("social_security", updatedArray.join(""));
  };

  // Función para enmascarar
  const maskSocialSecurity = (value: any) => {
    const visibleDigits = 4;
    const maskedLength = Math.max(value.length - visibleDigits, 0);
    const masked = value.slice(-visibleDigits);
    return "*".repeat(maskedLength) + masked;
  };

  //----------------Fin de Funciones del Social Security Input-------------------//
  return (
    <Grid container style={{ width: "100%", margin: 0 }}>
      <Grid item xs={6} style={{ overflow: "hidden", height: "auto" }}>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={registerImage}
            alt="login"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          padding: "2em",
        }}
      >
        {!loading ? (
          <form style={{ width: "80%" }} onSubmit={formik.handleSubmit}>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                color: "#807BB8",
                fontSize: "2.2em !important",
                fontWeight: "bolder",
                marginBottom: "1em !important",
              }}
            >
              Registro
            </Typography>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginBottom: "-1em !important" }}>
                  <CustomLabel name="Documento de Identidad" required={true} />
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1em !important" }}
                  >
                    <TextField
                      inputProps={{ readOnly: true }}
                      select
                      name="docType"
                      id="docType"
                      type="text"
                      variant="outlined"
                      value={formik.values.docType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.docType && Boolean(formik.errors.docType)
                      }
                      helperText={
                        formik.touched.docType && formik.errors.docType
                      }
                    >
                      {idList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1em !important" }}
                  >
                    <TextField
                      placeholder="Número de documento"
                      name="docNumber"
                      id="docNumber"
                      type="text"
                      variant="outlined"
                      value={formik.values.docNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.docNumber &&
                        Boolean(formik.errors.docNumber)
                      }
                      helperText={
                        formik.touched.docNumber && formik.errors.docNumber
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CustomLabel name="Primer Nombre" required={true} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <TextField
                      placeholder="Primer Nombre"
                      name="firstName"
                      id="firstName"
                      type="text"
                      variant="outlined"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <CustomLabel name="Segundo Nombre" required={false} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <TextField
                      placeholder="Segundo Nombre"
                      name="middleName"
                      id="middleName"
                      type="text"
                      variant="outlined"
                      value={formik.values.middleName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.middleName &&
                        Boolean(formik.errors.middleName)
                      }
                      helperText={
                        formik.touched.middleName && formik.errors.middleName
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CustomLabel name="Primer Apellido" required={true} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <TextField
                      placeholder="Primer Apellido"
                      name="lastName"
                      id="lastName"
                      type="text"
                      variant="outlined"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <CustomLabel name="Segundo Apellido" required={true} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <TextField
                      placeholder="Segundo Apellido"
                      name="secondLastName"
                      id="secondLastName"
                      type="text"
                      variant="outlined"
                      value={formik.values.secondLastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.secondLastName &&
                        Boolean(formik.errors.secondLastName)
                      }
                      helperText={
                        formik.touched.secondLastName &&
                        formik.errors.secondLastName
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/*--------------------WARNING Card------------------*/}
            <Box
              mt={2}
              mb={2}
              justifyContent="center"
              sx={{
                background: "#FFF4E5",
                marginTop: "2em !important",
                marginBottom: "2em !important",
                width: "calc(100% + 16px)",
              }}
            >
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={1}>
                  <IconButton color="warning">
                    <WarningIcon fontSize="large" />
                  </IconButton>
                </Grid>

                <Grid item xs={8}>
                  <Typography variant="body1" color="textPrimary">
                    ¿Los datos de la licencia de conducir o Real ID del
                    solicitante (Nombre y Apellido) son diferentes a la
                    información registrada en el Departamento de Educación
                    (DEPR)?
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="left"
                    width="100%"
                    gap={2}
                  >
                    <Box display="flex" alignItems="center" gap={0}>
                      <Radio
                        checked={selectedValue === "Si"}
                        onChange={() => OnChangeSelectedValue("Si")}
                        value="Si"
                        name="unique-radio-buttons"
                        color="primary"
                        sx={{
                          width: "24px",
                          height: "24px",
                          padding: "2px",
                          "&.Mui-checked": {
                            color: "#333333",
                          },
                        }}
                      />
                      <Typography variant="body1" color="textPrimary">
                        Sí
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0}>
                      <Radio
                        checked={selectedValue === "No"}
                        onChange={() => OnChangeSelectedValue("No")}
                        value="No"
                        name="unique-radio-buttons"
                        color="primary"
                        sx={{
                          width: "24px",
                          height: "24px",
                          padding: "2px",
                          "&.Mui-checked": {
                            color: "#333333",
                          },
                        }}
                      />
                      <Typography variant="body1" color="textPrimary">
                        No
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/*--------------------DEPR personal data------------------*/}
            {selectedValue === "Si" && (
              <>
                <Box>
                  <Grid item xs={12}>
                    <Typography variant="body1" textAlign="center">
                      Datos Personales en Educación (DEPR)
                    </Typography>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <CustomLabel name="Primer Nombre" required={true} />
                      <FormControl
                        fullWidth
                        margin="normal"
                        required
                        sx={{ marginBottom: "1.5em !important" }}
                      >
                        <TextField
                          placeholder="Primer Nombre DEPR"
                          name="firstNameDepr"
                          id="firstNameDepr"
                          type="text"
                          variant="outlined"
                          value={formik.values.firstNameDepr}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.firstNameDepr &&
                            Boolean(formik.errors.firstNameDepr)
                          }
                          helperText={
                            formik.touched.firstNameDepr &&
                            formik.errors.firstNameDepr
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomLabel name="Segundo Nombre" required={false} />
                      <FormControl
                        fullWidth
                        margin="normal"
                        required
                        sx={{ marginBottom: "1.5em !important" }}
                      >
                        <TextField
                          placeholder="Segundo Nombre DEPR"
                          name="middleNameDepr"
                          id="middleNameDepr"
                          type="text"
                          variant="outlined"
                          value={formik.values.middleNameDepr}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.middleNameDepr &&
                            Boolean(formik.errors.middleNameDepr)
                          }
                          helperText={
                            formik.touched.middleNameDepr &&
                            formik.errors.middleNameDepr
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <CustomLabel name="Primer Apellido" required={true} />
                      <FormControl
                        fullWidth
                        margin="normal"
                        required
                        sx={{ marginBottom: "1.5em !important" }}
                      >
                        <TextField
                          placeholder="Primer Apellido DEPR"
                          name="lastNameDepr"
                          id="lastNameDepr"
                          type="text"
                          variant="outlined"
                          value={formik.values.lastNameDepr}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.lastNameDepr &&
                            Boolean(formik.errors.lastNameDepr)
                          }
                          helperText={
                            formik.touched.lastNameDepr &&
                            formik.errors.lastNameDepr
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomLabel name="Segundo Apellido" required={true} />
                      <FormControl
                        fullWidth
                        margin="normal"
                        required
                        sx={{ marginBottom: "1.5em !important" }}
                      >
                        <TextField
                          placeholder="Segundo Apellido DEPR"
                          name="secondLastNameDepr"
                          id="secondLastNameDepr"
                          type="text"
                          variant="outlined"
                          value={formik.values.secondLastNameDepr}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.secondLastNameDepr &&
                            Boolean(formik.errors.secondLastNameDepr)
                          }
                          helperText={
                            formik.touched.secondLastNameDepr &&
                            formik.errors.secondLastName
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}

            {/*--------------------END DEPR personal data---------------*/}

            <Box>
              <Grid
                container
                spacing={2}
                sx={{ marginBottom: "1.5em !important" }}
              ></Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CustomLabel name="Fecha de Nacimiento" required={true} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <TextField
                      placeholder="Fecha de Nacimiento"
                      id="birthdate"
                      name="birthdate"
                      type="date"
                      value={formik.values.birthdate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.birthdate &&
                        Boolean(formik.errors.birthdate)
                      }
                      helperText={
                        formik.touched.birthdate && formik.errors.birthdate
                      }
                      inputProps={{
                        max: new Date().toISOString().split("T")[0], // Limita la fecha a hoy
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <CustomLabel name="Género" required={false} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <TextField
                      select
                      name="gender"
                      id="gender"
                      type="text"
                      variant="outlined"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.gender && Boolean(formik.errors.gender)
                      }
                      helperText={formik.touched.gender && formik.errors.gender}
                    >
                      {genderList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CustomLabel name="Teléfono" required={true} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <TextField
                      placeholder="Teléfono"
                      name="phoneNumber"
                      id="phoneNumber"
                      type="text"
                      variant="outlined"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                      }
                      helperText={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <CustomLabel name="Seguro Social" required={true} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <SocialSecurityInput
                      variant="outlined"
                      placeholder="N° Seguro Social"
                      id="social_security"
                      type="text"
                      name="social_security"
                      value={socialSecurityArray}
                      visibilityPassword={showSocialSecurity}
                      setVisibilityPassword={setShowSocialSecurity}
                      formik={formik}
                      setSocialSecurityArray={setSocialSecurityArray}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomLabel name="Correo Eléctronico" required={true} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <TextField
                      placeholder="Correo Eléctronico"
                      name="email"
                      id="email"
                      type="text"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <CustomLabel name="Contraseña" required={true} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <TextField
                      placeholder="Contraseña"
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <CustomLabel name="Confirmar Contraseña" required={false} />
                  <FormControl
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginBottom: "1.5em !important" }}
                  >
                    <TextField
                      placeholder="Confirmar Contraseña"
                      name="repeatPassword"
                      id="repeatPassword"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      value={formik.values.repeatPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.repeatPassword &&
                        Boolean(formik.errors.repeatPassword)
                      }
                      helperText={
                        formik.touched.repeatPassword &&
                        formik.errors.repeatPassword
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              sx={{
                marginBottom: "2.5em !important",
                marginTop: "2.5em !important",
                padding: "1.5em",
              }}
            >
              <IconButton color="warning">
                <WarningIcon />
              </IconButton>
              <Typography variant="body1" ml={2}>
                Al presionar el botón de continuar, confirma que ha leído las
                advertencias y acepta las Condiciones de Uso.
              </Typography>
            </Box>

            <Box
              mt={2}
              sx={{
                gap: 2,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{
                  width: "241.5px",
                  height: "48px",
                  padding: "8px 40px",
                  borderRadius: "4px",
                  border: "2px solid",
                  marginRight: "16px",
                  fontSize: "0.7em",
                }}
                href={PATH.LOGIN}
              >
                Ya Tengo una cuenta
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formik.isValid}
                style={{
                  width: "241.5px",
                  height: "48px",
                  padding: "8px 40px",
                  borderRadius: "4px",
                  marginRight: "16px",
                  fontSize: "0.7em",
                }}
                // onClick={() => modalTriger('success')}
              >
                Registrarme
              </Button>
            </Box>
          </form>
        ) : (
          <Box
            style={{ width: "80%", display: "flex", justifyContent: "center" }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={11}
                sx={{
                  marginTop: "2.5em !important",
                  marginBottom: "2.5em !important",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontSize: "1.5em !important",
                    fontWeight: "bolder",
                    marginBottom: "1em !important",
                    marginTop: "2em !important",
                  }}
                >
                  Cargando
                </Typography>
                <br />
                <br />
                <CircularProgress />
              </Grid>

              <Grid item xs={11} sx={{ marginBottom: "2.5em !important" }}>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography variant="body1" color="textPrimary">
                      Validando sus datos, por favor espere. No cierre ni
                      recargue esta página.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        type={modalType}
      />
    </Grid>
  );
};

export default Register;
