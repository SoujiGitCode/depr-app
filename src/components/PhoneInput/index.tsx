import React, { useEffect } from 'react';
import { TextField } from '@mui/material';

// Definición de la prop interface para PhoneInput
interface PhoneInputProps {
    name: string;
    label?: string;
    id?: string;
    variant?: 'outlined' | 'standard' | 'filled';
    placeholder?: string;
    formik: any; // Asume que formik es pasado como prop para acceso directo
}

const PhoneInput = ({ name, label, id, variant = 'outlined', placeholder, formik }: PhoneInputProps) => {
    // Función para formatear el número de teléfono
    const formatPhoneNumber = (phoneNumber: string) => {
        const digits = phoneNumber.replace(/\D/g, '');
        const match = digits.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };

    // Manejador del cambio que formatea el número y actualiza Formik
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, ''); // Remueve todos los caracteres no numéricos
        if (input.length <= 10) { // Asegura que solo se consideren hasta 10 dígitos
            const formatted = formatPhoneNumber(e.target.value);
            formik.setFieldValue(name, formatted);
        }
    };

    useEffect(() => {
        // Esto formateará el valor inicial y lo establecerá en Formik al montar el componente
        const formattedInitialValue = formatPhoneNumber(formik.values[name]);
        formik.setFieldValue(name, formattedInitialValue);
    }, [formik.values[name]]); // Asegúrate de incluir dependencias adecuadas

    return (
        <TextField
            fullWidth
            name={name}
            label={label}
            placeholder={placeholder}
            value={formik.values[name]}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            variant="outlined"
        />
    );
};

export default PhoneInput;
