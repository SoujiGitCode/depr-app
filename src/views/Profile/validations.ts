import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Debe contener solo letras")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  social_security: yup.string(),
  birth_date: yup.date(),
  phone_number: yup.string(),
  email: yup
    .string()
    .email("Debe ser una dirección de correo electrónico válida"),
  school: yup.string().max(100, "Máximo 100 caracteres"),
  title1: yup.string().max(100, "Máximo 100 caracteres"),
  title2: yup.string().max(100, "Máximo 100 caracteres"),
  title3: yup.string().max(100, "Máximo 100 caracteres"),
});
