import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <Box className={styles['footer']}>
            <Typography align="left">
                Copyright © {new Date().getFullYear()}
            </Typography>
        </Box>
    )
}
