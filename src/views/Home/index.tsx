import { useEffect, useState } from "react";
import { Grid, Typography, Box, Button, CardContent, Card, TextField } from "@mui/material";
import styles from "./styles.module.scss";

import useAlert from "@/hooks/useAlert";
import RequiredDocuments from "./components/RequiredDocuments";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import useAuthStore from "@/hooks/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";
import { logOut, userDocuments } from "@/utils/";

import paper from "../../assets/images/icon-paper.png";
import student from "../../assets/images/icon-student.png";
import SearchIcon from '@mui/icons-material/Search';
import { WidthNormal } from "@mui/icons-material";
import { getUserDocuments } from "./functions";
import { IGetUsersDocumentsData } from "./types";
import CustomTable from "./components/customTable";
import { table } from "console";
import Paper from "@mui/material/Paper";

const Home = () => {
  const { setAlert } = useAlert();
  const logout = useAuthStore((state: any) => state.setLogout);
  const token = useAuthStore((state: any) => state.token);
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<IGetUsersDocumentsData[]>([]);

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

  const cardData = [
    {
      icon: student,
      goldenText: 'Fast',
      secondaryText: '',
      title: 'Certificado de Graduación',
      description: 'Documento oficial expedido por el Departamento de Educación de Puerto Rico que certifica la fecha de graduación e identifica la escuela pública en la cual el estudiante completó los requisitos de graduación de un nivel académico y logró obtener una promoción de grado. Puede solicitar una Certificación de Graduación en caso de pérdida de su diploma, para solicitudes de empleo, apoyar tus conocimientos académicos o logros educativos, con fines de migración, admisión a un programa de educación superior e ingreso a una entidad universitaria.',
      button: 'Crear Solicitud',
      buttonType: 'warning',
      label: "Figura de Estudiante con Birrete"
    },
    {
      icon: paper,
      goldenText: '',
      secondaryText: '',
      title: 'Transcripción de Créditos',
      description: 'Transcripción de Créditos refleja el historial académico de un estudiante dentro del Sistema Escolar del Departamento de Educación de Puerto Rico. Este es un informe oficial que detalla las calificaciones obtenidas en cada uno de los cursos y créditos acumulados por el estudiante durante sus años de estudios. Incluye, si está disponible, la determinación del promedio general Grade Point Average (GPA). Contiene además, el registro de las horas comunitarias y de exploración ocupacional realizadas por el estudiante.',
      button: 'Crear Solicitud',
      buttonType: 'primary',
      navigate: '/create/2',
      label: "Figura de Documento Certificado color azul oscuro"
    },
    {
      icon: paper,
      goldenText: '',
      secondaryText: '',
      title: 'Certificado de Horas Taller',
      description: 'La Certificación de Horas Taller valida que el estudiante solicitante ha completado los requisitos de un programa de formación ocupacional, vocacional o técnica. Esta certificación identifica la especialidad del taller, temas cubiertos durante el taller, fechas y horas acumuladas en las que el estudiante realizó su capacitación. (Los estudiantes de Educación Especial y Salón a Tiempo Completo, se rigen bajo otras especificaciones).',
      button: 'Crear Solicitud',
      buttonType: 'primary',
      navigate: '/create/3',
      label: "Figura de Documento Certificado color azul oscuro"
    },
  ];

  const CustomTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      width: '194px',
      height: '41px',
      padding: '8px 16px',
      borderRadius: '50px',
      border: '2px solid #CACACA',

    },

    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocuments = await getUserDocuments(token);
        if (Array.isArray(userDocuments)) setTableData(userDocuments);
        console.log('tableData');
        console.log(tableData);
      } catch (error) {
        console.error("Error fetching user documents:", error);
      }
    }
    fetchUserData();
  }, []);

  const location = useLocation(); // Obtener el objeto de ubicación

  useEffect(() => {
    // Verificar si el estado 'fromRequests' fue pasado y es verdadero
    if (location.state?.fromRequests) {
      const section = document.getElementById('solicitudes');
      if (section) {
        // Hacer scroll suave hasta el elemento
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]); // Incluir location en las dependencias del useEffect

  return (

    <>
      <Grid container>
        <Grid
          item
          xs={12}
          className={styles["image-banner"]}
          sx={{
            display: "flex",
            alignItems: "center !important",
            minHeight: '380px'
          }}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign={'center'}
                height="100%"
                padding={5}
                gap={4}
              >
                <Typography variant="h1" gutterBottom sx={{ color: '#FFFFFF', fontSize: '2.5em !important' }} className="Montserrat-Black">
                  ¡Bienvenido!
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ color: '#FFFFFF', fontSize: '1.2em !important' }}>
                  Al Portal de Certificaciones Académicas
                </Typography>
                {/* <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    minWidth: '500px',
                    height: 48,
                    padding: '8px 40px',
                    borderRadius: '4 px',
                    gap: 2,
                    fontSize: '1em !important'
                  }}
                >
                  Crear Solicitud
                </Button> */}
              </Box>
            </Grid>

          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
          }}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={10} sx={{ marginBottom: "4em !important", marginTop: "2em !important" }}>
              <Typography variant="h2" gutterBottom sx={{ color: '#445679', fontSize: '2em !important' }} className="Montserrat-Black">
                Conoce los tipos de Certificaciones Académicas
              </Typography>
            </Grid>

            {/* Contenido de Certificaciones */}
            {cardData.map((card) => (
              <Grid item xs={10} key={card.title}>
                <Card
                  sx={{
                    width: '100%',
                    paddingTop: '1em !important',
                    paddingBottom: '0.5em !important',
                    boxShadow: '0px 4px 19px 0px #00000017',
                    borderRadius: '8px',
                    marginBottom: "1.5em !important"
                  }}
                >
                  <Grid container>
                    <Grid item xs={2} container direction="column" justifyContent="center" alignItems="center" sx={{ position: 'relative' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <img src={card.icon} alt={card.label} style={{ maxWidth: '100%' }} />
                        <Typography variant="h3" sx={{ color: '#7D4A0C', mt: 1, fontFamily: 'Montserrat-Black !important', fontSize: '1.2rem' }}>
                          {card.goldenText}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#33333375',
                            position: 'absolute',
                            bottom: '0.8em',
                            left: 0,
                            textAlign: 'left',
                            paddingLeft: '3em'
                          }}
                        >
                          {card.secondaryText}
                        </Typography>

                      </Box>
                    </Grid>

                    <Grid item xs={10} container alignItems="center" justifyContent="center">
                      <CardContent sx={{ paddingRight: '2.5em !important' }}>
                        <Typography variant="h3" sx={{ color: '#333333' }} >{card.title}</Typography>
                        <Typography variant="body1" sx={{ marginTop: '1.5em !important', marginBottom: '1.5em !important', textAlign: 'start', color: '#333333' }}>
                          {card.description}
                        </Typography>

                        {card.buttonType === 'warning' &&
                          <Button variant="contained" color='warning'
                            sx={{
                              width: '250px',
                              height: '41px',
                              padding: '8px 24px',
                              borderRadius: '50px',
                              gap: '10px',
                            }}
                            onClick={() => navigate("/fast")}
                          >
                            {card.button}
                          </Button>
                        }

                        {card.buttonType === 'primary' &&
                          <Button variant="contained" color='primary'
                            sx={{
                              width: '250px',
                              height: '41px',
                              padding: '8px 24px',
                              borderRadius: '50px',
                              gap: '10px',
                            }}
                            onClick={() => navigate(`${card.navigate}`)}
                          >
                            {card.button}
                          </Button>
                        }
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}

            <Grid item xs={12} lg={10} sx={{ marginBottom: "4em !important", marginTop: "4em !important" }} id="solicitudes">
              <Typography variant="h2" gutterBottom sx={{ color: '#445679', fontSize: '2em !important', textAlign: isMobile ? 'center' : 'left' }}
                className="Montserrat-Black">
                Consulta de Solicitudes
              </Typography>
            </Grid>

            <Grid item xs={10} sx={{ marginBottom: "4em !important", marginTop: "2em !important" }}>
              {tableData.length !== 0 ?
                <CustomTable tableData={tableData} isMobile={isMobile} />
                :
                <Box
                  component={Paper}
                  sx={{
                    padding: "1rem",
                    boxShadow: '0px 4px 13.5px 0px rgba(0, 0, 0, 0.1)',
                    justifyContent: 'center',
                    textAling: 'center',
                    display: 'flex'
                  }}>
                  <Typography variant="body1" gutterBottom sx={{ textAling: 'center' }}>
                    No ha realizado ninguna solicitud.
                  </Typography>
                </Box>
              }

            </Grid>

          </Grid>

        </Grid>

      </Grid >

    </>

  );
};

export default Home;
