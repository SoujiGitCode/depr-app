import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CSSProperties, useEffect, useState } from "react";
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import InputMask from 'react-input-mask';


const CustomBox = styled(Box)(() => ({
    verticalAlign: 'top',
    padding: '0.05rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '0px',
    border: `2px solid #658A86`,
    borderRadius: '4px 4px 0px 0px',
    '&:hover': {
        borderColor: '#658A86',
    },
    '& .MuiTextField-root': {
        '& .MuiInputBase-input': {
            textAlign: 'center !important',
        },
        '& fieldset': {
            border: 'none !important',
        },
        '&:hover fieldset': {
            border: 'none !important',
        },
        '&.Mui-focused fieldset': {
            border: 'none !important',
        },
    },
}));



// Define the props for the SocialSecurityInput component
interface SocialSecurityInputProps {
    value: any;
    variant?: "outlined";
    name: string;
    type?: string;
    placeholder?: string;
    id: string;
    sx?: CSSProperties;
    formik: any;
    setSocialSecurityArray: (value: any[]) => void;
    visibilityPassword: boolean;
    setVisibilityPassword: React.Dispatch<React.SetStateAction<boolean>>;
    form_social_security: string;
    disableToggleVisibility?: boolean;
}

const SocialSecurityNumberInput = ({
    value,
    variant,
    name,
    type,
    placeholder,
    id,
    sx,
    formik,
    setSocialSecurityArray,
    visibilityPassword,
    setVisibilityPassword,
    form_social_security,
    disableToggleVisibility = false
}: SocialSecurityInputProps) => {

    const [part1, setPart1] = useState('');
    const [part2, setPart2] = useState('');
    const [part3, setPart3] = useState('');

    const theme = useTheme();


    const getTextFieldWidth = (chars: number) => 20 * chars;

    const getHiddenFieldWidth = (maxLength: number) => {

        const baseWidthPerCharacter = 12;
        const totalPaddingAndBorder = 14;
        return maxLength * baseWidthPerCharacter + totalPaddingAndBorder;
    };




    return (
        <CustomBox>

            <InputMask
                mask="***"
                value={part1}
                onChange={(e) => setPart1(e.target.value)}
                maskChar="_"
            >
                {() => (
                    <TextField
                        type="text"
                        placeholder="xxx"
                        inputProps={{ maxLength: 10 }}
                        sx={{
                            letterSpacing: '0.1rem',
                            textAlign: 'right',
                            width: `${getTextFieldWidth(3)}px`,
                        }}
                    />
                )}
            </InputMask>


            <InputMask
                mask="**"
                value={part2}
                onChange={(e) => setPart2(e.target.value)}
                maskChar="_"
            >
                {() => (
                    <TextField
                        type="text"
                        placeholder="xx"
                        inputProps={{ maxLength: 10 }}
                        sx={{
                            letterSpacing: '0.1rem',
                            textAlign: 'center',
                            width: `${getTextFieldWidth(2)}px`,
                        }}
                    />
                )}

            </InputMask>

            <InputMask
                mask="****"
                value={part3}
                onChange={(e) => setPart3(e.target.value)}
                maskChar="_"
            >
                {() => (
                    <TextField
                        type="text"
                        placeholder="xxxx"
                        inputProps={{ maxLength: 10 }}
                        sx={{
                            letterSpacing: '0.1rem',
                            textAlign: 'left',
                            width: `${getTextFieldWidth(4)}px`,
                        }}
                    />
                )}
            </InputMask>
        </CustomBox>
    );
};

export default SocialSecurityNumberInput;