import { useEffect, useState } from "react";
import { Grid, Typography, Box, Button, CardContent, Card, TextField } from "@mui/material";
import styles from "./styles.module.scss";

import useAlert from "@/hooks/useAlert";
import RequiredDocuments from "./components/RequiredDocuments";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import useAuthStore from "@/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { logOut, userDocuments } from "@/utils/";

import paper from "../../assets/images/icon-paper.png";
import student from "../../assets/images/icon-student.png";
import SearchIcon from '@mui/icons-material/Search';
import { WidthNormal } from "@mui/icons-material";
import { getUserDocuments } from "./functions";
import { IGetUsersDocumentsData } from "./types";
import CustomTable from "./components/customTable";
import { table } from "console";


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
      buttonType: 'warning'
    },
    {
      icon: paper,
      goldenText: '',
      secondaryText: '',
      title: 'Transcripción de Créditos',
      description: 'Transcripción de Créditos refleja el historial académico de un estudiante dentro del Sistema Escolar del Departamento de Educación de Puerto Rico. Este es un informe oficial que detalla las calificaciones obtenidas en cada uno de los cursos y créditos acumulados por el estudiante durante sus años de estudios. Incluye, si está disponible, la determinación del promedio general Grade Point Average (GPA). Contiene, además, el registro de las horas comunitarias y de exploración ocupacional realizadas por el estudiante.',
      button: 'Crear Solicitud',
      buttonType: 'primary',
      navigate: '/create/2'
    },
    {
      icon: paper,
      goldenText: '',
      secondaryText: '',
      title: 'Certificado de Horas Taller',
      description: 'La Certificación de Horas Taller valida que el estudiante solicitante ha completado los requisitos de un programa de formación ocupacional, vocacional o técnica. Esta certificación identifica la especialidad del taller, temas cubiertos durante el taller, fechas y horas acumuladas en las que el estudiante realizó su capacitación. (Los estudiantes de Educación Especial, Salón a Tiempo Completo, se rigen bajo otras especificaciones).',
      button: 'Crear Solicitud',
      buttonType: 'primary',
      navigate: '/create/3'
    },
  ];


  const CustomTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      width: '194px',
      height: '41px',
      padding: '8px 16px', // MUI utiliza un solo valor para el eje X y otro para el eje Y
      borderRadius: '50px',
      border: '2px solid #CACACA', // Necesitas especificar un color o utilizar el color por defecto
      // Si necesitas un color específico, por ejemplo gris, usarías '2px solid #gray'
    },
    // Si necesitas un gap entre el ícono y el texto, esto va dentro del input
    '& .MuiInput-underline:before': {
      borderBottom: 'none', // Elimina la línea de borde inferior en el estado normal
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none', // Elimina la línea de borde inferior en el estado activo (cuando el input está enfocado)
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none', // Elimina la línea de borde inferior en el estado hover
    },
  });

  function SearchInput() {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CustomTextField
          variant="standard" // Utiliza la variante "standard" para poder quitar la línea inferior
          placeholder="Buscar certificado"
          sx={{ marginRight: "1em !important" }}
        />
        <SearchIcon color="primary" />
      </ Box >

    );
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocuments = await getUserDocuments(token);
        if (Array.isArray(userDocuments)) setTableData(userDocuments);

        console.log(tableData);
      } catch (error) {
        console.error("Error fetching user documents:", error);
      }
    }
    fetchUserData();
  }, []);


  return (

    <Box
      sx={{
        width: '100%',
        height: '100%',
        alignItems: "start",
        justifyContent: "center"
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
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
                height="100%"
                padding={5}
                border={1}
                gap={4}
                borderRadius={2}
                borderColor="divider"
              >
                <Typography variant="h1" gutterBottom sx={{ color: '#FFFFFF', fontSize: '2.2em !important' }}>
                  Bienvenido
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
            <Grid item xs={8} sx={{ marginBottom: "4em !important", marginTop: "2em !important" }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#697FAA', fontSize: '2em !important' }}>
                Conoce los Tipos de Certificaciones Académicas
              </Typography>
            </Grid>

            <Grid item xs={2} sx={{ marginBottom: "4em !important", marginTop: "2em !important", display: "flex", alignItems: "center" }}>
              {/* <SearchInput /> */}
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
                        <img src={card.icon} alt="Icono" style={{ maxWidth: '100%' }} />
                        <Typography variant="subtitle1" sx={{ color: '#E99122', mt: 1 }}>
                          {card.goldenText}
                        </Typography>
                        {/* Posicionamos absolutamente el caption */}
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
                        <Typography variant="h5" sx={{ color: '#333333' }} >{card.title}</Typography>
                        <Typography variant="body1" sx={{ marginTop: '1.5em !important', marginBottom: '1.5em !important', textAlign: 'justify', color: '#333333' }}>
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

            <Grid item xs={8} sx={{ marginBottom: "4em !important", marginTop: "4em !important" }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#697FAA', fontSize: '2em !important' }}>
                Consulta de solicitudes
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ marginBottom: "4em !important", marginTop: "2em !important", display: "flex", alignItems: "center" }}>
              {/* <SearchInput /> */}
            </Grid>

            <Grid item xs={10} sx={{ marginBottom: "4em !important", marginTop: "2em !important" }}>
              <CustomTable tableData={tableData} />
            </Grid>

          </Grid>

        </Grid>



      </Grid >


    </Box >

  );
};

export default Home;
