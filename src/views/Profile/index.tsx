import { Grid, Button, Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "./validations";
import styles from "./profile.module.scss";
import TitleSection from "./components/TitleSection";
import UserProfileInfo from "./components/UserProfileIInfo";
import UserEditProfile from "./components/UserEditProfile";
import UserAdditionalInfo from "./components/UserAdditionalnfo";
import UserEditAdditionalInfo from "./components/UserEditAdditionalInfo";
import Api from "@/utils/services/api";
import useAuthStore from "@/hooks/useAuthStore";

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

export interface UserDetails {
  id: string;
  email: string;
  password: string;
  identification_type: string;
  identification: string;
  first_name: string;
  second_name: string;
  last_name: string;
  second_last_name: string;
  birthdate: string;
  gender: string;
  phone: string;
  social_security: string;
  depr_first_name: string;
  depr_second_name: string;
  depr_last_name: string;
  depr_second_last_name: string;
  depr_birthdate: string;
  depr_gender: string;
  depr_phone: string;
  depr_social_security: string;
  ip_origin: string;
  status: string;
  created: string;
  updated: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: UserDetails;
}

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState<UserDetails>();
  const token = useAuthStore((state: any) => state.token);
  const [formValues, setFormValues] = useState({
    id: "",
    email: "",
    password: "",
    identification_type: listId[0].value,
    identification: "",
    first_name: "",
    second_name: "",
    last_name: "",
    second_last_name: "",
    birthdate: "",
    gender: listGenre[0].value,
    phone: "",
    social_security: "",
    depr_first_name: "",
    depr_second_name: "",
    depr_last_name: "",
    depr_second_last_name: "",
    depr_birthdate: "",
    depr_gender: "",
    depr_phone: "",
    depr_social_security: "",
    ip_origin: "",
    status: "",
    created: "",
    updated: "",
  });

  const getDetails = async () => {
    Api.token = token;
    Api.resource = "/user/";
    try {
      const resp = await Api.get<ApiResponse>();
      const cast: UserDetails = resp.data;
      setUserInfo(cast);
      formik.setValues(cast);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetails();
  }, [token]);

  const editMode = () => {
    setIsEditMode(!isEditMode);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      email: "",
      password: "",
      identification_type: listId[0].value,
      identification: "",
      first_name: "",
      second_name: "",
      last_name: "",
      second_last_name: "",
      birthdate: "",
      gender: listGenre[0].value,
      phone: "",
      social_security: "",
      depr_first_name: "",
      depr_second_name: "",
      depr_last_name: "",
      depr_second_last_name: "",
      depr_birthdate: "",
      depr_gender: "",
      depr_phone: "",
      depr_social_security: "",
      ip_origin: "",
      status: "",
      created: "",
      updated: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
              {!isEditMode && userInfo ? (
                <UserProfileInfo formik={formik} />
              ) : (
                <>{userInfo && <UserEditProfile formik={formik} />}</>
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
                      id: formik.values.id,
                      email: formik.values.email,
                      password: formik.values.password,
                      identification_type: formik.values.identification_type,
                      identification: formik.values.identification,
                      first_name: formik.values.first_name,
                      second_name: formik.values.second_name,
                      last_name: formik.values.last_name,
                      second_last_name: formik.values.second_last_name,
                      birthdate: formik.values.birthdate,
                      gender: formik.values.gender,
                      phone: formik.values.phone,
                      social_security: formik.values.social_security,
                      depr_first_name: formik.values.depr_first_name,
                      depr_second_name: formik.values.depr_second_name,
                      depr_last_name: formik.values.depr_last_name,
                      depr_second_last_name:
                        formik.values.depr_second_last_name,
                      depr_birthdate: formik.values.depr_birthdate,
                      depr_gender: formik.values.depr_gender,
                      depr_phone: formik.values.depr_phone,
                      depr_social_security: formik.values.depr_social_security,
                      ip_origin: formik.values.ip_origin,
                      status: formik.values.status,
                      created: formik.values.created,
                      updated: formik.values.updated,
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
              {!isEditMode && userInfo ? (
                <UserAdditionalInfo formik={formik} />
              ) : (
                <>
                  {userInfo && (
                    <UserEditAdditionalInfo
                      formik={formik}
                      listGenre={listGenre}
                      listId={listId}
                      isEditMode={isEditMode}
                    />
                  )}
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
