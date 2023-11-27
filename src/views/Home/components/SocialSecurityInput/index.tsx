// SocialSecurityInput.js
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CSSProperties } from "react";

interface SocialSecurityInputProps {
  value: any;
  variant?: "outlined";
  name?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  sx?: CSSProperties;
  formik: any;
  setSocialSecurityArray: (value: any[]) => void;
  visibilityPassword: boolean;
  setVisibilityPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const SocialSecurityInput = ({
  value,
  variant,
  name,
  type,
  placeholder,
  id,
  sx,
  formik,
  setSocialSecurityArray,
  visibilityPassword,
  setVisibilityPassword,
}: SocialSecurityInputProps) => {
  const toggleSocialSecurityVisibility = () => {
    setVisibilityPassword(!visibilityPassword);
  };

  const maskSocialSecurity = (value: any) => {
    const visibleDigits = 4;
    const maskedLength = Math.max(value.length - visibleDigits, 0);
    const masked = value.slice(-visibleDigits);
    return "*".repeat(maskedLength) + masked;
  };

  const handleSocialSecurityChange = (e: any) => {
    const { value: input, selectionStart, selectionEnd } = e.target;

    // Crear una copia del array actual
    let updatedArray = [...value];

    // Calcular la diferencia de longitud entre el input y el array actual
    const diff = input.length - updatedArray.join("").length;

    // Manejar la adición o eliminación de caracteres
    if (diff > 0) {
      // Adición de caracteres
      const newChars = input.slice(selectionStart - diff, selectionStart);
      updatedArray.splice(selectionStart - diff, 0, ...newChars.split(""));
    } else if (diff < 0) {
      // Eliminación de caracteres
      updatedArray.splice(selectionStart, -diff);
    }

    // Asegurar que el array no exceda la longitud máxima y rellenar con espacios vacíos si es necesario
    updatedArray = updatedArray.slice(0, 9);
    while (updatedArray.length < 9) {
      updatedArray.push("");
    }

    // Actualizar el estado y el valor de Formik
    setSocialSecurityArray(updatedArray);
    formik.setFieldValue("social_security", updatedArray.join(""));
  };

  return (
    <TextField
      variant={variant}
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      value={
        visibilityPassword ? value.join("") : maskSocialSecurity(value.join(""))
      }
      onChange={handleSocialSecurityChange}
      onBlur={formik.handleBlur}
      error={
        formik.touched.social_security && Boolean(formik.errors.social_security)
      }
      helperText={
        formik.touched.social_security &&
        typeof formik.errors.social_security === "string"
          ? formik.errors.social_security
          : undefined
      }
      sx={sx}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={toggleSocialSecurityVisibility}>
              {visibilityPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SocialSecurityInput;
