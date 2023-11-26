// SocialSecurityInput.js
import { useState, ChangeEvent, FocusEvent } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CSSProperties } from "react";

interface SocialSecurityInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  readOnly?: boolean;
  variant?: "outlined";
  name?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  sx?: CSSProperties;
}

const SocialSecurityInput = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  readOnly = false,
  variant,
  name,
  type,
  placeholder,
  id,
  sx,
}: SocialSecurityInputProps) => {
  const [showSocialSecurity, setShowSocialSecurity] = useState(false);

  const toggleSocialSecurityVisibility = () => {
    setShowSocialSecurity(!showSocialSecurity);
  };

  const maskSocialSecurity = (value: any) => {
    const visibleDigits = 4;
    const maskedLength = Math.max(value.length - visibleDigits, 0);
    const masked = value.slice(-visibleDigits);
    return "*".repeat(maskedLength) + masked;
  };

  return (
    <TextField
      variant={variant}
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      value={showSocialSecurity ? value : maskSocialSecurity(value)}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      sx={sx}
      InputProps={{
        readOnly: readOnly,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={toggleSocialSecurityVisibility}
              disabled={readOnly}
            >
              {showSocialSecurity ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SocialSecurityInput;
