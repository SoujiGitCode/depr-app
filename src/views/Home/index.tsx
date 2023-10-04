import { useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import styles from "./styles.module.scss";

import useAlert from "@/hooks/useAlert";
import RequiredDocuments from "./components/RequiredDocuments";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useAuthStore from "@/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/utils/";

const Home = () => {
  const { setAlert } = useAlert();
  const logout = useAuthStore((state: any) => state.setLogout);
  const token = useAuthStore((state: any) => state.token);
  const navigate = useNavigate();


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  const handleLogout = async () => {
    try {
      await logOut(token);
      logout();
      navigate('/')
    } catch (error) {
      navigate('/')
      logout();
    }
  };

  setTimeout(() => {
    //LogOut after 60min - 3600000ms
    setAlert("Session expired", "warning")
    handleLogout()
  }, 3600000);

  return (
    <Grid
      container
      sx={{
        minHeight: "90vh",
        ...(isMobile && {
          minHeight: "80vh",
        }),
      }}
    >
      <Grid
        item
        xs={12}
        className={styles["image-banner"]}
        sx={{
          ...(isMobile && {
            maxHeight: "25vh",
            marginBottom: "0rem",
          }),
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
              padding={5}
              border={1}
              gap={4}
              borderRadius={2}
              borderColor="divider"
            >
              <Typography variant="h6" gutterBottom style={{ color: '#FFFFFF', fontSize: '1.5em !important' }}>
                Bienvenido
              </Typography>
              <Typography variant="body1" gutterBottom style={{ color: '#FFFFFF', fontSize: '1em !important' }}>
                Al Portal de Certificaciones Académicas
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: 48,
                  padding: '8px 40px',
                  borderRadius: 4,
                  gap: 2,
                  fontSize: '1em !important'
                }}
              >
                Crear Solicitud
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
