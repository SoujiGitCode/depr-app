import { Grid, Button, Typography, Box, Divider } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { validationSchema } from "./validations";
import styles from "./profile.module.scss";
import { getFormattedDate } from "@/utils/helpers";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    social_security: "",
    birth_date: "",
    phone_number: "",
    email: "",
    school: "",
    title1: "",
    title2: "",
    title3: "",
  });

  const editMode = () => {
    setIsEditMode(!isEditMode);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      social_security: "",
      birth_date: "",
      phone_number: "",
      email: "",
      school: "",
      title1: "",
      title2: "",
      title3: "",
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
              height: "60%",
              paddingLeft: isEditMode ? "7rem" : "2rem",
              paddingTop: "1.5rem",
            }}
          >
            <Box
              sx={{
                height: isEditMode ? "80%" : "60%",
                width: isEditMode ? "124%" : "100%",
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

                    <div>
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
                        <Typography sx={{ color: "red" }}>
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
                    <div>
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
                          <Typography sx={{ color: "red" }}>
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
                    <div>
                      <TextField
                        id="birth_date"
                        name="birth_date"
                        type="date"
                        sx={{ ...customText, width: "127%" }}
                        value={formik.values.birth_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.birth_date &&
                        formik.errors.birth_date && (
                          <Typography sx={{ color: "red" }}>
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

                    <div>
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
                          <Typography sx={{ color: "red" }}>
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
                    <div>
                      <TextField
                        id="email"
                        name="email"
                        sx={customText}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <Typography sx={{ color: "red" }}>
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
              sx={{ backgroundColor: "#697FAA", color: "white" }}
              onClick={() => {
                if (isEditMode) {
                  // Si está en modo edición, guardar los valores
                  setFormValues({
                    school: formik.values.school,
                    title1: formik.values.title1,
                    title2: formik.values.title2,
                    title3: formik.values.title3,
                    name: formik.values.name,
                    social_security: formik.values.social_security,
                    birth_date: formik.values.birth_date,
                    phone_number: formik.values.phone_number,
                    email: formik.values.email,
                  });

                  formik.handleSubmit();
                }
                setIsEditMode(false);
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
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.school}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Titulo: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.title1}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Titulo: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.title2}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Titulo: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.title3}
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
                    <div>
                      <TextField
                        id="school"
                        name="school"
                        value={formik.values.school}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={customText}
                      />
                      {formik.touched.school && formik.errors.school && (
                        <Typography sx={{ color: "red" }}>
                          {formik.errors.school}
                        </Typography>
                      )}
                    </div>
                  </Box>

                  {/*title1 */}
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
                      Titulo: &nbsp;
                    </Typography>
                    <div>
                      <TextField
                        id="title1"
                        name="title1"
                        value={formik.values.title1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={customText}
                      />
                      {formik.touched.title1 && formik.errors.title1 && (
                        <Typography sx={{ color: "red" }}>
                          {formik.errors.title1}
                        </Typography>
                      )}
                    </div>
                  </Box>

                  {/*title2 */}
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
                      Titulo: &nbsp;
                    </Typography>
                    <div>
                      <TextField
                        id="title2"
                        name="title2"
                        value={formik.values.title2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={customText}
                      />
                      {formik.touched.title2 && formik.errors.title2 && (
                        <Typography sx={{ color: "red" }}>
                          {formik.errors.title2}
                        </Typography>
                      )}
                    </div>
                  </Box>

                  {/*title3 */}
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
                      Titulo: &nbsp;
                    </Typography>
                    <div>
                      <TextField
                        id="title3"
                        name="title3"
                        value={formik.values.title3}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={customText}
                      />
                      {formik.touched.title3 && formik.errors.title3 && (
                        <Typography sx={{ color: "red" }}>
                          {formik.errors.title3}
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
