import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
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
    const [value, setValue] = useState("");
    // Inicializa el input con el formato deseado
    useEffect(() => {
        setValue(formik.values.phone || "(___) ___-____");
    }, [formik.values.phone]);

    // const handleChange = (event) => {
    //     console.log(event.target.value); // Ver el valor actual del input
    //     formik.setFieldValue(name, event.target.value);
    // };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = event.target.value; // Mantiene el formato (XXX) XXX-XXXX
        formik.setFieldValue(name, formattedValue);
    };



    return (
        <InputMask
            mask="(999) 999-9999"
            value={formik.values[name]}
            onChange={handleChange}
            onBlur={formik.onBlur} // Correcto manejo de onBlur
            maskChar="_"
        >
            {() => (
                <TextField
                    fullWidth
                    id={id || name}
                    name={name}
                    label={label || ''}
                    placeholder="(xxx) xxx-xxxx"
                    variant={variant}
                    // onChange={handleChange}
                    value={formik.values[name]}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        sx: { letterSpacing: '2px' },
                    }}
                />
            )}
        </InputMask>
    );
};

export default PhoneInput;
