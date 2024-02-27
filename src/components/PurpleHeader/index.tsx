import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import icon from "../../assets/images/icon.png"

const PurpleHeader = () => {
    return (
        <>
            {/* Header */}
            <Box sx={{ bgcolor: 'rgb(105, 127, 170)', width: '100%', marginBottom: '2rem !important' }}>
                <Grid container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        padding: '10px 20px', // padding: 0px, 110px, 0px, 110px
                        alignItems: 'center', // Alineación vertical
                        lineHeight: '1.9'
                    }}
                >
                    <Grid item>
                        {/* Imagen de icono al lado izquierdo */}
                        <img src={icon} alt="Icono" style={{ height: '1.5em' }} />
                    </Grid>
                    <Grid item xs>
                        {/* Contenido del Header */}
                        <Typography variant="body1" color={'white'}>
                            Portal Oficial del Gobierno de Puerto Rico
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default PurpleHeader;


