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
import { useParams } from 'react-router-dom';

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
  certification_type: string;
}


const Create = () => {


  const { certification_type } = useParams();
  console.log("certification_type from useParams:", certification_type);


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
    certification_type: certification_type || '',
  };

  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setStepValid] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

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
          console.log(formData)
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

  useEffect(() => {
    updateFormData({ certification_type: certification_type }, false);
  }, [formData.certification_type]);

  return (

    <Grid container style={{ width: '100%', margin: 0 }}>


      <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', paddingLeft: '12%' }}>

        <Grid item xs={12} sx={{ marginBottom: "1em !important", marginTop: "4em !important", padding: '1em !important' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#697FAA', fontSize: '2em !important' }}>
            Crear Solicitud
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ padding: '1em !important' }}>
          <Typography variant="body1" gutterBottom sx={{ fontSize: '1em !important' }}>
            Solicite su certificado en formato digital.
            Puede tardar hasta 5 días en ser procesada y enviada.
          </Typography>
        </Grid>

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

export default Create;
