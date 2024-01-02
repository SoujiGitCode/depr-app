import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  CardContent,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MyCarousel from '../../components/Carousel';
import { styled } from '@mui/system';


import paper from "../../assets/images/icon-paper.png";
import student from "../../assets/images/icon-student.png";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    icon: student,
    goldenText: 'Fast',
    secondaryText: '  ',
    title: 'Certificado de Graduación',
    description: 'Documento oficial expedido por el Departamento de Educación de Puerto Rico que certifica la fecha de graduación e identifica la escuela pública en la cual el estudiante completó los requisitos de graduación de un nivel académico y logró obtener una promoción de grado. Puede solicitar una Certificación de Graduación en caso de pérdida de su diploma, para solicitudes de empleo, apoyar tus conocimientos académicos o logros educativos, con fines de migración, admisión a un programa de educación superior e ingreso a una entidad universitaria.',
    button: 'Crear Solicitud',
    buttonType: 'warning'
  },
  {
    icon: paper,
    goldenText: '',
    secondaryText: '  ',
    title: 'Transcripción de Créditos',
    description: 'Transcripción de Créditos refleja el historial académico de un estudiante dentro del Sistema Escolar del Departamento de Educación de Puerto Rico. Este es un informe oficial que detalla las calificaciones obtenidas en cada uno de los cursos y créditos acumulados por el estudiante durante sus años de estudios. Incluye, si está disponible, la determinación del promedio general Grade Point Average (GPA). Contiene, además, el registro de las horas comunitarias y de exploración ocupacional realizadas por el estudiante.',
    button: 'Crear Solicitud',
    buttonType: 'primary'
  },
  {
    icon: paper,
    goldenText: '',
    secondaryText: '  ',
    title: 'Certificado de Horas Taller',
    description: 'La Certificación de Horas Taller valida que el estudiante solicitante ha completado los requisitos de un programa de formación ocupacional, vocacional o técnica. Esta certificación identifica la especialidad del taller, temas cubiertos durante el taller, fechas y horas acumuladas en las que el estudiante realizó su capacitación. (Los estudiantes de Educación Especial, Salón a Tiempo Completo, se rigen bajo otras especificaciones).',
    button: 'Crear Solicitud',
    buttonType: 'primary'
  },
];

const BoldText = styled('span')({
  fontWeight: 'bolder',
  fontFamily: 'Montserrat-Medium',
});


const Landing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const navigate = useNavigate();
  const background = "linear-gradient(to top, #8580b0, #7a75ad, #6f6aaa, #6460a7, #5855a4)";

  return (
    <>
      {/* Carousel */}
      <Box sx={{ backgroundImage: background, p: 0 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{ p: 0.5 }}>
            <MyCarousel isMobile={isMobile} />
          </Grid>
        </Grid>
      </Box>

      {/* Certificaciones */}
      <Box sx={{ bgcolor: 'white', p: 0.5, margin: 0 }}>
        <Grid container justifyContent="center" alignItems="center" spacing={0} >
          <Grid item xs={10} lg={8} sx={{ position: 'relative', marginBottom: '3em !important', marginTop: '3em !important' }}>
            <Typography variant="h5" sx={{ marginBottom: '2em !important', fontSize: '1.5em !important', textAlign: isMobile ? 'center' : 'left' }}>
              ¡Bienvenidos al Portal de Certificaciones Académicas del Departamento de Educación!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify', marginBottom: '2em !important', fontSize: '1em !important', lineHeight: '25px !important' }}>
              El <BoldText>Portal de Certificaciones Académicas </BoldText>es un sistema que se encuentra disponible para estudiantes activos y egresados del Sistema Educativo del Departamento de Educación de Puerto Rico. Este portal permitirá solicitar en línea, obtener y validar de manera digital las <BoldText>Certificaciones Académicas</BoldText>.

              Entre las <BoldText>Certificaciones Académicas</BoldText> que pueden solicitar los estudiantes a través de este portal son:
              <BoldText> La Certificación de Graduación, la Transcripción de Créditos y la Certificación de Horas Taller</BoldText> relacionada a horas contacto de cursos especializados en Educación Vocacional Ocupacional y Técnica.
            </Typography>

            <Typography variant="h5" sx={{ marginTop: '2em !important', marginBottom: '2em !important', fontSize: '1.5em !important', textAlign: isMobile ? 'center' : 'left' }}>
              Conoce los Tipos de Certificaciones AcadémicasBoldText
            </Typography>

          </Grid>

          {/* Contenido de Certificaciones */}
          {cardData.map((card) => (
            <Grid item xs={12} lg={8} key={card.title} >
              <Card
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  paddingTop: '1em !important',
                  paddingBottom: '0.5em !important',
                  boxShadow: '0px 4px 19px 0px #00000017',
                  borderRadius: '8px'
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
                          onClick={() => navigate("/login")}
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
        </Grid>
      </Box>
    </>
  );
};

export default Landing;
