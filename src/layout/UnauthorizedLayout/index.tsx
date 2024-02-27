import { Grid, Typography, Box, Button, useTheme, useMediaQuery, Stack } from "@mui/material";
import { Header, Footer } from "@/layout";
import { Outlet } from "react-router-dom";
import AlertPopup from "@/components/AlertPopup";
import styles from "./styles.module.scss";
import icon from "../../assets/images/icon.png"
import logo from "../../assets/images/logo.png"
import { PATH } from "@/routes/constants";
import { AccessibilityWidget } from "@/components";

const UnautoziredLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <Box sx={{ width: '100% !important' }}>
        <AlertPopup />

        {/* Header */}
        <Box sx={{ bgcolor: '#727caa' }}>
          <Grid container
            justifyContent="center"
            alignItems="center"
            sx={{
              padding: '10px 20px', // padding: 0px, 110px, 0px, 110px
              alignItems: 'center', // Alineación vertical
              lineHeight: '1.9'
            }}
          >
            <Grid item>
              {/* Imagen de icono al lado izquierdo */}
              <img src={icon} alt="Icono" style={{ height: '1.5em' }} />
            </Grid>
            <Grid item xs>
              {/* Contenido del Header */}
              <Typography variant="body1" color={'white'}>
                Portal Oficial del Gobierno de Puerto Rico
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Nav */}
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>

          {/* Primer Grid */}
          <Grid container alignItems="center" spacing={0.5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={12} lg={5}>
              <Typography variant="h2" sx={{ textAlign: isMobile ? 'center' : 'start', paddingLeft: !isMobile ? '2.5rem !important' : '0' }}>
                PORTAL DE CERTIFICACIONES ACADÉMICAS
              </Typography>
            </Grid>

            <Grid item xs={12} lg={3} sx={{ textAlign: isMobile ? 'center' : 'start' }}>
              <img src={logo} alt="Logo" style={{ height: 'auto', width: isMobile ? '50%' : '60%' }} />
            </Grid>

            <Grid item xs={12} lg={3}
              sx={{
                display: 'flex', // Habilita flexbox
                flexDirection: 'column', // Alinea los elementos en columna
                alignItems: 'center', // Centra horizontalmente
                justifyContent: 'center', // Centra verticalmente

              }}
            >
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="column"
                sx={{
                  display: 'flex', // Aunque Stack ya usa flexbox, lo especificamos por claridad
                  alignItems: 'center', // Alineación horizontal de los elementos del Stack
                }}
              >
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    href={PATH.LOGIN}
                    sx={{ width: '150px', height: '37px', fontSize: '0.8rem' }}
                  >
                    Iniciar Sesión
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    href={PATH.REGISTER}
                    sx={{ width: '150px', height: '37px', fontSize: '0.8rem' }}
                  >
                    Registrarme
                  </Button>
                </div>
              </Stack>
            </Grid>



          </Grid>

        </Box>
        {/* Main Content */}
        <Box className={styles.outletContainer}>
          <Outlet />
        </Box>

        <Footer isMobile={isMobile} />
        <AccessibilityWidget />
      </Box >
    </>

  );
};



export default UnautoziredLayout;
