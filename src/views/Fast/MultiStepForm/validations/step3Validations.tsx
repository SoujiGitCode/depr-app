import * as Yup from 'yup';

export const step3Validations = Yup.object().shape({

    identification: Yup.string()
        .required("Número de identificación requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

    first_name: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Nombre invalido")
        .required("Primer Nombre requerido")
        .max(20, "máximo 20 caracteres"),

    second_name: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Nombre invalido")
        .max(20, "máximo 20 caracteres"),

    last_name: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Apellido invalido")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    second_last_name: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Apellido invalido")
        .max(20, "máximo 20 caracteres"
        ),

    depr_first_name: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Nombre invalido")
        .required("Primer nombre requerido")
        .max(20, "máximo 20 caracteres"),

    depr_second_name: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Nombre invalido")
        .max(20, "máximo 20 caracteres"),

    depr_last_name: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Apellido invalido")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    depr_second_last_name: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Apellido invalido")
        .max(20, "máximo 20 caracteres"
        ),


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

    email: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .max(100, "máximo 100 caracteres"),

    email1: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .max(100, "máximo 100 caracteres")
        .test('email1-duplicate-check-email2', 'El correo electrónico no puede repetirse con email2', function (value) {
            const { email2 } = this.parent;
            if (value && value === email2) {
                return false;
            }
            return true;
        })
        .test('email1-duplicate-check-email', 'El correo electrónico no puede repetirse con email', function (value) {
            const { email } = this.parent;
            if (value && value === email) {
                return false;
            }
            return true;
        }),

    email2: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .max(100, "máximo 100 caracteres")
        .test('email2-duplicate-check-email1', 'El correo electrónico no puede repetirse con email1', function (value) {
            const { email1 } = this.parent;
            if (value && value === email1) {
                return false;
            }
            return true;
        })
        .test('email2-duplicate-check-email', 'El correo electrónico no puede repetirse con email', function (value) {
            const { email } = this.parent;
            if (value && value === email) {
                return false;
            }
            return true;
        }),

    confirmEmail1: Yup.string()
        .test('is-email1-confirm-required', 'Confirmar correo electrónico no puede estar vacío', function (value) {
            const { email1 } = this.parent;
            if (email1 && typeof email1 === 'string' && email1.trim().length > 0 && (!value || value.trim().length === 0)) {
                return false;
            }
            return true;
        })
        .oneOf([Yup.ref('email1')], 'Los correos electrónicos deben coincidir')
        .max(100, "Máximo 100 caracteres"),

    confirmEmail2: Yup.string()
        .test('is-email2-confirm-required', 'Confirmar correo electrónico no puede estar vacío', function (value) {
            const { email2 } = this.parent;
            if (email2 && typeof email2 === 'string' && email2.trim().length > 0 && (!value || value.trim().length === 0)) {
                return false;
            }
            return true;
        })
        .oneOf([Yup.ref('email2')], 'Los correos electrónicos deben coincidir')
        .max(100, "Máximo 100 caracteres"),



});
