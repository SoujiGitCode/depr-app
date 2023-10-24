import { Grid, Button, Box, Divider } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "./validations";
import styles from "./profile.module.scss";
import TitleSection from "./components/TitleSection";
import UserProfileInfo from "./components/UserProfileIInfo";
import UserEditProfile from "./components/UserEditProfile";
import UserAdditionalInfo from "./components/UserAdditionalnfo";
import UserEditAdditionalInfo from "./components/UserEditAdditionalInfo";

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
          <TitleSection />

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
                <UserProfileInfo formik={formik} />
              ) : (
                <UserEditProfile formik={formik} />
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
                <UserAdditionalInfo formik={formik} />
              ) : (
                <UserEditAdditionalInfo
                  formik={formik}
                  listGenre={listGenre}
                  listId={listId}
                  isEditMode={isEditMode}
                />
              )}
            </>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
