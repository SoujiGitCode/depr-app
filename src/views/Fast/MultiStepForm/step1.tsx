import { useState, useEffect } from 'react';

import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    FormHelperText,
    FormControl,
    InputLabel,
    MenuItem,
    IconButton,
    InputAdornment,
} from '@mui/material';
import CustomLabel from "@/components/CustomLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { step1Validations } from './validations/step1Validations';
import { requestSchools, requestTowns } from '../functions';
import { convertLength } from '@mui/material/styles/cssUtils';

import WarningIcon from "@mui/icons-material/Warning";

interface StepProps {
    isStepValid: boolean;
    setStepValid: (valid: boolean) => void;
    onStepCompleted: (data: any) => void;
    formData: any;
    updateFormData: (data: any, reset: boolean) => void;
}


const Step1 = ({ isStepValid, setStepValid, onStepCompleted, formData, updateFormData }: StepProps) => {
    const [validate, setValidate] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const formik = useFormik({
        validateOnMount: true,

        initialValues: {
            email: formData.email || '',
            confirmEmail: ''
        },
        validationSchema: step1Validations,
        onSubmit: async () => {
            // await sendUserForRegister();
        },
        validateOnChange: true,
        validateOnBlur: true,
    });

    useEffect(() => {
        if (!formik.isValid) {
            console.log(formik.errors);
            setStepValid(false)
        }
        if (formik.isValid) {
            console.log(formik.isValid)
            setStepValid(true)
            updateFormData({
                email: formik.values.email,
            }, false);
        }

        console.log('isStepValid ' + isStepValid)
    }, [formik.values, formik.touched, formik.isValid]);

    useEffect(() => {
        // Actualiza los valores iniciales de Formik cuando formData cambie
        formik.setValues({
            email: formData.email || '',
            confirmEmail: formData.email || ''
        });
    }, [formData.email]);

    return (
        <form style={{ width: '80%' }} onSubmit={formik.handleSubmit}>
            <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5em !important', fontWeight: 'bolder', marginBottom: "1em !important", marginTop: "2em !important" }}>
                Datos de la Escuela
            </Typography>

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomLabel name="Correo Eléctronico" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Correo Eléctronico'
                                name="email"
                                id="email"
                                type="text"
                                variant="outlined"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && typeof formik.errors.email === 'string' ? formik.errors.email : undefined}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomLabel name="Confirme el Correo Electrónico" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Confirme el Correo Electrónico'
                                name="confirmEmail"
                                id="confirmEmail"
                                type="text"
                                variant="outlined"
                                value={formik.values.confirmEmail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)}
                                helperText={formik.touched.confirmEmail && formik.errors.confirmEmail}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: "2.5em !important", marginBottom: "2.5em !important" }}>

                        <Grid container alignItems="center" spacing={3}>
                            <Grid item xs={1}>
                                <IconButton color="warning">
                                    <WarningIcon fontSize="large" />
                                </IconButton>
                            </Grid>

                            <Grid item xs={10}>
                                <Typography variant="body1" color="textPrimary">
                                    Al presionar el botón de siguiente, confirma que ha leído las advertencias y acepta las
                                    <span style={{ color: '#1FAEEB', position: 'relative', bottom: '' }}> Condiciones de Uso</span>.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Box>


        </form>


    );
};

export default Step1;
