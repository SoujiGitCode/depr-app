import { createTheme } from '@mui/material/styles';
import { orange, blue } from '@mui/material/colors';

const borderColor = "#658A86";
const placeholderColor = "rgba(51, 51, 51, 0.4)";
const filledInputBg = '#EAEAEA';

const disabledColorPrimary = "#44567980";

const HOVER_COLORS = {
  primary: '#2B394A',
  secondary: '#214F21',
  warning: '#654010'
};

const BASIC_COLORS = {
  primary: '#3F546E',
  secondary: '#295D27',
  warning: '#784C11'
}

const DISABLED_COLORS = {
  primary: '#CDD6E480',
  secondary: '#214F21',
  warning: '#654010'
}

const theme = createTheme({
  palette: {
    primary: {
      main: BASIC_COLORS.primary,
      contrastText: '#ffffff'
    },
    secondary: {
      main: BASIC_COLORS.secondary,
      contrastText: '#ffffff'
    },
    error: {
      main: '#D81919',
    },
    warning: {
      main: BASIC_COLORS.warning,
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
    ].join(','),
    // Definir variantes de Typography
    h1: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'bolder',
      fontSize: '1.6rem',
    },
    h2: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'bolder',
      fontSize: '1.4rem',
    },
    h3: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'bolder',
      fontSize: '1.3rem',
    },
    h4: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'bolder',
      fontSize: '1.2rem',
    },
    h5: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'bolder',
      fontSize: '1.1rem',
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
    body2: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'normal',
      fontSize: '0.8rem',
      color: '#000',
    },
    subtitle1: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'bolder',
      fontSize: '1.2rem',
    },
    subtitle2: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'normal',
      fontSize: '0.8rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          //font-weight para todos los botones a pedido de Pier
          fontFamily: 'Montserrat-Medium',
          fontWeight: 'bold'
        },
        containedPrimary: {
          '&:disabled': {
            backgroundColor: DISABLED_COLORS.primary,
            color: '#3D3D3D'
          },
          '&:hover': {
            backgroundColor: HOVER_COLORS.primary,
            color: '#ffffff'
          },
        },
        containedSecondary: {
          '&:disabled': {
            backgroundColor: DISABLED_COLORS.secondary,
            color: '#ffffff'
          },
          '&:hover': {
            backgroundColor: HOVER_COLORS.secondary,
            color: '#ffffff'
          },
        },
        containedWarning: {
          '&:disabled': {
            backgroundColor: DISABLED_COLORS.warning,
            color: '#ffffff'
          },
          '&:hover': {
            backgroundColor: HOVER_COLORS.warning,
            color: '#ffffff'
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: 'Montserrat-Medium',
          fontWeight: 'lighter',
          fontSize: '0.7rem',
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
            backgroundColor: filledInputBg,
            borderRadius: '4px 4px 0px 0px',
            border: `2px solid ${borderColor}`,
            '&:before': {
              borderBottomColor: borderColor,
            },
            '&:hover:before': {
              borderBottomColor: borderColor,
            },
            '&.Mui-focused': {
              backgroundColor: filledInputBg,
              '&:after': {
                borderBottomColor: borderColor,
              },
            },
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