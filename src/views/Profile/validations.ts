import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  id: Yup.string(),
  email: Yup
    .string()
    .email("Debe ser una dirección de correo electrónico válida")
    .required("El correo es obligatorio")
  ,
  depr_first_name: Yup
    .string()
    .required("El nombre es obligatorio")
    .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Nombre invalido")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  depr_second_name: Yup
    .string()
    .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo nombre invalido")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  depr_last_name: Yup
    .string()
    .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Apellido invalido")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  depr_second_last_name: Yup
    .string()
    .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Apellido invalido")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  depr_birthdate: Yup
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
    )
    .required("Fecha de nacimiento requerida")
  ,
  depr_gender: Yup.string(),
  depr_phone: Yup.string().matches(/^[0-9]+$/, "Debe contener solo números"),
  social_security: Yup
    .string()
    .required("Seguro Social requerido")
    .matches(/^[0-9*]+$/, "Solo debe contener números")
    .test('len', 'Deben ser 9 caracteres', val => val.length === 9)
    .matches(/^[0-9]+$/, "Debe contener solo números"),
});
