import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Debe contener solo letras y espacios")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  social_security: yup.string().matches(/^[0-9-]+$/, "solo números y guiones"),
  birth_date: yup
    .date()
    .required("La fecha de nacimiento es obligatoria")
    .test(
      "age",
      "Debes ser mayor de 18 años y menor de 80 años",
      function (value) {
        if (value) {
          const birthDate = new Date(value);
          const currentDate = new Date();
          let age = currentDate.getFullYear() - birthDate.getFullYear();
          // Restar un año si el cumpleaños ya ocurrió este año
          if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
              currentDate.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age >= 18 && age < 80;
        }
        return true; // Permite un valor nulo o indefinido (puedes personalizar esto según tus necesidades)
      }
    ),

  phone_number: yup.string().matches(/^[0-9]+$/, "Debe contener solo números"),
  email: yup
    .string()
    .email("Debe ser una dirección de correo electrónico válida"),
  school: yup.string().max(100, "Máximo 100 caracteres"),
  docNumber: yup.string().matches(/^[0-9]+$/, "Debe contener solo números"),
});
