import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CSSProperties, useEffect } from "react";

// Define the props for the SocialSecurityInput component
interface SocialSecurityInputProps {
  value: any;
  variant?: "outlined";
  name?: string;
  type?: string;
  placeholder?: string;
  id: string; // The id is required
  sx?: CSSProperties;
  formik: any; // The formik object is required
  setSocialSecurityArray: (value: any[]) => void; // The function to update the social security array is required
  visibilityPassword: boolean; // The visibility state of the password is required
  setVisibilityPassword: React.Dispatch<React.SetStateAction<boolean>>; // The function to update the visibility state of the password is required
  form_social_security: string;
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
  form_social_security
}: SocialSecurityInputProps) => {
  // Function to toggle the visibility of the social security number
  const toggleSocialSecurityVisibility = () => {
    setVisibilityPassword(!visibilityPassword);
    formik.setFieldTouched('social_security', true, true);
  };

  // Function to mask the social security number
  const maskSocialSecurity = (value: any) => {
    const visibleDigits = 4;
    const maskedLength = Math.max(value.length - visibleDigits, 0);
    const masked = value.slice(-visibleDigits);
    return "*".repeat(maskedLength) + masked;
  };

  // Function to handle changes to the social security number
  const handleSocialSecurityChange = (e: any) => {
    const input = e.target.value;

    // Crear un nuevo array basado en la entrada del usuario
    let updatedArray = input.split("");

    // Asegurarse de que el array no exceda la longitud máxima y llenar con espacios vacíos si es necesario
    while (updatedArray.length < 9) {
      updatedArray.push("");
    }

    // Actualizar solo los primeros 9 caracteres (la longitud máxima del SSN)
    updatedArray = updatedArray.slice(0, 9);

    // Actualizar el estado y el valor en Formik
    setSocialSecurityArray(updatedArray);
    formik.setFieldValue(id, updatedArray.join(""));
  };

  useEffect(() => {
    setSocialSecurityArray(form_social_security.length > 0 ? form_social_security.split('') : new Array(9).fill(""));
  }, [form_social_security, setSocialSecurityArray]);

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
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={
        formik.touched[id] && typeof formik.errors[id] === "string"
          ? formik.errors[id]
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
