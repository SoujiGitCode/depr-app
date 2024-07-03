import { Box } from '@mui/system';
import { Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import styles from './Footer.module.scss';

import logoWhite from "../../assets/images/logo-white.png"

import oigInfo from "../../assets/images/info.jpeg"
import oigLogo from "../../assets/images/oig-logo.jpg"

import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer({ isMobile }: { isMobile: boolean }) {
    return (
        <>
            {/* Footer */}
            <Box className={styles.footerContainer}>
                <Grid container>
                    {/* Primer Contenedor */}
                    <Box display="flex" className={styles.footerFirstContainer} sx={{ justifyContent: 'center', marginBottom: '0rem !important' }}>
                        <Grid container item xs={10} justifyContent="space-around" gap={isMobile ? 4 : 0}>

                            <Grid item xs={12} lg={3} sx={{ marginBottom: '1.5rem !important' }} >
                                {/* Contenido de la primera columna */}
                                <Typography variant="h5" sx={{ marginBottom: '0.5rem !important', textAlign: isMobile ? 'center' : 'left' }}> Contact Agency</Typography>
                                <List sx={{ p: 0 }} >
                                    <ListItem sx={{ padding: 0, marginBottom: '0rem !important', textAlign: isMobile ? 'center' : 'left' }}>
                                        <ListItemText primary=" Dirección física #000 C/#" sx={{
                                        }} />
                                    </ListItem>

                                    <ListItem sx={{ padding: 0, marginTop: '0rem !important', textAlign: isMobile ? 'center' : 'left' }}>
                                        <ListItemText primary="Pueblo, PR 00000" />
                                    </ListItem>
                                    <ListItem sx={{ padding: 0, marginTop: '0.5rem !important', textAlign: isMobile ? 'center' : 'left' }}>
                                        <ListItemText primary="emailoficial@agencia.pr.gov" />
                                    </ListItem>
                                    <ListItem sx={{ padding: 0, marginTop: '0.5rem !important', textAlign: isMobile ? 'center' : 'left' }}>
                                        <ListItemText primary="tel. (787) 000-0000" />
                                    </ListItem>
                                </List>
                            </Grid>

                            <Grid item xs={12} lg={3}>
                                {/* Contenido de la segunda columna */}
                                <Typography variant="h5" sx={{ marginBottom: '0.8em !important', textAlign: isMobile ? 'center' : 'left' }}>Social Media</Typography>
                                <List sx={{ p: 0 }}>

                                    <ListItem sx={{ padding: 0, marginBottom: '0.8em !important', display: 'flex', gap: '1.5em', justifyContent: isMobile ? 'center' : 'left' }} >

                                        {/* Twitter Icon */}
                                        <IconButton
                                            color="inherit" component="a"
                                            href="https://twitter.com/EDUCACIONPR"
                                            target="_blank" rel="noopener noreferrer"
                                            sx={{
                                                padding: '0px !important',
                                                width: '25px',
                                                height: '25px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                '&:hover': {
                                                    backgroundColor: '#ebebeb',
                                                }
                                            }}
                                        >
                                            <TwitterIcon sx={{ color: '#495279', fontSize: '18px', padding: '0px !important' }} />
                                        </IconButton>
                                        {/* Facebook Icon */}
                                        <IconButton
                                            color="inherit"
                                            component="a"
                                            href="https://www.facebook.com/EDUCACIONPR/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                padding: '0px !important',
                                                width: '25px',
                                                height: '25px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                justifyContent: 'center', // Centra el ícono horizontalmente
                                                alignItems: 'center', // Centra el ícono verticalmente
                                                '&:hover': {
                                                    backgroundColor: '#ebebeb', // Color de fondo al pasar el mouse (opcional)
                                                }
                                            }}
                                        >
                                            <FacebookIcon sx={{ color: '#495279', fontSize: '18px', padding: '0px !important' }} />
                                        </IconButton>

                                        {/* Youtube Icon */}
                                        <IconButton
                                            color="inherit"
                                            component="a" href="#"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                padding: '0px !important',
                                                width: '25px',
                                                height: '25px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                '&:hover': {
                                                    backgroundColor: '#ebebeb',
                                                }
                                            }}
                                        >
                                            <YouTubeIcon sx={{ color: '#495279', fontSize: '18px', padding: '0px !important' }} />
                                        </IconButton>

                                        {/* Instagram Icon */}
                                        <IconButton
                                            color="inherit"
                                            component="a"
                                            href="https://www.instagram.com/educacionpr/?hl=es"
                                            target="_blank" rel="noopener noreferrer"
                                            sx={{
                                                padding: '0px !important',
                                                width: '25px',
                                                height: '25px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                '&:hover': {
                                                    backgroundColor: '#ebebeb',
                                                }
                                            }}
                                        >
                                            <InstagramIcon sx={{ color: '#495279', fontSize: '18px', padding: '0px !important' }} />
                                        </IconButton>

                                    </ListItem>

                                </List>
                            </Grid>

                            <Grid item xs={12} lg={5}>
                                {/* Contenido de la tercera columna */}
                                <Box sx={{ borderLeft: isMobile ? 'none' : '1px solid #ffffff90', paddingTop: '0rem !important', paddingLeft: '1.5rem' }}>
                                    <Typography variant="h5"
                                        sx={{
                                            marginBottom: '0.8em !important',
                                            textAlign: isMobile ? 'center' : 'left',
                                            paddingTop: '0rem !important',
                                            marginTop: '0rem !important',
                                        }}>pr.gov</Typography>
                                    <Typography variant="body1"
                                        sx={{
                                            textAlign: isMobile ? 'left' : 'left',
                                            fontFamily: 'Montserrat-Medium',
                                            fontWeight: 'lighter',
                                            fontSize: '0.7rem',
                                        }}
                                    >
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam consectetur neque hic quis, recusandae tenetur odit obcaecati
                                        expedita nostrum saepe doloribus dignissimos quibusdam quisquam beatae, laboriosam voluptates
                                        doloremque maxime? Quisquam!</Typography>
                                </Box>


                            </Grid>



                        </Grid>
                    </Box>

                    {/* Línea Horizontal */}
                    <Grid item xs={12}>
                        <hr className={styles.horizontalLine} />
                    </Grid>
                    {/* Segundo Contenedor */}
                    <Grid item xs={12} className={styles.footerSecondContainer}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                        <Grid container item xs={10} sx={{ justifyContent: 'space-around' }}>

                            <Grid item xs={12} lg={7} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                                <Typography variant='body2' sx={{ color: '#343A55' }}><b>Accesibilidad Núm-XXX-2019</b> - Conforme a la Ley 229 de 2003</Typography>
                            </Grid>

                            <Grid item xs={12} lg={5} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                                <Typography variant='body2' sx={{ color: '#343A55' }}>www.pr.gov 2021, All rights reserved </Typography>
                                <Typography variant='body2' sx={{ color: '#343A55' }}>Created by: xxxxxx</Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
