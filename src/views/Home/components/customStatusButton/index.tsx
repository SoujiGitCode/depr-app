import { Button } from '@mui/material';

interface StatusButtonProps {
    statusName: string;
    statusCode: number;
}

const CustomStatusButton = ({ statusName, statusCode }: StatusButtonProps) => {
    const progress = "#939393";
    const succes = "#6ABE53"
    const error = "#445679";

    const statusColorList: { [key: number]: string } = {
        0: "#939393",
        1: "#6ABE53",
        2: "red",
        3: "#445679",
    };

    const buttonColor = statusColorList[statusCode ?? 3]
    const hoverColor = statusColorList[statusCode ?? 3]

    return (
        <Button
            variant="outlined"
            sx={{
                width: '100% !important',
                padding: '0.5rem',
                fontSize: '0.6rem !important',
                color: buttonColor,
                cursor: 'default',

                "&:hover": {

                }
            }}
        >
            {statusName}
        </Button>
    );
};

export default CustomStatusButton;
