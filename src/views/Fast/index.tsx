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
import registerImage from '../../assets/register.png';
import Radio from '@mui/material/Radio';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
import CustomLabel from "@/components/CustomLabel";
import { requestUserInfo } from "./functions";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Fast.module.scss";
import useAlert from "@/hooks/useAlert";
import useAuthStore from "@/hooks/useAuthStore";
import { PATH } from '@/routes/constants';
import { ConfirmationModal } from '@/components';
import { registerValidation } from '@/validations/registerValidation';
import ProgressStatus from '@/components/ProgressStatus/ProgressStatus';
import MultiStepForm from './MultiStepForm';


interface FormData {
  email: string;
  schoolTown: string,
  school_code: string;
  grade: string;
  grade_year: string;
  identification_type: string;
  identification: string;
  first_name: string;
  second_name: string;
  last_name: string;
  second_last_name: string;
  birthdate: string;
  gender: string;
  depr_first_name: string;
  depr_second_name: string;
  depr_last_name: string;
  depr_second_last_name: string;
  phone: string;
  social_security: string;
  email1: string;
  email2: string;
  token: string;
}


const Fast = () => {

  const initialFormData: FormData = {
    email: '',
    schoolTown: '1',
    school_code: '',
    grade: 'none',
    grade_year: '',
    identification_type: '',
    identification: '',
    first_name: '',
    second_name: '',
    last_name: '',
    second_last_name: '',
    birthdate: '',
    gender: '',
    depr_first_name: '',
    depr_second_name: '',
    depr_last_name: '',
    depr_second_last_name: '',
    phone: '',
    social_security: '',
    email1: '',
    email2: '',
    token: '',
  };


  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setStepValid] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);


  const steps = [
    {
      Title: "Paso #1",
      SubTitle: "Correo Electrónico",
    },
    {
      Title: "Paso #2",
      SubTitle: "Datos de la Escuela",
    },
    {
      Title: "Paso #3",
      SubTitle: "Datos Personales",
    },
  ];

  const navigate = useNavigate();

  const updateFormData = (data: Partial<FormData>, reset = false) => {
    if (reset) {
      setFormData(initialFormData);
      return;
    }
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const token = useAuthStore((state: any) => state.token);

  const onBack = () => {
    if (isAuthenticated) navigate("/dashboard");
    if (!isAuthenticated) navigate("/");
  }


  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const userInfo = await requestUserInfo(token);
          setFormData(userInfo); // Actualiza directamente formData
          updateFormData({
            token: token,
          }, false);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setFormData(initialFormData); // Si no está autenticado, establece los valores iniciales
      }
    };


    fetchUserData();
  }, [isAuthenticated, token]);


  return (

    <Grid container style={{ width: '100%', margin: 0 }}>

      <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', paddingLeft: '12%' }}>
        <Button
          style={{ alignSelf: 'flex-start', marginBottom: '5em !important"', color: 'black' }} // Estilos para posicionar el botón a la izquierda
          onClick={() => onBack()}
        >
          &lt; Volver
        </Button>
        <br />  <br />  <br />
      </Grid>

      <Grid item xs={3} style={{ overflow: 'hidden', height: 'auto' }}>


        <Box style={{ height: '', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>

          <Typography variant="h2" gutterBottom sx={{ fontSize: '2.2em !important', fontWeight: 'bolder', marginBottom: "1em !important" }}>
            Crear solicitud
          </Typography>
        </Box>

        <Box style={{ height: '33%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
          <ProgressStatus
            activeStep={activeStep}
            Steps={steps}
            horizontal={false}
            fontSize={1}
          />
        </Box>
      </Grid>
      <Grid item xs={9} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', padding: '2em' }}>

        <MultiStepForm
          onBack={onBack}
          currentStep={activeStep}
          changeStep={setActiveStep}
          isStepValid={isStepValid}
          setStepValid={setStepValid}
          formData={formData}
          updateFormData={updateFormData}
          isAuthenticated={isAuthenticated}
        />

      </Grid>

    </Grid >
  );
};

export default Fast;
