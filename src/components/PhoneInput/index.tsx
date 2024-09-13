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
    formik: any;
}

const PhoneInput = ({ name, label, id, variant = 'outlined', placeholder, formik }: PhoneInputProps) => {
    const [displayValue, setDisplayValue] = useState("");

    useEffect(() => {
        setDisplayValue(formik.values.phone || "(___) ___-____");
    }, [formik.values.phone]);






    function cleanPhoneNumber(phoneNumber) {

        const onlyNumbers = phoneNumber.replace(/\D/g, '');
        return onlyNumbers;
    }



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = event.target.value;
        setDisplayValue(formattedValue)
        formik.setFieldValue(name, cleanPhoneNumber(formattedValue));
    };



    return (
        <InputMask
            mask="(999) 999-9999"
            value={displayValue}
            onChange={handleChange}
            onBlur={formik.onBlur}
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
