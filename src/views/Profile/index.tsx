import { Button, Box, Divider } from "@mui/material";
import Grid from '@mui/material/Grid';
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
  email: string;
  identification: string;
  depr_first_name: string;
  depr_second_name: string;
  depr_last_name: string;
  depr_second_last_name: string;
  depr_birthdate: string;
  depr_gender: string;
  depr_phone: string;
  depr_social_security: string;
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
  const [formValid, setFormValid] = useState(false);
  const [formValues, setFormValues] = useState({
    identification: "",
    email: "",
    depr_first_name: "",
    depr_second_name: "",
    depr_last_name: "",
    depr_second_last_name: "",
    depr_birthdate: "",
    depr_gender: "",
    depr_phone: "",
    depr_social_security: "",
  });

  const getDetails = async () => {
    Api.token = token;
    Api.resource = "/user/";
    try {
      const resp = await Api.get<ApiResponse>();
      const cast: UserDetails = resp.data;
      console.log(cast)
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

  const UpdateChangesProfile = async (values: UserDetails) => {
    Api.token = token;
    Api.resource = "/user/modify";
    try {
      const res = await Api.post({
        body: {
          ...values
        },
      })

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };


  const formik = useFormik({
    initialValues: {
      identification: "",
      email: "",
      depr_first_name: "",
      depr_second_name: "",
      depr_last_name: "",
      depr_second_last_name: "",
      depr_birthdate: "",
      depr_gender: "",
      depr_phone: "",
      depr_social_security: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {

      await UpdateChangesProfile(values)
      getDetails();
    },

    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true
  });

  useEffect(() => {
    getDetails();
    console.log('consulting info')
  }, [isEditMode]);



  useEffect(() => {
    if (!formik.isValid) {
      console.log(formik.errors);
      setFormValid(false)
      return
    }
    if (formik.isValid) {
      setFormValid(true)
    }
    console.log('isStepValid ' + formValid)
  }, [formik.values, formik.touched, formik.isValid]);

  return (
    <>
      <Grid container sx={{ height: "100%", paddingLeft: '12%' }}>
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
              width: '100%',
              minHeight: "70%",
              paddingLeft: '0%',
              paddingTop: "1.5rem",
            }}
          >
            <Box
              sx={{
                width: '100%',
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
              // background: 'red',
              flexDirection: "row",
              display: "flex",
              width: "100%",
              justifyContent: "start",
            }}
          >
            <Button
              disabled={!isEditMode}
              variant="contained"
              type="submit"
              className={styles["buttons-save"]}
              sx={{ marginRight: "5% !important" }}

              onClick={() => {
                if (isEditMode) {
                  // Valida los campos antes de guardar
                  if (formik.isValid) {
                    // Si está en modo edición y los campos son válidos, guarda los valores
                    setFormValues({
                      identification: formik.values.identification || '',
                      email: formik.values.email || '',
                      depr_first_name: formik.values.depr_first_name || '',
                      depr_second_name: formik.values.depr_second_name || '',
                      depr_last_name: formik.values.depr_last_name || '',
                      depr_second_last_name: formik.values.depr_second_last_name || '',
                      depr_birthdate: formik.values.depr_birthdate || '',
                      depr_gender: formik.values.depr_gender || '',
                      depr_phone: formik.values.depr_phone || '',
                      depr_social_security: formik.values.depr_social_security || '',
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
          sm={5}
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
              width: "100%",
              paddingTop: "8rem",
              paddingLeft: "6%",
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
