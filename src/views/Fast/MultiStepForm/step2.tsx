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
import { step2Validations } from './validations/step2Validations';
import { requestSchools, requestTowns } from '../functions';
import { convertLength } from '@mui/material/styles/cssUtils';

interface ItemData {
    id: string;
    name: string;
}

interface StepProps {
    isStepValid: boolean;
    setStepValid: (valid: boolean) => void;
    onStepCompleted: (data: any) => void;
    formData: any;
    updateFormData: (data: any, reset: boolean) => void;
}

const Step2 = ({ isStepValid, setStepValid, onStepCompleted, formData, updateFormData }: StepProps) => {
    const [townsData, setTownsData] = useState<ItemData[]>([{ id: '0', name: 'Seleccione un Pueblo' }]);
    const [schoolsData, setSchoolsData] = useState<ItemData[]>([{ id: '0', name: 'Seleccione Escuela' }]);

    const gradesList = [
        {
            value: 'none',
            label: 'No Recuerdo',
        },
        {
            value: 'pri',
            label: 'Primaria',
        },
        {
            value: 'sec',
            label: 'Secundaria',
        },
        {
            value: 'sup',
            label: 'Superior',
        },
    ];

    const certificatesList = [
        {
            value: 'Certificado de Graduación',
            label: 'Certificado de Graduación',
        },

    ];

    const formik = useFormik({
        validateOnMount: true,

        initialValues: {
            schoolTown: formData.schoolTown || '1',
            school_code: formData.school_code || schoolsData[0].id,
            grade: gradesList[0].value,
            grade_year: formData.grade_year || '',
            certificateToRequest: certificatesList[0].value,
        },
        validationSchema: step2Validations,
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
            setStepValid(true)
            console.log(formik.values.school_code)
            updateFormData({
                schoolTown: formik.values.schoolTown,
                school_code: formik.values.school_code,
                grade: formik.values.grade,
                grade_year: formik.values.grade_year,
            }, false);
        }


        console.log('isStepValid ' + isStepValid)
    }, [formik.values, formik.touched, formik.isValid]);



    useEffect(() => {
        // Función que trae la data de las ciudades.
        const fetchTowns = async () => {
            try {
                const responseTowns = await requestTowns();
                setTownsData(responseTowns);
            } catch (error) {
                console.error("Error fetching towns:", error);
            }
        };

        // Función que trae la data de las escuelas basada en el townId.
        const fetchSchools = async (townId: '1') => {
            console.log('school code antes de fetch schools: ', formData.school_code)
            try {
                const responseSchools = await requestSchools(townId);
                setSchoolsData(responseSchools);
                // Actualizamos el valor de school_code en el estado de Formik.

                if (formData.school_code === '0') {
                    console.log('true as fuck : ', responseSchools[0].id)
                    formik.setFieldValue('school_code', responseSchools[0].id || '');
                }

            } catch (error) {
                console.error("Error fetching schools:", error);
            }
        };

        fetchTowns();
        // Llamamos a fetchSchools con el town id 1 al iniciar el componente.
        fetchSchools('1');
    }, []);


    // Cada vez que cambia el valor de schoolTown en Formik, actualizamos las escuelas.
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const responseSchools = await requestSchools(formik.values.schoolTown);
                setSchoolsData(responseSchools);
                formik.setFieldValue('school_code', schoolsData[0]?.id || '');
            } catch (error) {
                console.error("Error fetching schools:", error);
            }
        };

        fetchSchools();
    }, [formik.values.schoolTown, formData.school_town]);


    useEffect(() => {
        // Asegurarse de que schoolsData esté actualizado antes de asignar el valor a school_code
        if (schoolsData.length > 0 && formData.school_code !== '0') {
            console.log('YEPPERS')
            formik.setFieldValue('school_code', formData.school_code);
        } else if (schoolsData.length > 0) {

            formik.setFieldValue('school_code', schoolsData[0].id);
        }
    }, [schoolsData]);

    return (
        <form style={{ width: '80%' }} onSubmit={formik.handleSubmit}>
            <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5em !important', fontWeight: 'bolder', marginBottom: "1em !important", marginTop: "2em !important" }}>
                Datos de la Escuela
            </Typography>

            <Box>
                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <CustomLabel name="Pueblo de la Escuela" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                select
                                name="schoolTown"
                                id="schoolTown"
                                type="text"
                                variant="outlined"
                                value={formik.values.schoolTown}
                                onChange={(e) => {
                                    formik.handleChange(e);  // handle formik's change
                                    // formik.setFieldValue('school_code', '');  // reset school value
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.schoolTown && Boolean(formik.errors.schoolTown)}
                                helperText={formik.touched.schoolTown && typeof formik.errors.schoolTown === 'string' ? formik.errors.schoolTown : undefined}


                            >
                                {townsData.map((option: ItemData) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomLabel name="Escuela" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            {
                                schoolsData.length > 0 && (
                                    <TextField
                                        select
                                        name="school_code"
                                        id="school_code"
                                        type="text"
                                        variant="outlined"
                                        value={formik.values.school_code}
                                        onChange={(e) => {
                                            formik.handleChange(e);  // handle formik's change
                                        }}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.school_code && Boolean(formik.errors.school_code)}
                                        helperText={formik.touched.school_code && typeof formik.errors.school_code === 'string' ? formik.errors.school_code : undefined}
                                    >
                                        {schoolsData.map((option: ItemData) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )
                            }

                        </FormControl>
                    </Grid>

                </Grid>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomLabel name="Nivel Acádemico" required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                select
                                name="grade"
                                id="grade"
                                type="text"
                                variant="outlined"
                                value={formik.values.grade}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.grade && Boolean(formik.errors.grade)}
                                helperText={formik.touched.grade && formik.errors.grade}

                            >
                                {gradesList.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomLabel name="Año de Graduación o Último Año Cursado" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='2000'
                                name="grade_year"
                                id="grade_year"
                                type="text"
                                variant="outlined"
                                value={formik.values.grade_year}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.grade_year && Boolean(formik.errors.grade_year)}
                                helperText={formik.touched.grade_year && typeof formik.errors.grade_year === 'string' ? formik.errors.grade_year : undefined}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>


            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomLabel name="Certificado a Solicitar" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                variant="filled"
                                select
                                name="certificateToRequest"
                                id="certificateToRequest"
                                type="text"
                                value={formik.values.certificateToRequest}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.certificateToRequest && Boolean(formik.errors.certificateToRequest)}
                                helperText={formik.touched.certificateToRequest && formik.errors.certificateToRequest}

                            >
                                {certificatesList.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>


        </form >


    );
};

export default Step2;
