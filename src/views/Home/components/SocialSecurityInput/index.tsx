// SocialSecurityInput.js
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CSSProperties } from "react";

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
  // Function to toggle the visibility of the social security number
  const toggleSocialSecurityVisibility = () => {
    setVisibilityPassword(!visibilityPassword);
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
    const { value: input, selectionStart, selectionEnd } = e.target;

    // Create a copy of the current array
    let updatedArray = [...value];

    // Calculate the length difference between the input and the current array
    const diff = input.length - updatedArray.join("").length;

    // Handle the addition or deletion of characters
    if (diff > 0) {
      // Addition of characters
      const newChars = input.slice(selectionStart - diff, selectionStart);
      updatedArray.splice(selectionStart - diff, 0, ...newChars.split(""));
    } else if (diff < 0) {
      // Deletion of characters
      updatedArray.splice(selectionStart, -diff);
    }

    // Ensure that the array does not exceed the maximum length and fill with empty spaces if necessary
    updatedArray = updatedArray.slice(0, 9);
    while (updatedArray.length < 9) {
      updatedArray.push("");
    }

    // Update the state and the value of Formik
    setSocialSecurityArray(updatedArray);
    formik.setFieldValue(id, updatedArray.join(""));
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
