import React, { useEffect, useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';

import { Box, Button, Grid } from '@mui/material';
import { CreateRequest } from '../functions';
import useAlert from "@/hooks/useAlert";
import useAuthStore from "@/hooks/useAuthStore";
import { PATH } from '@/routes/constants';
import { ConfirmationModal } from '@/components';
import { useNavigate } from 'react-router-dom';

interface FormData {
    email: string;
    schoolTown: string;
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
    certification_type_id: string;
}

interface MultiStepFormProps {
    onBack: () => void;
    currentStep: number;
    changeStep: (step: number) => void;
    isStepValid: boolean;
    setStepValid: (valid: boolean) => void;
    formData: FormData;
    updateFormData: (data: Partial<FormData>, reset: boolean) => void;
    isAuthenticated: boolean;
}

const MultiStepForm = ({
    onBack,
    currentStep,
    changeStep,
    isStepValid,
    setStepValid,
    formData,
    updateFormData,
    isAuthenticated
}: MultiStepFormProps) => {

    const { setAlert } = useAlert();
    const [onSendingData, setOnSendingData] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<'error' | 'success'>('error');
    const [termsandConditionsCheckBox, seetTermsandConditionsCheckBox] = useState(false);

    const customContent = {
        success: {
            title: "Solicitud Enviada",
            text: (
                <>
                    Próximamente recibirá un correo electrónico relacionado al proceso de su solicitud.
                </>
            )
        },
        error: {
            title: "Error",
            text: (
                <>
                    Ha ocurrido un error al enviar su solicitud, por favor, revise sus datos y vuelva a intentarlo.
                    <br />
                    Si persiste el error, contacte al Departamento de Educación.
                </>
            )
        }
    };

    const onNewRequestFast = () => {
        updateFormData({}, true);
        changeStep(0)
    };

    const navigate = useNavigate();
    // Función para avanzar al siguiente paso
    const onSendRequest = async () => {
        try {
            setOnSendingData(true);
            changeStep(1);
            await CreateRequest(formData);
            updateFormData({}, true);  // o cualquier otro valor inicial
            setAlert("¡Solicitud completada!", "success");
            modalTriger('success');
        } catch (error) {
            setAlert("La solicitud no pudo ser completada, intente nuevamente", "error");
            modalTriger('error');
            changeStep(0);
        }
    };

    const modalTriger = (type: 'error' | 'success') => {
        setOpenModal(true);
        setModalType(type)
    }

    // Función para manejar los datos recopilados en un paso
    const handleStepData = (data: Partial<FormData>) => {
        updateFormData(data, false);
    };

    const onCloseModal = () => {
        setOpenModal(false)
        if (modalType === 'success') {
            setTimeout(() => {
                onBack();
            }, 1500);
        }
    }

    useEffect(() => {
        console.log(termsandConditionsCheckBox)
        console.log('hola')
    }, [termsandConditionsCheckBox])

    return (
        <Box sx={{ padding: '0rem !important', width: '100%' }}>
            <Grid container >
                <Grid item xs={12} style={{ marginBottom: '3rem !important' }}>
                    {currentStep === 0 && (
                        <Step1
                            termsandConditionsCheckBox={termsandConditionsCheckBox}
                            setTermsandConditionsCheckBox={seetTermsandConditionsCheckBox}
                            isStepValid={isStepValid}
                            setStepValid={setStepValid}
                            updateFormData={updateFormData}
                            onStepCompleted={handleStepData}
                            formData={formData} />
                    )}
                    {currentStep === 1 && (
                        <Step2 />

                    )}

                    <Box mt={2} sx={{ width: '100%' }}>
                        {currentStep !== 1 &&

                            <>
                                <Button
                                    disabled={!isStepValid || !termsandConditionsCheckBox}
                                    type='submit'
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        width: '241.5px',
                                        height: '48px',
                                        padding: '8px 40px',
                                        borderRadius: '4px',
                                        marginRight: '16px',
                                        fontSize: '0.7em'
                                    }}
                                    onClick={() => onSendRequest()}
                                >
                                    Crear Solicitud
                                </Button>
                            </>
                        }
                    </Box>
                </Grid>
            </Grid>
            <ConfirmationModal
                open={openModal}
                onClose={onCloseModal}
                content={customContent}
                type={modalType}
            />
        </Box>
    );
};

export default MultiStepForm;
