import { Grid, Box, Typography, TextField, Button, useTheme, useMediaQuery } from "@mui/material";
import styles from "./styles.module.scss";
import recoveryPassImg from "@/assets/recovery-pass.png"

import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from "@mui/material";

import CustomLabel from "@/components/CustomLabel";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiRequest from "@/utils/services/apiService";
import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";

const Recovery = () => {
  // Estados para manejar el modal
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState<'error' | 'success'>('error');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const customContent = {
    success: {
      title: "Solicitud Enviada",
      text: (
        <>
          Hemos recibido su solicitud de Cambio de Contraseña. Enviaremos un enlace a su correo electrónico para cambiar su contraseña.
        </>
      )
    },
    error: {
      title: "Error",
      text: (
        <>
          Ha ocurrido un error al enviar su solicitud, por favor, revise sus datos y vuelva a intentarlo.
          <br />
          Verifique que el correo sea el correcto asociado a su cuenta y/o contacte al Departamento de Educación.
        </>
      )
    }
  };

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .required("Correo electrónico es requerido")
        .max(100, "máximo 100 caracteres"),
    }),

    onSubmit: async (values) => {
      const recoveryRequest = {
        email: values.email,
      };

      const api = new ApiRequest();
      api.resource = "/user/recoverypwd";
      try {
        const response = await api.post({
          body: recoveryRequest,
        });

        // Verificamos el código de respuesta
        if (response.code === 200) {
          // Abrimos el modal
          setOpenModal(true);
          setModalType('success');
        }

      } catch (error) {
        setOpenModal(true);
        setModalType('error');
        console.error(error);
      }
    },

  });

  // Button Cancel
  const handleCancelClick = () => {
    navigate("/");
  };

  const onBack = () => {
    navigate('/login');
  }

  const onCloseModal = () => {
    setOpenModal(false)
    if (modalType === 'success') {
      setTimeout(() => {
        onBack();
      }, 1500);
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={6} style={{ overflow: 'hidden', height: 'auto' }}>
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={recoveryPassImg} alt="Mujer sonriendo sentada frente a un ordenador portatil" style={{ width: '80%', height: '100%', maxHeight: '80vh' }} />
          </div>
        </Grid>

        <Grid item xs={12} lg={6}>

          <Grid container gap={2} padding={2}>
            <Grid item xs={12} >
              <Typography variant="h1" color="#4B4B95" sx={{ fontSize: '2rem', fontWeight: 'bolder' }} >Solicitud de cambio de contraseña</Typography>

              <Typography className={styles["descriptions-recovery"]}>
                Enviaremos un enlace a su correo electrónico donde podrá restablecer su contraseña
              </Typography>
            </Grid>

            <Grid item xs={12} >

              <form onSubmit={formik.handleSubmit}>
                <Grid container>
                  <CustomLabel name="Correo electrónico" required={true} />

                  <Grid item xs={12} lg={10} sx={{ marginBottom: '3rem !important' }}>

                    <TextField
                      id="email"
                      placeholder="example@example.com"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} lg={5} textAlign={'center'} sx={{ marginBottom: '1.5rem !important' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        width: '241.5px',
                        height: 'auto',
                        padding: '12px 40px',
                        borderRadius: '4px',
                        border: '2px solid',
                        fontSize: '0.7rem'
                      }}
                      onClick={() => handleCancelClick()}
                    >
                      Regresar
                    </Button>
                  </Grid>

                  <Grid item xs={12} lg={5} textAlign={'center'} sx={{ marginBottom: '1.5rem !important' }}>
                    <Button type="submit"
                      variant="contained"
                      sx={{
                        width: '241.5px',
                        height: 'auto',
                        padding: '12px 40px',
                        borderRadius: '4px',
                        border: '2px #445679 solid',
                        fontSize: '0.7rem'
                      }}
                    >
                      Recuperar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>

          </Grid>
        </Grid>

        <ConfirmationModal
          open={openModal}
          onClose={onCloseModal}
          content={customContent}
          type={modalType}
        />
      </Grid >
    </>
  );
};

export default Recovery;