import { useState, useEffect } from 'react';

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
} from '@mui/material';
import registerImage from '../../assets/register.png';
import Radio from '@mui/material/Radio';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
import CustomLabel from "@/components/CustomLabel";
import { requestRegister } from "./functions";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Register.module.scss";
import useAlert from "@/hooks/useAlert";
import useAuthStore from "@/hooks/useAuthStore";
import { PATH } from '@/routes/constants';
import { ConfirmationModal } from '@/components';



const Register = () => {
  const { setAlert } = useAlert();
  const setLogin = useAuthStore((state: any) => state.setLogin);

  const [openModal, setOpenModal] = useState(false);

  const [validate, setValidate] = useState(false);

  const listId = [
    {
      value: 'licencia',
      label: 'Licencia',
    },
    {
      value: 'id',
      label: 'Real Id',
    },
  ];

  const listGenre = [
    {
      value: 'f',
      label: 'Femenino',
    },
    {
      value: 'm',
      label: 'Masculino',
    },
    {
      value: 'n',
      label: 'No Indica',
    },
  ];



  const [isFormValid, setIsFormValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showSocialSecurity, setShowSocialSecurity] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>('No');


  const formik = useFormik({
    initialValues: {
      docType: listId[0].value,
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
      genre: listGenre[0].value,
      phoneNumber: "",
      socialSecurity: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      docNumber: Yup.string()
        .required("Número de documento requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

      firstName: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Primer Nombre solo debe contener letras")
        .required("Primer Nombre requerido")
        .max(20, "máximo 20 caracteres"),

      middleName: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Segundo Nombre solo debe contener letras")
        .max(20, "máximo 20 caracteres"),

      lastName: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Apellido solo debe contener letras")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

      secondLastName: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Segundo Apellido solo debe contener letras")
        .max(20, "máximo 20 caracteres"
        ),

      firstNameDepr: Yup.string()
        .matches(/^[A-Za-z]+$/, "El nombre solo debe contener letras")
        .required("Primer nombre requerido")
        .max(20, "máximo 20 caracteres"),

      middleNameDepr: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Segundo Nombre solo debe contener letras")
        .max(20, "máximo 20 caracteres"),

      lastNameDepr: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Apellido solo debe contener letras")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

      secondLastNameDepr: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Segundo Apellido solo debe contener letras")
        .max(20, "máximo 20 caracteres"
        ),

      email: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .required("Correo electronico es requerido")
        .max(100, "máximo 100 caracteres"),

      phoneNumber: Yup.string()
        .required("Teléfono requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

      socialSecurity: Yup.string()
        .required("Seguro Social requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

      birthdate: Yup.string().required("Fecha de nacimiento requerida"),

      password: Yup.string()
        .required("Contraseña no puede estar vacío")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\;])[a-zA-Z\d!@#$%^&*()\;]{8,}$/,
          "La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y un símbolo"
        )
        .max(20, "máximo 20 caracteres"),
      repeatPassword: Yup.string()
        .required("Confirmar Contraseña no puede estar vacío")
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .max(20, "máximo 20 caracteres"),
    }),

    onSubmit: () => {
      setValidate(true);
    },

    validateOnChange: true, // Esto garantiza que se validen los campos con cada cambio
    validateOnBlur: true,
  });


  const navigate = useNavigate();

  const onCancelRegister = () => {
    navigate("/");
  };

  const OnChangeSelectedValue = (value: string) => {
    setSelectedValue(value);

    formik.setFieldValue("firstNameDepr", value === 'No' ? "" : formik.values.firstName);
    formik.setFieldValue("middleNameDepr", value === 'No' ? "" : formik.values.middleName);
    formik.setFieldValue("lastNameDepr", value === 'No' ? "" : formik.values.lastName);
    formik.setFieldValue("secondLastNameDepr", value === 'No' ? "" : formik.values.secondLastName);
  };

  const customSubmit = () => {
    setOpenModal(true)
  };


  // Send data user
  const senUserForRegister = async () => {
    try {
      await requestRegister({
        email: formik.values.email,
        first_name: formik.values.firstName,
        middle_name: formik.values.middleName,
        last_name: formik.values.lastName,
        second_last_name: formik.values.secondLastName,
        birthdate: formik.values.birthdate,
        password: formik.values.password,
      });
      setAlert("Register successfully!", "success");
      await setLogin(formik.values.email, formik.values.password);
      navigate("/");
    } catch (error) {
      setAlert("Something happened. Try again", "error");
    }
  };

  if (validate) {
    senUserForRegister();
    setValidate(false);
  }
  return (
    <Grid container style={{ width: '100%', margin: 0 }}>
      <Grid item xs={6} style={{ overflow: 'hidden', height: 'auto' }}>
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={registerImage} alt="login" style={{ width: '100%', height: '100%' }} />
        </div>
      </Grid>
      <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', padding: '2em' }}>
        <form style={{ width: '80%' }} onSubmit={formik.handleSubmit}>
          <Typography variant="body1" gutterBottom sx={{ color: '#807BB8', fontSize: '2.2em !important', fontWeight: 'bolder', marginBottom: "1em !important" }}>
            Registro
          </Typography>

          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginBottom: '-1em !important' }}>
                <CustomLabel name="Documento de Identidad" required={true} />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1em !important" }}>
                  <TextField
                    select
                    name="docType"
                    id="docType"
                    type="text"
                    variant="outlined"
                    value={formik.values.docType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.docType && Boolean(formik.errors.docType)}
                    helperText={formik.touched.docType && formik.errors.docType}

                  >
                    {listId.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1em !important" }}>
                  <TextField
                    placeholder="Número de documento"
                    name="docNumber"
                    id="docNumber"
                    type="text"
                    variant="outlined"
                    value={formik.values.docNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.docNumber && Boolean(formik.errors.docNumber)}
                    helperText={formik.touched.docNumber && formik.errors.docNumber}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomLabel name="Primer Nombre" required={true} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='Primer Nombre'
                    name="firstName"
                    id="firstName"
                    type="text"
                    variant="outlined"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <CustomLabel name="Segundo Nombre" required={false} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='Segundo Nombre'
                    name="middleName"
                    id="middleName"
                    type="text"
                    variant="outlined"
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                    helperText={formik.touched.middleName && formik.errors.middleName}
                  />
                </FormControl>
              </Grid>

            </Grid>
          </Box>

          <Box>
            <Grid container spacing={2}>

              <Grid item xs={6}>
                <CustomLabel name="Primer Apellido" required={true} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='Primer Apellido'
                    name="lastName"
                    id="lastName"
                    type="text"
                    variant="outlined"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <CustomLabel name="Segundo Apellido" required={false} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='Segundo Apellido'
                    name="secondLastName"
                    id="secondLastName"
                    type="text"
                    variant="outlined"
                    value={formik.values.secondLastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.secondLastName && Boolean(formik.errors.secondLastName)}
                    helperText={formik.touched.secondLastName && formik.errors.secondLastName}
                  />
                </FormControl>
              </Grid>

            </Grid>
          </Box>


          {/*--------------------WARNING Card------------------*/}
          <Box display="flex" alignItems="center" mt={2} mb={2}
            justifyContent="center"
            sx={{
              background: '#FFF4E5',
              marginTop: '2em !important',
              marginBottom: '2em !important',
              width: 'calc(100% + 16px)'
            }}>
            <IconButton color="warning">
              <WarningIcon fontSize="large" />
            </IconButton>
            <Typography variant="body1" color="textPrimary" flexGrow={1}
              sx={{
                padding: '1em'
              }}>
              ¿Los datos de la licencia de conducir o Real ID del solicitante (Nombre y Apellido) son diferentes a la información registrada en el Departamento de Educación (DEPR)?
            </Typography>
            <Box display="flex" alignItems="center" gap={1} sx={{ marginRight: '8px !important', }}>
              <Radio
                checked={selectedValue === 'Si'}
                onChange={() => OnChangeSelectedValue('Si')}
                value="Si"
                name="unique-radio-buttons"
                color="primary"
                sx={{
                  width: "24px",
                  height: "24px",
                  padding: "2px",
                  '&.Mui-checked': {
                    color: '#333333',
                  }
                }}
              />
              <Typography variant="body1" color="textPrimary">Sí</Typography>
            </Box>
            <Box display="flex" alignItems="center" ml={2} gap={1} sx={{ marginRight: '1em !important' }}>
              <Radio
                checked={selectedValue === 'No'}
                onChange={() => OnChangeSelectedValue('No')}
                value="No"
                name="unique-radio-buttons"
                color="primary"
                sx={{
                  width: "24px",
                  height: "24px",
                  padding: "2px",
                  '&.Mui-checked': {
                    color: '#333333',
                  }
                }}
              />
              <Typography variant="body1" color="textPrimary">No</Typography>
            </Box>
          </Box>

          {/*--------------------DEPR personal data------------------*/}
          {selectedValue === "Si" &&
            <>
              <Box>
                <Grid item xs={12}>
                  <Typography variant='body1' textAlign="center">Datos Personales en Educación (DEPR)</Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <CustomLabel name="Primer Nombre" required={true} />
                    <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                      <TextField
                        placeholder='Primer Nombre DEPR'
                        name="firstNameDepr"
                        id="firstNameDepr"
                        type="text"
                        variant="outlined"
                        value={formik.values.firstNameDepr}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstNameDepr && Boolean(formik.errors.firstNameDepr)}
                        helperText={formik.touched.firstNameDepr && formik.errors.firstNameDepr}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <CustomLabel name="Segundo Nombre" required={false} />
                    <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                      <TextField
                        placeholder='Segundo Nombre DEPR'
                        name="middleNameDepr"
                        id="middleNameDepr"
                        type="text"
                        variant="outlined"
                        value={formik.values.middleNameDepr}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.middleNameDepr && Boolean(formik.errors.middleNameDepr)}
                        helperText={formik.touched.middleNameDepr && formik.errors.middleNameDepr}
                      />
                    </FormControl>
                  </Grid>

                </Grid>
              </Box>

              <Box>

                <Grid container spacing={2}>

                  <Grid item xs={6}>
                    <CustomLabel name="Primer Apellido" required={true} />
                    <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                      <TextField
                        placeholder='Primer Apellido DEPR'
                        name="lastNameDepr"
                        id="lastNameDepr"
                        type="text"
                        variant="outlined"
                        value={formik.values.lastNameDepr}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastNameDepr && Boolean(formik.errors.lastNameDepr)}
                        helperText={formik.touched.lastNameDepr && formik.errors.lastNameDepr}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <CustomLabel name="Segundo Apellido" required={false} />
                    <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                      <TextField
                        placeholder='Segundo Apellido DEPR'
                        name="secondLastNameDepr"
                        id="secondLastNameDepr"
                        type="text"
                        variant="outlined"
                        value={formik.values.secondLastNameDepr}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.secondLastNameDepr && Boolean(formik.errors.secondLastNameDepr)}
                        helperText={formik.touched.secondLastNameDepr && formik.errors.secondLastName}
                      />
                    </FormControl>
                  </Grid>

                </Grid>
              </Box>
            </>
          }

          {/*--------------------END DEPR personal data---------------*/}

          <Box>
            <Grid container spacing={2} sx={{ marginBottom: '1.5em !important' }}>

            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomLabel name="Fecha de Nacimiento" required={true} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='Fecha de Nacimiento'
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    value={formik.values.birthdate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                    helperText={formik.touched.birthdate && formik.errors.birthdate}
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],  // Limita la fecha a hoy
                    }}
                  />

                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <CustomLabel name="Género" required={false} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    select
                    name="genre"
                    id="genre"
                    type="text"
                    variant="outlined"
                    value={formik.values.genre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.genre && Boolean(formik.errors.genre)}
                    helperText={formik.touched.genre && formik.errors.genre}

                  >
                    {listGenre.map((option) => (
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
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='Teléfono'
                    name="phoneNumber"
                    id="phoneNumber"
                    type="text"
                    variant="outlined"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <CustomLabel name="Seguro Social" required={false} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='N° Seguro Social'
                    name="socialSecurity"
                    id="secondLastName"
                    type={showSocialSecurity ? "text" : "password"}
                    variant="outlined"
                    value={formik.values.socialSecurity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.socialSecurity && Boolean(formik.errors.socialSecurity)}
                    helperText={formik.touched.socialSecurity && formik.errors.socialSecurity}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowSocialSecurity(!showSocialSecurity)}
                          >
                            {showSocialSecurity ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>

            </Grid>
          </Box>


          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomLabel name="Correo Eléctronico" required={true} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='Correo Eléctronico'
                    name="email"
                    id="email"
                    type="text"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <CustomLabel name="Contraseña" required={true} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='Contraseña'
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <CustomLabel name="Confirmar Contraseña" required={false} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='Confirmar Contraseña'
                    name="repeatPassword"
                    id="repeatPassword"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                    helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                </FormControl>
              </Grid>

            </Grid>
          </Box>

          <Box display="flex" alignItems="center" sx={{ marginBottom: '2.5em !important', marginTop: '2.5em !important', padding: '1.5em' }}>
            <IconButton color="warning">
              <WarningIcon />
            </IconButton>
            <Typography variant="body1" ml={2}>
              Al presionar el botón de continuar, confirma que ha leído las advertencias y acepta las Condiciones de Uso.
            </Typography>
          </Box>

          <Box mt={2} sx={{ gap: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>

            <Button
              variant="outlined"
              color="primary"
              style={{
                width: '241.5px',
                height: '48px',
                padding: '8px 40px',
                borderRadius: '4px',
                border: '2px solid',
                marginRight: '16px',
                fontSize: '0.7em'
              }}
              href={PATH.LOGIN}
            >
              Ya Tengo una cuenta
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!formik.isValid}
              style={{
                width: '241.5px',
                height: '48px',
                padding: '8px 40px',
                borderRadius: '4px',
                marginRight: '16px',
                fontSize: '0.7em'
              }}
              onClick={() => customSubmit()}
            >
              Registrarme
            </Button>
          </Box>
        </form>


      </Grid>
      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        type="error"
      />
    </Grid >
  );
};

export default Register;
