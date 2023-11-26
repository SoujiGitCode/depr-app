import { createTheme } from '@mui/material/styles';
import { orange, blue } from '@mui/material/colors';

const borderColor = "#658A86";
const placeholderColor = "rgba(51, 51, 51, 0.4)";
const filledInputBg = '#EAEAEA';

const disabledColorPrimary = "#697FAA80";

const theme = createTheme({
  palette: {
    primary: {
      main: '#697FAA',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#6ABB5E',
      contrastText: '#ffffff'
    },
    error: {
      main: '#D81919',
    },
    warning: {
      main: '#F6990D',
      contrastText: '#ffffff'
    },
    success: {
      main: '#6ABB5E',
    },
    text: {
      primary: '#333333',
    },
    background: {
      // default: '#f2f2f2',
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat-Medium',
      'Montserrat-Black',
      // Si Montserrat-Medium y Montserrat-Black no están disponibles,
      // el navegador usará la siguiente fuente disponible en la lista.
    ].join(','),
    // Definir variantes de Typography
    h1: {
      fontFamily: 'Montserrat-Black',
      fontWeight: 'normal',
      fontSize: '2rem',
    },
    h2: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'bold',
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'bolder',
      fontSize: '1.5rem',
    },
    h6: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'bolder',
      fontSize: '1rem',
    },
    body1: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'normal',
      fontSize: '1rem',
    },
    subtitle1: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'bolder',
      fontSize: '1.2rem',
    },
    // ... (puedes añadir más variantes según tus necesidades)
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          '&:disabled': {
            backgroundColor: disabledColorPrimary, // Background Color when disabled for contained buttons
            color: '#ffffff'
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: 'Montserrat-Medium',
          fontWeight: 'normal',
          fontSize: '0.8rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              height: '56px',
              borderColor: borderColor,
              borderRadius: '4px 4px 0px 0px',
              border: `2px solid ${borderColor}`,
              padding: '8px 16px', // Padding personalizado
            },
            '&:hover fieldset': {
              borderColor: borderColor,
            },
            '&.Mui-focused fieldset': {
              borderColor: borderColor,
            },
          },
          '& .MuiInputLabel-outlined': {
            fontSize: "1rem",
            color: placeholderColor,
          },
          '& .MuiInputLabel-outlined.Mui-focused': {
            color: borderColor,
          },
          '& .MuiOutlinedInput-input': {
            padding: "0.7rem",
          },

          // Estilos para variant="filled"
          '& .MuiFilledInput-root': {
            backgroundColor: filledInputBg, // Fondo gris para el input 'filled'
            borderRadius: '4px 4px 0px 0px',
            border: `2px solid ${borderColor}`,
            '&:before': {
              borderBottomColor: borderColor, // Línea inferior cuando no está enfocado
            },
            '&:hover:before': {
              borderBottomColor: borderColor, // Línea inferior al pasar el ratón por encima
            },
            '&.Mui-focused': {
              backgroundColor: filledInputBg, // Fondo gris cuando está enfocado
              '&:after': {
                borderBottomColor: borderColor, // Línea inferior cuando está enfocado
              },
            },
            // Ajuste del padding si es necesario
            '& .MuiInputBase-input': {
              padding: "0.7rem",
            },
          },

          // Estilos para la etiqueta (label) de variant="filled"
          '& .MuiInputLabel-filled': {
            color: placeholderColor,
            '&.Mui-focused': {
              color: borderColor,
            },
          },
        },
      },
    },
  },
});

export default theme;