import * as yup from "yup";

export const validationSchema = yup.object().shape({
  id: yup.string(),
  email: yup
    .string()
    .email("Debe ser una dirección de correo electrónico válida"),
  identification: yup.string(),
  first_name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Debe contener solo letras y espacios")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  second_name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Debe contener solo letras y espacios")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  last_name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Debe contener solo letras y espacios")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  second_last_name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Debe contener solo letras y espacios")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  birthdate: yup
    .date()
    .test(
      "age",
      "Debes ser mayor de 18 años y menor de 80 años",
      function (value) {
        if (value) {
          const birthDate = new Date(value);
          const currentDate = new Date();
          let age = currentDate.getFullYear() - birthDate.getFullYear();
          if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
              currentDate.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age >= 18 && age < 80;
        }
        return true;
      }
    ),
  gender: yup.string(),
  phone: yup.string().matches(/^[0-9]+$/, "Debe contener solo números"),
  social_security: yup
    .string()
    .matches(/^[0-9]+$/, "Debe contener solo números"),
  depr_social_security: yup
    .string()
    .matches(/^[0-9]+$/, "Debe contener solo números"),
  ip_origin: yup.string(),
  status: yup.string(),
  created: yup.string(),
  updated: yup.string(),
});
