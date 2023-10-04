import { Box } from '@mui/system';
import { Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import styles from './Footer.module.scss';

import logoWhite from "../../assets/images/logo-white.png"

import oigInfo from "../../assets/images/info.jpeg"
import oigLogo from "../../assets/images/oig-logo.webp"

import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <Box className={styles.footerContainer}>
                <Grid container>
                    {/* Primer Contenedor */}
                    <Box display="flex" className={styles.footerFirstContainer} sx={{ justifyContent: 'center', marginBottom: '4em !important' }}>
                        <Grid container item xs={10} justifyContent="space-around" gap={1}>
                            <Grid item xs={2} >
                                {/* Contenido de la primera columna */}
                                <img src={logoWhite} alt="Logo" style={{ width: '70%' }} />
                            </Grid>
                            <Grid item xs={2}>
                                {/* Contenido de la segunda columna */}
                                <Typography variant="h6" sx={{ marginBottom: '1em !important' }}>Contáctanos</Typography>
                                <List sx={{ p: 0 }}>
                                    <ListItem sx={{ padding: 0, marginBottom: '0.8em !important' }}>
                                        <ListItemText primary="Dirección Postal" />
                                    </ListItem>
                                    <ListItem sx={{ padding: 0, marginBottom: '0.8em !important' }}>
                                        <ListItemText primary="P.O. Box 190759 San Juan PR" />
                                    </ListItem>
                                    <ListItem sx={{ padding: 0, marginBottom: '0.8em !important' }}>
                                        <ListItemText primary="00919-0759" />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={2}>
                                {/* Contenido de la tercera columna */}
                                <Typography variant="h6" sx={{ marginBottom: '1em !important' }}>Dirección Física</Typography>
                                <List sx={{ p: 0 }}>
                                    <ListItem sx={{ padding: 0, marginBottom: '0.8em !important' }}>
                                        <ListItemText primary="Ave Tnte. César González, esq" />
                                    </ListItem>
                                    <ListItem sx={{ padding: 0, marginBottom: '0.8em !important' }}>
                                        <ListItemText primary="Calle Juan Calaf" />
                                    </ListItem>
                                    <ListItem sx={{ padding: 0, marginBottom: '0.8em !important' }}>
                                        <ListItemText primary="Urb. Industrial" />
                                    </ListItem>
                                    <ListItem sx={{ padding: 0, marginBottom: '0.8em !important' }}>
                                        <ListItemText primary="Tres Monjitas" />
                                    </ListItem>
                                    <ListItem sx={{ padding: 0, marginBottom: '0.8em !important' }}>
                                        <ListItemText primary="Hato Rey, P.R. 00917" />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={2}>
                                {/* Contenido de la cuarta columna */}
                                <Typography variant="h6" sx={{ marginBottom: '1em !important' }}>Teléfono</Typography>
                                <List sx={{ p: 0 }}>
                                    <ListItem sx={{ padding: 0, marginBottom: '1em !important' }}>
                                        <ListItemText primary="Síguenos en:" />
                                    </ListItem>
                                    <ListItem sx={{ padding: 0, marginBottom: '0.8em !important' }}>
                                        <IconButton color="inherit">
                                            <FacebookIcon />
                                        </IconButton>
                                        <IconButton color="inherit">
                                            <TwitterIcon />
                                        </IconButton>
                                        <IconButton color="inherit">
                                            <InstagramIcon />
                                        </IconButton>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={1}>
                                {/* Contenido de la quinta columna */}
                                <Box mb={4}>
                                    <img src={oigLogo} alt="Logo" style={{ width: '120px', height: '50px' }} />
                                </Box>
                                <img src={oigInfo} alt="Logo" style={{ width: '120px' }} />
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
                            <Typography variant="body1" className={styles.footerSecondContainerText} >2022 © Departamento de educación de Puerto Rico</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
