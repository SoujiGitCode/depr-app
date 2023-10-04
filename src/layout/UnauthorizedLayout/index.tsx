import { Grid, Typography, Box, Button, List, ListItem, ListItemText, IconButton, Divider } from "@mui/material";
import { Header, Footer } from "@/layout";
import { Outlet } from "react-router-dom";
import AlertPopup from "@/components/AlertPopup";
import styles from "./styles.module.scss";
import icon from "../../assets/images/icon.png"
import logo from "../../assets/images/logo.png"
import { PATH } from "@/routes/constants";

const UnautoziredLayout = () => {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <AlertPopup />

        {/* Header */}
        <Box sx={{ bgcolor: '#697FAA' }}>
          <Grid container
            justifyContent="center"
            alignItems="center"
            sx={{
              height: '32px',
              padding: '0px 110px', // padding: 0px, 110px, 0px, 110px
              alignItems: 'center', // Alineación vertical
            }}
          >
            <Grid item>
              {/* Imagen de icono al lado izquierdo */}
              <img src={icon} alt="Icono" style={{ height: '1.5em' }} />
            </Grid>
            <Grid item xs>
              {/* Contenido del Header */}
              <Typography className={styles.headerFont}>
                Portal oficial del Gobierno de Puerto Rico
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Nav */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>

          {/* Primer Grid a la izquierda */}
          <Grid container item xs={5} alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h5">
                PORTAL DE CERTIFICACIONES ACADÉMICAS
              </Typography>
            </Grid>
            <Grid item>
              <img src={logo} alt="Logo" style={{ height: '70px' }} />
            </Grid>
          </Grid>

          {/* Segundo Grid a la derecha */}
          <Grid container item xs={4} direction="column" alignItems="flex-end" spacing={2}>
            <Grid item>
              <Button variant="contained" color="secondary" href={PATH.LOGIN}>Iniciar Sesión</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary" href={PATH.REGISTER}>Registrarme</Button>
            </Grid>
          </Grid>

        </Box>

        {/* Main Content */}
        <Box className={styles.outletContainer}>
          <Outlet />
        </Box>

        <Footer />

      </Box >
    </>

  );
};



export default UnautoziredLayout;
