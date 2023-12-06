import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CSSProperties, useEffect, useState } from "react";

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
  const [realValue, setRealValue] = useState(""); // Estado para el valor numérico real
  const [displayValue, setDisplayValue] = useState(""); // Estado para el valor que se muestra
  // Function to toggle the visibility of the social security number
  const toggleSocialSecurityVisibility = () => {
    setVisibilityPassword(!visibilityPassword);
    formik.setFieldTouched('social_security', true, true);
  };

  // Function to mask the social security number
  const handleSocialSecurityChange = (e) => {
    const input = e.target.value;
    let numericInput = input.replace(/\D/g, ''); // Solo números
    numericInput = numericInput.slice(0, 9); // Limitar a 9 caracteres

    setRealValue(numericInput); // Actualiza el valor real
    setDisplayValue(visibilityPassword ? numericInput : maskSocialSecurity(numericInput)); // Actualiza el valor mostrado
  };

  const maskSocialSecurity = (value) => {
    if (value.length <= 4) {
      return value; // Si el valor es menor o igual a 4, no necesita máscara
    }

    const maskedSection = "*".repeat(value.length - 4);
    const visibleSection = value.slice(-4);
    return maskedSection + visibleSection;
  };

  useEffect(() => {
    setDisplayValue(visibilityPassword ? realValue : maskSocialSecurity(realValue));
  }, [realValue, visibilityPassword]);

  useEffect(() => {
    // Este useEffect sincroniza el valor de Formik con el valor real actual
    formik.setFieldValue(id, realValue);
  }, [realValue]);
  return (
    <TextField
      variant={variant}
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      value={displayValue}
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
