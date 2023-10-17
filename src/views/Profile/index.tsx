import {
  Grid,
  Button,
  Typography,
  Box,
  Divider,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { validationSchema } from "./validations";
import styles from "./profile.module.scss";
import { getFormattedDate } from "@/utils/helpers";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const listId = [
    {
      value: "licencia",
      label: "Lic",
    },
    {
      value: "id",
      label: "Real Id",
    },
  ];
  const listGenre = [
    {
      value: "f",
      label: "Femenino",
    },
    {
      value: "m",
      label: "Masculino",
    },
    {
      value: "n",
      label: "No Indica",
    },
  ];

  const [formValues, setFormValues] = useState({
    name: "",
    social_security: "",
    birth_date: "",
    phone_number: "",
    email: "",
    school: "",
    genre: listGenre[0].value,
    docType: listId[0].value,
  });

  const editMode = () => {
    setIsEditMode(!isEditMode);
  };

  const formik = useFormik({
    initialValues: {
      docType: listId[0].value,
      name: "",
      social_security: "",
      birth_date: "",
      phone_number: "",
      email: "",
      school: "",
      genre: listGenre[0].value,
      docNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Aquí puedes manejar la lógica de envío del formulario si pasa la validación.
    },
  });

  const customText = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "pink",
      borderRadius: 0,
      border: "2px solid " + "#a09c9c92",
    },
    width: "100%",
  };

  const customTextSecond = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderRadius: 0,
      border: "2px solid " + "#a09c9c92",
    },
    width: "40%",
  };

  const licTextField = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderRadius: 0,
      border: "2px solid " + "#a09c9c92",
    },
    width: "4.6rem",
    paddingRight: "1rem",
  };

  return (
    <>
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
          sm={5}
        >
          {/* title*/}
          <Box
            sx={{
              width: "100%",
              paddingTop: "2rem",
              paddingBottom: "2rem",
              paddingLeft: "7.3rem",
            }}
          >
            <Typography variant="h4" className={styles["title"]}>
              Profile
            </Typography>
          </Box>

          {/*Aqui van los inputs */}
          <Box
            sx={{
              flexDirection: "row",
              width: isEditMode ? "100%" : "70%",
              height: "70%",
              paddingLeft: isEditMode ? "7rem" : "2rem",
              paddingTop: "1.5rem",
            }}
          >
            <Box
              sx={{
                height: isEditMode ? "80%" : "60%",
                width: isEditMode ? "130%" : "100%",
              }}
            >
              {!isEditMode ? (
                <>
                  <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Nombre Completo: &nbsp;
                    </Typography>
                    <Typography
                      sx={{
                        lineBreak: "anywhere",
                        fontSize: "1.2rem",
                      }}
                    >
                      {formik.values.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Seguro Social: &nbsp;
                    </Typography>
                    <Typography
                      sx={{
                        lineBreak: "anywhere",
                        fontSize: "1.2rem",
                      }}
                    >
                      {formik.values.social_security}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Fecha de nacimiento: &nbsp;
                    </Typography>
                    <Typography
                      sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}
                    >
                      {getFormattedDate(formik.values.birth_date)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Numero de Telefono: &nbsp;
                    </Typography>
                    <Typography
                      sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}
                    >
                      {formik.values.phone_number}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1.3rem",
                      width: "140%",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Correo electronico: &nbsp;
                    </Typography>
                    <Typography
                      sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}
                    >
                      {formik.values.email}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  {/*name */}
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                      width: "90%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "49%",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      Nombre completo:
                    </Typography>

                    <div style={{ width: "50%" }}>
                      <TextField
                        id="name"
                        name="name"
                        size="small"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={customText}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <Typography
                          sx={{
                            color: "red",
                            fontSize: "0.8rem",
                            paddingTop: "0.5rem",
                          }}
                        >
                          {formik.errors.name}
                        </Typography>
                      )}
                    </div>
                  </Box>

                  {/*social security */}
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                      width: "90%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "49%",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      Seguro Social: &nbsp;
                    </Typography>
                    <div style={{ width: "50%" }}>
                      <TextField
                        id="social_security"
                        name="social_security"
                        value={formik.values.social_security}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={customText}
                      />
                      {formik.touched.social_security &&
                        formik.errors.social_security && (
                          <Typography
                            sx={{
                              color: "red",
                              fontSize: "0.8rem",
                              paddingTop: "0.5rem",
                            }}
                          >
                            {formik.errors.social_security}
                          </Typography>
                        )}
                    </div>
                  </Box>

                  {/*Birthdate */}
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                      width: "90%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "49%",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      fecha de Nacimiento: &nbsp;
                    </Typography>
                    <div style={{ width: "50%" }}>
                      <TextField
                        id="birth_date"
                        name="birth_date"
                        type="date"
                        sx={customText}
                        value={formik.values.birth_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.birth_date &&
                        formik.errors.birth_date && (
                          <Typography
                            sx={{
                              color: "red",
                              fontSize: "0.8rem",
                              paddingTop: "0.5rem",
                            }}
                          >
                            {formik.errors.birth_date}
                          </Typography>
                        )}
                    </div>
                  </Box>

                  {/*phone number */}
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                      width: "90%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "49%",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      Numero de Telefono: &nbsp;
                    </Typography>

                    <div style={{ width: "50%" }}>
                      <TextField
                        id="phone_number"
                        name="phone_number"
                        sx={customText}
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.phone_number &&
                        formik.errors.phone_number && (
                          <Typography
                            sx={{
                              color: "red",
                              fontSize: "0.8rem",
                              paddingTop: "0.5rem",
                            }}
                          >
                            {formik.errors.phone_number}
                          </Typography>
                        )}
                    </div>
                  </Box>

                  {/*Email */}
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                      width: "90%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "49%",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      Correo Electronico: &nbsp;
                    </Typography>
                    <div style={{ width: "50%" }}>
                      <TextField
                        id="email"
                        name="email"
                        sx={customText}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <Typography
                          sx={{
                            color: "red",
                            fontSize: "0.8rem",
                            paddingTop: "0.5rem",
                          }}
                        >
                          {formik.errors.email}
                        </Typography>
                      )}
                    </div>
                  </Box>
                </>
              )}
            </Box>
          </Box>
          {/*Botones */}
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              paddingLeft: "5rem",
            }}
          >
            <Button
              variant="outlined"
              type="submit"
              className={styles["buttons-save"]}
              sx={{
                backgroundColor: formik.isValid ? "#697FAA" : "#697faa62",
                color: "white",
              }}
              onClick={() => {
                if (isEditMode) {
                  // Valida los campos antes de guardar
                  if (formik.isValid) {
                    // Si está en modo edición y los campos son válidos, guarda los valores
                    setFormValues({
                      school: formik.values.school,
                      name: formik.values.name,
                      social_security: formik.values.social_security,
                      birth_date: formik.values.birth_date,
                      phone_number: formik.values.phone_number,
                      email: formik.values.email,
                      docType: formik.values.docType,
                      genre: formik.values.genre,
                    });

                    // Llama a la función onSubmit de formik para manejar la lógica del envío del formulario
                    formik.handleSubmit();
                    setIsEditMode(false);
                  } else {
                    // Si los campos no son válidos, puedes mostrar un mensaje de error o tomar otras medidas
                    console.log("Los campos contienen errores");
                  }
                } else {
                  // No estás en modo edición
                  setIsEditMode(false);
                }
              }}
            >
              Guardar
            </Button>

            <Button
              variant="outlined"
              type="submit"
              onClick={editMode}
              className={styles["buttons-save"]}
            >
              {isEditMode ? "Cancelar" : "Editar"}
            </Button>
          </Box>
        </Grid>

        {/*Second section */}
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          sm={7}
        >
          <div style={{ alignItems: "center", display: "flex" }}>
            <Divider
              orientation="vertical"
              sx={{
                height: "80%",
                borderWidth: "1px",
                borderColor: "#a09c9c92",
              }}
            />
          </div>

          {/*Aqui van los inputs */}
          <Box
            sx={{
              flexDirection: "row",
              width: "70%",
              height: "40%",
              paddingTop: "8rem",
              paddingLeft: "5rem",
            }}
          >
            <>
              {!isEditMode ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Escuela: &nbsp;
                    </Typography>
                    <Typography
                      sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}
                    >
                      {formik.values.school}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Genero: &nbsp;
                    </Typography>
                    <Typography
                      sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}
                    >
                      {formik.values.genre}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1.3rem",
                      width: "140%",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Documento de identidad: &nbsp;
                    </Typography>
                    <Typography
                      sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}
                    >
                      {formik.values.docNumber}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  {/*School */}
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "20%",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      Escuela: &nbsp;
                    </Typography>
                    <div style={{ width: "50%" }}>
                      <TextField
                        id="school"
                        name="school"
                        value={formik.values.school}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={customText}
                      />
                      {formik.touched.school && formik.errors.school && (
                        <Typography
                          sx={{
                            color: "red",
                            fontSize: "0.8rem",
                            paddingTop: "0.5rem",
                          }}
                        >
                          {formik.errors.school}
                        </Typography>
                      )}
                    </div>
                  </Box>

                  {/*Genero*/}
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "20%",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      Genero: &nbsp;
                    </Typography>
                    <TextField
                      select
                      name="genre"
                      id="genre"
                      type="text"
                      variant="outlined"
                      value={formik.values.genre}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.genre && Boolean(formik.errors.genre)
                      }
                      helperText={formik.touched.genre && formik.errors.genre}
                      sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderRadius: 0,
                            border: "2px solid " + "#a09c9c92",
                          },
                        width: "50%",
                      }}
                    >
                      {listGenre.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  {/*ID document */}
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                      width: "90%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "22%",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      <>{isEditMode ? "ID:" : "Documento de Identidad"}</>
                    </Typography>
                    <TextField
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
                      sx={licTextField}
                    >
                      {listId.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          sx={{ width: "3rem" }}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div>
                      <TextField
                        sx={{
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
                              borderRadius: 0,
                              border: "2px solid " + "#a09c9c92",
                            },
                          width: "84%",
                        }}
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
                      />
                      {formik.touched.docNumber && formik.errors.docNumber && (
                        <Typography
                          sx={{
                            color: "red",
                            fontSize: "0.8rem",
                            paddingTop: "0.5rem",
                          }}
                        >
                          {formik.errors.docNumber}
                        </Typography>
                      )}
                    </div>
                  </Box>
                </>
              )}
            </>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
