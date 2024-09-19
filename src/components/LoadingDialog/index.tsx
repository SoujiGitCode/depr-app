import React from 'react';
import { Box, Grid, Typography, CircularProgress, Modal } from '@mui/material';

interface LoadingDialogProps {
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const LoadingDialog = ({ loading, setLoading }: LoadingDialogProps) => {
    const handleClose = () => {
        if (!loading) {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={loading}
            onClose={handleClose}
            aria-labelledby="modal-loading"
            aria-describedby="modal-loading-description"
            disableEscapeKeyDown={true} // Desactiva la opción de cerrar con "Esc"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                }}
            >
                <Grid container spacing={0} justifyContent="center">
                    <Grid
                        item
                        xs={11}
                        sx={{
                            marginTop: '2.5em !important',
                            marginBottom: '2.5em !important',
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            variant="body1"
                            gutterBottom
                            sx={{
                                fontSize: '1.5em !important',
                                fontWeight: 'bolder',
                                marginBottom: '1em !important',
                                marginTop: '2em !important',
                            }}
                        >
                            Cargando
                        </Typography>
                        <br />
                        <br />
                        <CircularProgress />
                    </Grid>

                    <Grid item xs={11} sx={{ marginBottom: '2.5em !important' }}>
                        <Grid container alignItems="center" spacing={3}>
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Typography variant="body1" color="textPrimary">
                                    Validando sus datos, por favor espere. No cierre ni recargue esta página.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default LoadingDialog;
