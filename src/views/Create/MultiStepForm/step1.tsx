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
import Radio from '@mui/material/Radio';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
import CustomLabel from "@/components/CustomLabel";
import { useFormik } from "formik";
import { step1Validations } from './validations/step1Validations';
import { requestSchools, requestTowns } from '@/views/Create/functions';
import SocialSecurityInput from '@/components/SocialSecurityInput';


interface StepProps {
    isStepValid: boolean;
    setStepValid: (valid: boolean) => void;
    onStepCompleted: (data: any) => void;
    formData: any;
    updateFormData: (data: any, reset: boolean) => void;
}

interface ItemData {
    id: string;
    name: string;
}


const Step1 = ({ isStepValid, setStepValid, onStepCompleted, formData, updateFormData }: StepProps) => {


    const [townsData, setTownsData] = useState<ItemData[]>([{ id: '0', name: 'Seleccione un Pueblo' }]);
    const [schoolsData, setSchoolsData] = useState<ItemData[]>([{ id: '0', name: 'Seleccione Escuela' }]);
    const [selectedValue, setSelectedValue] = useState<string | null>('No');
    const [showSocialSecurity, setShowSocialSecurity] = useState(false);
    const [socialSecurityArray, setSocialSecurityArray] = useState(new Array(9).fill("") ?? null);

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
            value: '1',
            label: 'Certificado de Graduación',
        },
        {
            value: '2',
            label: 'Transcripción de Creditos',
        },
        {
            value: '3',
            label: 'Certificado Horas Taller',
        },

    ];

    const [validate, setValidate] = useState(false);

    const idList = [
        {
            value: '0',
            label: 'Licencia / Real ID',
        },
    ];

    const genderList = [
        {
            value: 'F',
            label: 'Femenino',
        },
        {
            value: 'M',
            label: 'Masculino',
        },
        {
            value: 'N',
            label: 'No Indica',
        },
    ];

    const formik = useFormik({
        validateOnMount: true,

        initialValues: {
            identification_type: formData.identification_type === "" ? idList[0].value : formData.identification_type,
            identification: formData.identification || '',
            first_name: formData.first_name || '',
            second_name: formData.second_name || '',
            last_name: formData.last_name || '',
            second_last_name: formData.second_last_name || '',
            depr_first_name: formData.depr_first_name || '',
            depr_second_name: formData.depr_second_name || '',
            depr_last_name: formData.depr_last_name || '',
            depr_second_last_name: formData.depr_second_last_name || '',
            birthdate: formData.birthdate,
            gender: formData.gender === "" ? genderList[0].value : formData.gender || '',
            phone: formData.phone || '',
            social_security: formData.social_security || '',
            email: formData.email || '',
            confirmEmail: formData.email || '',
            email1: formData.email1 || '',
            confirmEmail1: '',
            email2: formData.email2 || '',
            confirmEmail2: '',
            schoolTown: formData.schoolTown || '1',
            school_code: formData.school_code || schoolsData[0].id,
            grade: gradesList[0].value || '',
            grade_year: formData.grade_year || '',
            certification_type_id: formData.certification_type_id || certificatesList[1].value || '',

        },
        validationSchema: step1Validations,
        onSubmit: async () => {
            // await sendUserForRegister();
        },
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true
    });

    const navigate = useNavigate();


    const OnChangeSelectedValue = (value: string) => {
        setSelectedValue(value);

        formik.setFieldValue("depr_first_name", value === 'No' ? "" : formik.values.first_name);
        formik.setFieldValue("depr_second_name", value === 'No' ? "" : formik.values.second_name);
        formik.setFieldValue("depr_last_name", value === 'No' ? "" : formik.values.last_name);
        formik.setFieldValue("depr_second_last_name", value === 'No' ? "" : formik.values.second_last_name);
    };


    if (validate) {
        setValidate(false);
    }

    useEffect(() => {
        if (selectedValue === 'No') {
            formik.setFieldValue("depr_first_name", formik.values.first_name);
            formik.setFieldValue("depr_second_name", formik.values.second_name);
            formik.setFieldValue("depr_last_name", formik.values.last_name);
            formik.setFieldValue("depr_second_last_name", formik.values.second_last_name);
        }

        if (selectedValue === 'Si') {
            formik.setFieldValue("depr_first_name", "");
            formik.setFieldValue("depr_second_name", "");
            formik.setFieldValue("depr_last_name", "");
            formik.setFieldValue("depr_second_last_name", "");
        }
    }, [selectedValue, formik.values.first_name, formik.values.second_name, formik.values.last_name, formik.values.second_last_name]);



    useEffect(() => {
        if (!formik.isValid) {
            console.log(formik.errors);
            setStepValid(false)
        }
        if (formik.isValid) {
            setStepValid(true)
            updateFormData({
                identification_type: formik.values.identification_type,
                identification: formik.values.identification,
                first_name: formik.values.first_name,
                second_name: formik.values.second_name,
                last_name: formik.values.last_name,
                second_last_name: formik.values.second_last_name,

                gender: formik.values.gender,

                depr_first_name: formik.values.depr_first_name,
                depr_second_name: formik.values.depr_second_name,
                depr_last_name: formik.values.depr_last_name,
                depr_second_last_name: formik.values.depr_second_last_name,

                birthdate: formik.values.birthdate,
                phone: formik.values.phone,
                social_security: formik.values.social_security,

                email1: formik.values.email1,
                email2: formik.values.email2,

                schoolTown: formik.values.schoolTown,
                school_code: formik.values.school_code,
                grade: formik.values.grade,
                grade_year: formik.values.grade_year,

                certification_type_id: formik.values.certification_type_id,
            }, false);
        }

        console.log('isStepValid ' + isStepValid)
    }, [formik.values, formik.touched, formik.isValid]);




    //----------------------School Form Functions------------------------

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
                    formik.setFieldValue('school_code', responseSchools[0].id || '');
                }

            } catch (error) {
                console.error("Error fetching schools:", error);
            }
        };

        fetchTowns();
        // Llamamos a fetchSchools con el town id 1 al iniciar el componente.
        fetchSchools('1');
        formik.setFieldValue('certification_type_id', formData.certification_type_id);
        console.log('FORM DATA STEP1')
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

    //------------End school form functions------------------------------//

    return (
        <form style={{ width: '80%' }} onSubmit={formik.handleSubmit}>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5em !important', fontWeight: 'bolder', marginBottom: "0.5em !important" }}>
                            Datos Personales
                        </Typography>
                    </Grid>
                </Grid>
            </Box>


            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ marginBottom: '-1em !important' }}>
                        <CustomLabel name="Documento de Identidad" required={true} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1em !important" }}>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                variant="filled"
                                select
                                name="identification_type"
                                id="identification_type"
                                type="text"
                                value={formik.values.identification_type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.identification_type && Boolean(formik.errors.identification_type)}
                                helperText={formik.touched.identification_type && typeof formik.errors.identification_type === 'string' ? formik.errors.identification_type : undefined}

                            >
                                {idList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1em !important" }}>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                variant="filled"
                                placeholder="Número de documento"
                                name="identification"
                                id="identification"
                                type="text"
                                value={formik.values.identification}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.identification && Boolean(formik.errors.identification)}
                                helperText={formik.touched.identification && typeof formik.errors.identification === 'string' ? formik.errors.identification : undefined}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomLabel name="Primer Nombre" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                variant="filled"
                                placeholder='Primer Nombre DEPR'
                                name="depr_first_name"
                                id="depr_first_name"
                                type="text"
                                value={formik.values.depr_first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.depr_first_name && Boolean(formik.errors.depr_first_name)}
                                helperText={formik.touched.depr_first_name && typeof formik.errors.depr_first_name === 'string' ? formik.errors.depr_first_name : undefined}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomLabel name="Segundo Nombre" required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                variant="filled"
                                placeholder='Segundo Nombre DEPR'
                                name="depr_second_name"
                                id="depr_second_name"
                                type="text"
                                value={formik.values.depr_second_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.depr_second_name && Boolean(formik.errors.depr_second_name)}
                                helperText={formik.touched.depr_second_name && typeof formik.errors.depr_second_name === 'string' ? formik.errors.depr_second_name : undefined}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomLabel name="Primer Apellido" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                variant="filled"
                                placeholder='Primer Apellido DEPR'
                                name="depr_last_name"
                                id="depr_last_name"
                                type="text"
                                value={formik.values.depr_last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.depr_last_name && Boolean(formik.errors.depr_last_name)}
                                helperText={formik.touched.depr_last_name && typeof formik.errors.depr_last_name === 'string' ? formik.errors.depr_last_name : undefined}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomLabel name="Segundo Apellido" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                variant="filled"
                                placeholder='Segundo Apellido DEPR'
                                name="depr_second_last_name"
                                id="depr_second_last_name"
                                type="text"
                                value={formik.values.depr_second_last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.depr_second_last_name && Boolean(formik.errors.depr_second_last_name)}
                                helperText={formik.touched.depr_second_last_name && typeof formik.errors.depr_second_last_name === 'string' ? formik.errors.depr_second_last_name : undefined}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>

            <Box>
                <Grid container spacing={2} sx={{ marginBottom: '1.5em !important' }}>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomLabel name="Fecha de Nacimiento" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                variant="filled"
                                placeholder='Fecha de Nacimiento'
                                id="birthdate"
                                name="birthdate"
                                type="date"
                                value={formik.values.birthdate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                                helperText={formik.touched.birthdate && typeof formik.errors.birthdate === 'string' ? formik.errors.birthdate : undefined}
                                inputProps={{
                                    readOnly: true,
                                    max: new Date().toISOString().split("T")[0],  // Limita la fecha a hoy
                                }}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomLabel name="Género" required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                inputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                                select
                                name="gender"
                                id="gender"
                                type="text"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                helperText={formik.touched.gender && typeof formik.errors.gender === 'string' ? formik.errors.gender : undefined}

                            >
                                {genderList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomLabel name="Seguro Social" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <SocialSecurityInput
                                variant="outlined"
                                placeholder='N° Seguro Social'
                                name="social_security"
                                id="social_security"
                                type={'text'}
                                value={socialSecurityArray}
                                formik={formik}
                                setSocialSecurityArray={setSocialSecurityArray}
                                visibilityPassword={showSocialSecurity}
                                setVisibilityPassword={setShowSocialSecurity}
                                form_social_security={formData.social_security}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <CustomLabel name="Número de Teléfono" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Teléfono'
                                name="phone"
                                id="phone"
                                type="text"
                                variant="outlined"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && typeof formik.errors.phone === 'string' ? formik.errors.phone : undefined}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>

            {/*----------Datos de la escuela --------*/}
            <>

                <Box>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5em !important', fontWeight: 'bolder', marginBottom: "0.5em !important" }}>
                                Datos de la Escuela
                            </Typography>
                        </Grid>

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
                                    name=" certification_type_id"
                                    id=" certification_type_id"
                                    type="text"
                                    value={formik.values.certification_type_id}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.certification_type_id && Boolean(formik.errors.certification_type_id)}
                                    // helperText={formik.touched.certification_type_id && formik.errors.certification_type_id?.toString()}
                                    helperText={formik.touched.certification_type_id && typeof formik.errors.certification_type_id === 'string' ? formik.errors.certification_type_id : undefined}
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
            </>
            {/*----------FIN Datos de la escuela --------*/}

            {/*----------Enviar a:--------*/}
            <>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5em !important', fontWeight: 'bolder', marginBottom: "1em !important", marginTop: "2em !important" }}>
                                Enviar a:
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>


                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <CustomLabel name="Correo Eléctronico" required={true} />
                            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                <TextField
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                    variant="filled"
                                    name="emailToSend"
                                    id="emailToSend"
                                    type="text"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && typeof formik.errors.email === 'string' ? formik.errors.email : undefined}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <CustomLabel name="Confirme Correo Eléctronico" required={true} />
                            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                <TextField
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                    placeholder='Correo Eléctronico'
                                    name="emailConfirm"
                                    id="emailConfirm"
                                    type="text"
                                    variant="filled"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && typeof formik.errors.email === 'string' ? formik.errors.email : undefined}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <CustomLabel name="Correo Eléctronico " required={false} />
                            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                <TextField
                                    placeholder='Correo Eléctronico'
                                    name="email1"
                                    autoComplete="new-password-email"
                                    id="email1"
                                    type="text"
                                    variant="outlined"
                                    value={formik.values.email1}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email1 && Boolean(formik.errors.email1)}
                                    helperText={formik.touched.email1 && typeof formik.errors.email1 === 'string' ? formik.errors.email1 : undefined}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <CustomLabel name="Confirme Correo Eléctronico" required={false} />
                            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                <TextField
                                    placeholder='Correo Eléctronico'
                                    name="confirmEmail1"
                                    autoComplete="new-password"
                                    id="confirmEmail1"
                                    type="text"
                                    variant="outlined"
                                    value={formik.values.confirmEmail1}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmEmail1 && Boolean(formik.errors.confirmEmail1)}
                                    helperText={formik.touched.confirmEmail1 && typeof formik.errors.confirmEmail1 === 'string' ? formik.errors.confirmEmail1 : undefined}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <CustomLabel name="Correo Eléctronico " required={false} />
                            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                <TextField
                                    placeholder='Correo Eléctronico'
                                    name="email2"
                                    autoComplete="off"
                                    id="email2"
                                    type="text"
                                    variant="outlined"
                                    value={formik.values.email2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email2 && Boolean(formik.errors.email2)}
                                    helperText={formik.touched.email2 && typeof formik.errors.email2 === 'string' ? formik.errors.email2 : undefined}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <CustomLabel name="Confirme Correo Eléctronico" required={false} />
                            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                <TextField
                                    placeholder='Correo Eléctronico'
                                    name="confirmEmail2"
                                    autoComplete="new-password"
                                    id="confirmEmail2"
                                    type="text"
                                    variant="outlined"
                                    value={formik.values.confirmEmail2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmEmail2 && Boolean(formik.errors.confirmEmail2)}
                                    helperText={formik.touched.confirmEmail2 && typeof formik.errors.confirmEmail2 === 'string' ? formik.errors.confirmEmail2 : undefined}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

            </>
            {/*----------FIN Enviar a:--------*/}


        </form>
    );
};

export default Step1;
