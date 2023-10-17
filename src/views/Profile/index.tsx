import { Grid, Button, Typography, Box, Divider, Paper } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { validationSchema } from "./validations";
import styles from "./profile.module.scss";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const editMode = () => {
    setIsEditMode(!isEditMode);
    console.log(isEditMode);
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

          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "70%",
              paddingLeft: "1rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "2rem",
                height: "70%",
              }}
            >
              <Button
                variant="outlined"
                type="submit"
                onClick={editMode}
                className={styles["buttons-profile"]}
              >
                Editar Perfil
              </Button>
            </div>
          </Grid>

          {/*Aqui van los inputs */}
          <Box
            sx={{
              flexDirection: "row",
              width: isEditMode ? "100%" : "70%",
              height: "70%",
              paddingTop: "1.7rem",
              paddingLeft: isEditMode ? "8rem" : "3rem",
            }}
          >
            <Box sx={{ height: isEditMode ? "80%" : "60%" }}>
              {!isEditMode ? (
                <>
                  <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Nombre Completo: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Seguro Social: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.social_security}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Fecha de nacimiento: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.birth_date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Numero de Telefono: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.phone_number}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Correo electronico: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
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
                    <Typography sx={{ width: "49%", fontWeight: "bold" }}>
                      Nombre completo: &nbsp;
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
                    <Typography sx={{ width: "49%", fontWeight: "bold" }}>
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
                    <Typography sx={{ width: "85%", fontWeight: "bold" }}>
                      fecha de Nacimiento: &nbsp;
                    </Typography>
                    <TextField
                      id=" birth_date"
                      name=" birth_date"
                      type="date"
                      sx={customText}
                    />
                  </Box>

                  {/*phone number */}
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                      width: "90%",
                    }}
                  >
                    <Typography sx={{ width: "85%", fontWeight: "bold" }}>
                      Numero de Telefono: &nbsp;
                    </Typography>
                    <TextField
                      id="phone_number"
                      name="phone_number"
                      sx={customText}
                    />
                  </Box>

                  {/*Email */}
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "1rem",
                      width: "90%",
                    }}
                  >
                    <Typography sx={{ width: "85%", fontWeight: "bold" }}>
                      Correo Electronico: &nbsp;
                    </Typography>
                    <TextField id="email" name="email" sx={customText} />
                  </Box>
                </>
              )}
            </Box>

            <Box>
              <Button
                variant="outlined"
                type="submit"
                className={styles["buttons-save"]}
                sx={{ backgroundColor: "#697FAA", color: "white" }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Grid>

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
              paddingTop: "7rem",
              paddingLeft: "5rem",
            }}
          >
            <>
              {!isEditMode ? (
                <>
                  <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Escuela: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.school}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Titulo: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.title1}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Titulo: &nbsp;
                    </Typography>
                    <Typography sx={{ lineBreak: "anywhere" }}>
                      {formik.values.title2}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
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
                    <Typography sx={{ width: "20%", fontWeight: "bold" }}>
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
                    <Typography sx={{ width: "20%", fontWeight: "bold" }}>
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
                    <Typography sx={{ width: "20%", fontWeight: "bold" }}>
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
                    <Typography sx={{ width: "20%", fontWeight: "bold" }}>
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
