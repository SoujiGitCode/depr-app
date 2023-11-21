import * as Yup from 'yup';

export const registerValidation = Yup.object().shape({
    docNumber: Yup.string()
        .required("Número de documento requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

    firstName: Yup.string()
        .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "El nombre solo debe contener letras y espacios simples entre palabras")
        .required("Primer Nombre requerido")
        .max(20, "máximo 20 caracteres"),

    middleName: Yup.string()
        .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "El SEgundo nombre solo debe contener letras y espacios simples entre palabras")
        .max(20, "máximo 20 caracteres"),

    lastName: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Apellido solo debe contener letras")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    secondLastName: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Segundo Apellido solo debe contener letras")
        .required("Segund Apellido requerido")
        .max(20, "máximo 20 caracteres"
        ),

    firstNameDepr: Yup.string()
        .matches(/^[A-Za-z]+$/, "El nombre solo debe contener letras")
        .required("Primer nombre requerido")
        .max(20, "máximo 20 caracteres"),

    middleNameDepr: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Segundo Nombre solo debe contener letras")
        .max(20, "máximo 20 caracteres"),

    lastNameDepr: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Apellido solo debe contener letras")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    secondLastNameDepr: Yup.string()
        .matches(/^[A-Za-z]+$/, "El Segundo Apellido solo debe contener letras")
        .required("Segund Apellido requerido")
        .max(20, "máximo 20 caracteres"
        ),

    email: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .required("Correo electronico es requerido")
        .max(100, "máximo 100 caracteres"),

    phoneNumber: Yup.string()
        .required("Teléfono requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

    social_security: Yup.string()
        .required("Seguro Social requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

    birthdate: Yup.string().required("Fecha de nacimiento requerida"),

    password: Yup.string()
        .required("Contraseña no puede estar vacío")
        .matches(
            /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\;])[a-zA-Z\d!@#$%^&*()\;]{8,}$/,
            "La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y un símbolo"
        )
        .max(20, "máximo 20 caracteres"),
    repeatPassword: Yup.string()
        .required("Confirmar Contraseña no puede estar vacío")
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .max(20, "máximo 20 caracteres"),
});
