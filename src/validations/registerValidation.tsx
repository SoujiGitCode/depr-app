import * as Yup from 'yup';

export const registerValidation = Yup.object().shape({
    docNumber: Yup.string()
        .required("Número de identificación requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

    firstName: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Nombre invalido")
        .required("Primer Nombre requerido")
        .max(20, "máximo 20 caracteres"),

    middleName: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Nombre invalido")
        .max(20, "máximo 20 caracteres"),

    lastName: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Apellido invalido")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    secondLastName: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Apellido invalido")
        .max(20, "máximo 20 caracteres"
        ),

    firstNameDepr: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Nombre invalido")
        .required("Primer nombre requerido")
        .max(20, "máximo 20 caracteres"),

    middleNameDepr: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Nombre invalido")
        .max(20, "máximo 20 caracteres"),

    lastNameDepr: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Apellido invalido")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    secondLastNameDepr: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Apellido invalido")
        .max(20, "máximo 20 caracteres"
        ),

    email: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .required("Correo electrónico es requerido")
        .max(100, "máximo 100 caracteres"),

    gender: Yup.string()
        .notOneOf(['notAValidGender'], 'Debe seleccionar una opción valida')
        .required('Debe seleccionar una opción valida'),

    phone: Yup.string()
        .required("Teléfono requerido")
        .matches(/^[0-9*]+$/, "El formato del teléfono debe ser (XXX) XXX-XXXX")
        .test('len', 'Deben ser 10 caracteres', val => val.length === 10),

    social_security: Yup.string()
        .required("Seguro Social requerido")
        .matches(/^[0-9*]+$/, "Solo debe contener números")
        .test('len', 'Deben ser 9 caracteres', val => val.length === 9),


    birthdate: Yup
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
