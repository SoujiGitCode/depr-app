import { Grid, Typography, Box, Button, useTheme, useMediaQuery, Stack, Collapse, IconButton } from "@mui/material";
import { Header, Footer } from "@/layout";
import { Outlet } from "react-router-dom";
import AlertPopup from "@/components/AlertPopup";
import styles from "./styles.module.scss";
import icon from "../../assets/images/icon.png"
import logo from "../../assets/images/logo.png"
import { PATH } from "@/routes/constants";
import { AccessibilityWidget } from "@/components";
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const UnautoziredLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [showHeaderDescription, setShowHeaderDescription] = useState(false);

  const onClickHeaderDescription = () => {
    setShowHeaderDescription(!showHeaderDescription);
  };

  return (
    <>
      <Box sx={{ width: '100% !important' }}>
        <AlertPopup />

        {/* Header */}
        <Box sx={{ bgcolor: '#495279' }}>
          <Grid container justifyContent="center" alignItems="center" sx={{ padding: '10px 20px', alignItems: 'center', lineHeight: '1.9' }}>
            <Grid item>
              <img src={icon} alt="Icono Departamento de Educación" style={{ height: '1.5em' }} />
            </Grid>
            <Grid item xs sx={{ display: 'inline-flex' }}>
              <Typography variant="body1" color={'white'} sx={{ paddingX: '0.5rem' }}>
                Portal Oficial del Gobierno de Puerto Rico.
              </Typography>

              <Typography variant="body1" color={'white'}
                sx={{

                  display: 'none',
                  paddingLeft: '0.5rem',
                  textDecoration: 'underline',
                }} onClick={onClickHeaderDescription} >
                {/* Enlace con Icono y acción */}
                Así es como usted puede verificarlo
              </Typography>
              <IconButton onClick={onClickHeaderDescription}
                aria-label="Información sobre sitios web oficiales del Gobierno de Puerto Rico"
                sx={{
                  color: "white",
                  padding: '0px',
                  alignItems: 'center',
                  display: 'flex'
                }} size="small">

                {!showHeaderDescription ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
              <Typography variant="body1" color={'white'}
                sx={{
                  paddingLeft: '2.5rem',
                  display: isMobile ? 'none' : 'inline-flex',
                }}>
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Div desplegable */}
        <Collapse in={showHeaderDescription} timeout="auto" unmountOnExit>
          <Box sx={{ padding: '20px', bgcolor: 'lightgray' }}>
            <Grid container>
              <Grid item xs={12} lg={3}
                sx={{
                  borderLeft: '6px solid #495279',
                  paddingX: '0.5rem',
                  marginBottom: isMobile ? '2rem !important' : '0.5rem',
                }}>
                <Typography variant="body1"
                  sx={{ paddingX: '0.5rem' }}>
                  <b> Un sitio web oficial .pr.gov</b>
                  <br />
                  pertenece a una organización
                  oficial del Gobierno de Puerto Rico.
                </Typography>
              </Grid>

              <Grid item xs={12} lg={3}
                sx={{
                  borderLeft: '6px solid #495279',
                  paddingX: '0.5rem',
                  marginBottom: isMobile ? '2rem !important' : '0.5rem',
                }}>
                <Typography variant="body1"
                  sx={{ paddingX: '0.5rem' }}>
                  <b>Los sitios web seguros .pr.gov usan https://</b>
                  <br />
                  lo que significa que usted se conectó de forma segura a un sitio web .pr.gov.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Collapse>

        {/* Nav */}
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>

          {/* Primer Grid */}
          <Grid container alignItems="center" spacing={0.5} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Grid item xs={12} lg={5}>
              <Typography variant="h1" sx={{ textAlign: isMobile ? 'center' : 'start', paddingLeft: !isMobile ? '2rem !important' : '0' }}>
                PORTAL DE CERTIFICACIONES ACADÉMICAS
              </Typography>
            </Grid>

            <Grid item xs={12} lg={3} sx={{ textAlign: isMobile ? 'center' : 'start', paddingLeft: !isMobile ? '2rem !important' : '0' }}>
              <img src={logo} alt="Logo Departamento de Educación" style={{ height: 'auto', width: isMobile ? '50%' : '80%' }} />
            </Grid>

            <Grid item xs={12} lg={3}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'right',
                paddingRight: !isMobile ? '2rem !important' : '0',
                padding: '0.5rem'

              }}
            >
              <Stack
                spacing={{ xs: 1, sm: 1 }}
                direction="column"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                useFlexGap

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

        {/* <AccessibilityWidget /> */}
      </Box >
    </>

  );
};



export default UnautoziredLayout;
