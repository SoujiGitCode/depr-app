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
import WarningIcon from "@mui/icons-material/Warning";
import CustomLabel from "@/components/CustomLabel";
import { useFormik } from "formik";
import { step3Validations } from './validations/step3Validations';
import SocialSecurityInput from '@/components/SocialSecurityInput';


interface StepProps {
    isStepValid: boolean;
    setStepValid: (valid: boolean) => void;
    onStepCompleted: (data: any) => void;
    formData: any;
    updateFormData: (data: any, reset: boolean) => void;
}


const Step3 = ({ isStepValid, setStepValid, onStepCompleted, formData, updateFormData }: StepProps) => {

    const [validate, setValidate] = useState(false);

    const idList = [
        {
            value: '0',
            label: 'Licencia / Real ID',
        },
    ];

    const genderList = [
        { value: 'F', label: 'Femenino' },
        { value: 'M', label: 'Masculino' },
        { value: 'N', label: 'No Indica' }
    ];


    const [showSocialSecurity, setShowSocialSecurity] = useState(false);
    const [socialSecurityArray, setSocialSecurityArray] = useState(new Array(9).fill(""));
    const [selectedValue, setSelectedValue] = useState<string | null>('No');

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
            birthdate: formData.birthdate || '',
            gender: formData.gender === "" ? genderList[0].value : formData.gender,
            phone: formData.phone || '',
            social_security: formData.social_security || '',
            email: formData.email || '',
            email1: formData.email1 || '',
            confirmEmail1: '',
            email2: formData.email2 || '',
            confirmEmail2: '',
        },
        validationSchema: step3Validations, // Aquí asegúrate de pasar el objeto globalValidations
        onSubmit: async () => {
            // await sendUserForRegister();
        },
        validateOnChange: true,
        validateOnBlur: true,
    });


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
            }, false);
        }

        console.log('isStepValid ' + isStepValid)
    }, [formik.values, formik.touched, formik.isValid]);

    return (
        <form style={{ width: '80%' }} onSubmit={formik.handleSubmit}>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5em !important', fontWeight: 'bolder', marginBottom: "1em !important", marginTop: "2em !important" }}>
                            Datos de la Escuela
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
                                select
                                name="identification_type"
                                id="identification_type"
                                type="text"
                                variant="outlined"
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
                                placeholder="Número de documento"
                                name="identification"
                                id="identification"
                                type="text"
                                variant="outlined"
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
                                placeholder='Primer Nombre'
                                name="first_name"
                                id="first_name"
                                type="text"
                                variant="outlined"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                helperText={formik.touched.first_name && typeof formik.errors.first_name === 'string' ? formik.errors.first_name : undefined}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomLabel name="Segundo Nombre" required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Segundo Nombre'
                                name="second_name"
                                id="second_name"
                                type="text"
                                variant="outlined"
                                value={formik.values.second_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.second_name && Boolean(formik.errors.second_name)}
                                helperText={formik.touched.second_name && typeof formik.errors.second_name === 'string' ? formik.errors.second_name : undefined}
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
                                placeholder='Primer Apellido'
                                name="last_name"
                                id="last_name"
                                type="text"
                                variant="outlined"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.last_name && typeof formik.errors.last_name === 'string' ? formik.errors.last_name : undefined}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomLabel name="Segundo Apellido" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Segundo Apellido'
                                name="second_last_name"
                                id="second_last_name"
                                type="text"
                                variant="outlined"
                                value={formik.values.second_last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.second_last_name && Boolean(formik.errors.second_last_name)}
                                helperText={formik.touched.second_last_name && typeof formik.errors.second_last_name === 'string' ? formik.errors.second_last_name : undefined}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>


            {/*--------------------WARNING Card------------------*/}
            <Box mt={2} mb={2} justifyContent="center"
                sx={{
                    background: '#FFF4E5',
                    marginTop: '2em !important',
                    marginBottom: '2em !important',
                    width: 'calc(100% + 16px)'
                }}
            >
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={1}>
                        <IconButton color="warning">
                            <WarningIcon fontSize="large" />
                        </IconButton>
                    </Grid>

                    <Grid item xs={8}>
                        <Typography variant="body1" color="textPrimary">
                            ¿Los datos de la licencia de conducir o Real ID del solicitante (Nombre y Apellido) son diferentes a la información registrada en el Departamento de Educación (DEPR)?
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Box display="flex" alignItems="center" justifyContent="left" width="100%" gap={2}>
                            <Box display="flex" alignItems="center" gap={0}>
                                <Radio
                                    checked={selectedValue === 'Si'}
                                    onChange={() => OnChangeSelectedValue('Si')}
                                    value="Si"
                                    name="unique-radio-buttons"
                                    color="primary"
                                    sx={{
                                        width: "24px",
                                        height: "24px",
                                        padding: "2px",
                                        '&.Mui-checked': {
                                            color: '#333333',
                                        }
                                    }}
                                />
                                <Typography variant="body1" color="textPrimary">Sí</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={0}>
                                <Radio
                                    checked={selectedValue === 'No'}
                                    onChange={() => OnChangeSelectedValue('No')}
                                    value="No"
                                    name="unique-radio-buttons"
                                    color="primary"
                                    sx={{
                                        width: "24px",
                                        height: "24px",
                                        padding: "2px",
                                        '&.Mui-checked': {
                                            color: '#333333',
                                        }
                                    }}
                                />
                                <Typography variant="body1" color="textPrimary">No</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/*--------------------DEPR personal data------------------*/}
            {selectedValue === "Si" &&
                <>
                    <Box>
                        <Grid item xs={12}>
                            <Typography variant='body1' textAlign="center">Datos Personales en Educación (DEPR)</Typography>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <CustomLabel name="Primer Nombre" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        placeholder='Primer Nombre DEPR'
                                        name="depr_first_name"
                                        id="depr_first_name"
                                        type="text"
                                        variant="outlined"
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
                                        placeholder='Segundo Nombre DEPR'
                                        name="depr_second_name"
                                        id="depr_second_name"
                                        type="text"
                                        variant="outlined"
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
                                        placeholder='Primer Apellido DEPR'
                                        name="depr_last_name"
                                        id="depr_last_name"
                                        type="text"
                                        variant="outlined"
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
                                        placeholder='Segundo Apellido DEPR'
                                        name="depr_second_last_name"
                                        id="depr_second_last_name"
                                        type="text"
                                        variant="outlined"
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
                </>
            }

            {/*--------------------END DEPR personal data---------------*/}

            <Box>
                <Grid container spacing={2} sx={{ marginBottom: '1.5em !important' }}>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomLabel name="Fecha de Nacimiento" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
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
                                    max: new Date().toISOString().split("T")[0],  // Limita la fecha a hoy
                                }}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomLabel name="Género" required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                select
                                name="gender"
                                id="gender"
                                type="text"
                                variant="outlined"
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
                        <CustomLabel name="Teléfono" required={true} />
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

                </Grid>
            </Box>

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
                        <CustomLabel name="Correo Electrónico" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                name="emailToSend"
                                id="emailToSend"
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

                    <Grid item xs={6}>
                        <CustomLabel name="Confirme Correo Electrónico" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                placeholder='Correo Electrónico'
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
                        <CustomLabel name="Correo Electrónico " required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Correo Electrónico'
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
                        <CustomLabel name="Confirme Correo Electrónico" required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Correo Electrónico'
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
                        <CustomLabel name="Correo Electrónico " required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Correo Electrónico'
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
                        <CustomLabel name="Confirme Correo Electrónico" required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Correo Electrónico'
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

        </form>
    );
};

export default Step3;
