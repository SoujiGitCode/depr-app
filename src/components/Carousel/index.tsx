import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, Grid, IconButton, Typography, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from "./styles.module.scss"

import slider1 from "../../assets/images/slider-1.png"
import slider2 from "../../assets/images/slider-2.png"
import slider3 from "../../assets/images/slider-3.png"

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const MyCarousel = () => {

    const titleOne = "Ingresar Datos"
    const paragraphOne = "Para crear una solicitud debe ingresar sus datos personales y datos de la escuela donde curso el grado a ser considerado para la emisión de sus certificado de graduación."

    const titleTwo = "Crear Solicitud"
    const paragraphTwo = "Para crear una solicitud solo debe oprimir el botón de Crear solicitud completar el formulario y enviar la solicitud."

    const titleThree = "¡Listo! reciba el certificado en su Correo Electrónico"
    const paragraphThree = "Enviaremos un correo electrónico de confirmación al correo provisto en el formulario."

    return (
        <Box position="relative">
            <Carousel
                responsive={responsive}
                arrows={true}
                renderButtonGroupOutside={true}
            >
                <SlideContent title={titleOne} paragraph={paragraphOne} imgSrc={slider1} />
                <SlideContent title={titleTwo} paragraph={paragraphTwo} imgSrc={slider2} button={true} />
                <SlideContent title={titleThree} paragraph={paragraphThree} imgSrc={slider3} />

            </Carousel>
        </Box>
    );
};

const SlideContent = ({ title, paragraph, imgSrc, button = false }: any) => {

    return (
        <Box>
            <Grid container justifyContent="center" alignItems="center" gap={3}>
                <Grid item xs={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <Typography className={styles.carouselTitle}>{title}</Typography>
                        <Typography className={styles.carouselText}>{paragraph}</Typography>

                        {button && (
                            <Button className={styles.carouselButton}>
                                Crear Solicitud
                            </Button>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <img src={imgSrc} alt={title} />
                </Grid>
            </Grid>
        </Box>
    );
};

const ButtonGroup = () => {
    return (
        <>
            <IconButton style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
                <ChevronLeft />
            </IconButton>
            <IconButton style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                <ChevronRight />
            </IconButton>
        </>
    );
};

export default MyCarousel;