import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    type: 'success' | 'error';
}

function ConfirmationModal({ open, onClose, type }: ConfirmationModalProps) {

    const content = {
        success: {
            icon: <CheckCircleIcon style={{ fontSize: 100, color: 'green' }} />,
            title: 'Registro exitoso',
            text: 'A través de un correo electrónico podrá confirmar su registro.'
        },
        error: {
            icon: <CancelIcon style={{ fontSize: 100, color: 'red' }} />,
            title: 'Error',
            text: <>
                Ha ocurrido un error al intentar registrar su usuario. Por favor, revise sus datos y vuelva a intentarlo. Si el error persiste puede comunicarse al (787) 759-2000 o al 787-759-9311.
                <br /> <br />
                ¡Gracias por utilizar el Portal de Certificaciones Académicas del Departamento de Educación de Puerto Rico!.
            </>
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="global-modal-title"
            aria-describedby="global-modal-description"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 800,
                    borderRadius: 'md',
                    p: 8,
                    boxShadow: 'lg',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    gap: '32px'
                }}>
                {content[type].icon}
                <Typography id="global-modal-title" variant="h6" component="h2" gutterBottom sx={{ fontSize: '1.5em !important' }}>
                    {content[type].title}
                </Typography>
                <Typography id="global-modal-description" variant="body2" color="textSecondary" sx={{ fontSize: '1em !important' }}>
                    {content[type].text}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                    sx={{
                        width: 160,
                        height: 50,
                        padding: '8px 48px',
                        borderRadius: '4px',
                        gap: '8px'
                    }}
                >
                    Cerrar
                </Button>

            </Box>

        </Modal>
    );
}

export default ConfirmationModal
