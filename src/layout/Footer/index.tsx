import { Box } from '@mui/system';
import { Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import styles from './Footer.module.scss';

import logoWhite from "../../assets/images/logo-white.png"

import oigInfo from "../../assets/images/info.jpeg"
import oigLogo from "../../assets/images/oig-logo-hd.webp"

import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

export default function Footer({ isMobile }: { isMobile: boolean }) {

    const FooterText = {
        padding: 0,
        marginBottom: '0.8em !important',
        textAlign: isMobile ? 'center' : 'left',
        color: 'white',
        fontWeight: 'lighter',
        fontSize: '0.7rem'
    }

    const IconStyles = {
        paddingX: '8px',
        paddingY: '10px',
        color: '#fff',
        fontSize: '1.5rem'
    }

    return (
        <>
            {/* Footer */}
            <Box className={styles.footerContainer}>
                <Grid container>
                    {/* Primer Contenedor */}
                    <Box display="flex" className={styles.footerFirstContainer} sx={{ justifyContent: 'center', marginBottom: '4em !important' }}>
                        <Grid container item xs={10} justifyContent="space-around" gap={isMobile ? 4 : 1}>
                            <Grid item xs={12} lg={3} textAlign={isMobile ? 'center' : 'left'}>
                                {/* Contenido de la primera columna */}
                                <img src={logoWhite} alt="Logo Departamento de Educación" style={{ width: 'auto' }} />
                            </Grid>
                            <Grid item xs={12} lg={2}  >
                                {/* Contenido de la segunda columna */}
                                <Typography variant="body1" sx={{ marginBottom: '0.8em !important', textAlign: isMobile ? 'center' : 'left' }}>Contáctanos</Typography>
                                <Typography variant='body2' sx={FooterText}>Dirección Postal</Typography>
                                <Typography variant='body2' sx={FooterText}>P.O. Box 190759 San Juan PR</Typography>
                                <Typography variant='body2' sx={FooterText}>00919-0759</Typography>
                            </Grid>
                            <Grid item xs={12} lg={2}>
                                {/* Contenido de la tercera columna */}
                                <Typography variant="body1" sx={{ marginBottom: '0.8em !important', textAlign: isMobile ? 'center' : 'left' }}>Dirección Física</Typography>

                                <Typography variant="body1" sx={FooterText}>Ave Tnte. César González, esq</Typography>
                                <Typography variant="body1" sx={FooterText}>Calle Juan Calaf</Typography>
                                <Typography variant="body1" sx={FooterText}>Urb. Industrial</Typography>
                                <Typography variant="body1" sx={FooterText}>Tres Monjitas</Typography>
                                <Typography variant="body1" sx={FooterText}>Hato Rey, P.R. 00917</Typography>

                            </Grid>
                            <Grid item xs={12} lg={2}>
                                {/* Contenido de la cuarta columna */}
                                <Typography variant="body1" sx={{ marginBottom: '0.8em !important', textAlign: isMobile ? 'center' : 'left' }}>Teléfono</Typography>

                                <Typography variant="body1" sx={FooterText}>(787) 759-2000 o al (787) 759-9311</Typography>
                                <Typography variant="body1" sx={FooterText}>Síguenos en:</Typography>
                                <Typography variant="body1" sx={FooterText}>Ave Tnte. César González, esq</Typography>

                                {/* Facebook Icon */}
                                <IconButton
                                    aria-label="Facebook"
                                    color="inherit"
                                    component="a"
                                    href="https://www.facebook.com/EDUCACIONPR/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        ...IconStyles,
                                        paddingLeft: '0px !important',
                                    }}>
                                    <svg
                                        role="img"
                                        aria-labelledby="facebook-logo"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="0.8em"
                                        viewBox="0 0 320 512">
                                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                    </svg>
                                </IconButton>

                                {/* Twitter Icon */}
                                <IconButton
                                    aria-label="Twitter"
                                    color="inherit"
                                    component="a"
                                    href="https://twitter.com/EDUCACIONPR"
                                    target="_blank" rel="noopener noreferrer"
                                    sx={IconStyles}>
                                    <svg
                                        role="img"
                                        aria-labelledby="twitter-logo"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="0.8em"
                                        viewBox="0 0 512 512">
                                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                    </svg>
                                </IconButton>

                                {/* Instagram Icon */}
                                <IconButton
                                    aria-label="Instagram"
                                    color="inherit"
                                    component="a"
                                    href="https://www.instagram.com/educacionpr/?hl=es"
                                    target="_blank" rel="noopener noreferrer"
                                    sx={IconStyles}>
                                    <svg
                                        role="img"
                                        aria-labelledby="instagram-logo"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="0.8em"
                                        viewBox="0 0 448 512">
                                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                    </svg>
                                </IconButton>

                            </Grid>

                            <Grid item xs={12} lg={2}>
                                {/* Contenido de la tercera columna */}
                                <Typography variant="body1" sx={{ marginBottom: '0.8em !important', textAlign: isMobile ? 'center' : 'left' }}>
                                    <a href="https://www.pr.gov/" target="_blank" rel="noopener noreferrer"
                                        aria-label="Visitar el sitio web oficial del Gobierno de Puerto Rico"
                                        style={{ textDecoration: 'none', color: 'inherit' }}>PR.gov</a>
                                </Typography>

                                <Typography variant="body1" sx={FooterText}><AccessibleForwardIcon fontSize='small' /> Acessibilidade PRITS-043021-PRITS</Typography>
                                <Typography variant="body1" sx={FooterText}>Conforme a la Ley 229 de 2003</Typography>
                                <Typography variant="body1" sx={FooterText}>
                                    <a href="https://www.oig.pr.gov/" target="_blank" rel="noopener noreferrer"
                                        aria-label="Visitar el sitio web oficial de la Oficina del Inspector General"
                                        style={{ textDecoration: 'none', color: 'inherit' }}>Oficina de Inspector General (OIG)</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Línea Horizontal */}
                    <Grid item xs={12}>
                        <hr className={styles.horizontalLine} />
                    </Grid>
                    {/* Segundo Contenedor */}
                    <Grid item xs={12}>
                        <Box display="flex" className={styles.footerSecondContainer}>
                            <Typography variant="body1" className={styles.footerSecondContainerText} >2024 © Departamento de Educación de Puerto Rico</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
