import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
    Card
} from '@mui/material';

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CustomStatusButton from '../customStatusButton';
import { IGetUsersDocumentsData } from "../../types";

interface CustomTableProps {
    tableData: IGetUsersDocumentsData[];
    isMobile: boolean;
}

const CustomTable = ({ tableData, isMobile }: CustomTableProps) => {

    const subStyles = {
        fontFamily: 'Montserrat-Black !important',
        fontWeight: 'bolder',
        fontSize: '1rem',
    }


    console.log(isMobile)
    const statusList: { [key: number]: string } = {
        0: "En Progreso",
        1: "Enviado",
        2: "Cancelado",
        3: "Error",
    };

    function formatDate(inputDate: string) {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
    }


    const MobileTable = ({ tableData }: CustomTableProps) => {

        return (
            <Box sx={{ margin: '20px', border: '1px solid #ddd', padding: '20px' }}>
                {tableData.map((rowData, index) => (
                    <div>
                        {tableData.map((rowData, index) => (
                            <Card key={index} sx={{ marginBottom: '1rem !important', padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <Typography variant="h3" sx={{ subStyles }}>Certificado:</Typography>
                                <Typography>{rowData.name}</Typography>
                                <br />
                                <Typography variant="h3" sx={{ subStyles }}>Escuela:</Typography>
                                <Typography>{rowData.school_name}</Typography>
                                <br />
                                <Typography variant="h3" sx={{ subStyles }}>Estatus:</Typography>
                                <br />
                                <CustomStatusButton statusName={statusList[parseInt(rowData.status) ?? 3]} statusCode={parseInt(rowData.status)} />
                                <br />
                                <Button
                                    variant="outlined"
                                    disabled={parseInt(rowData.status) !== 1}
                                    sx={{
                                        width: '100%',
                                        height: '43px',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8em !important',
                                        gap: '8px',
                                        marginTop: '1rem !important'
                                    }}
                                    startIcon={<MarkEmailReadIcon />}
                                >
                                    Reenviar a Correo
                                </Button>
                                <br />
                            </Card>
                        ))}
                    </div>
                ))}
            </Box>
        );
    };


    return (
        <>
            {isMobile ?
                <MobileTable tableData={tableData} isMobile={isMobile} />
                :
                <TableContainer
                    component={Paper}
                    sx={{
                        padding: "1rem",
                        boxShadow: '0px 4px 13.5px 0px rgba(0, 0, 0, 0.1)',
                    }
                    }
                >
                    <Table
                        sx={{
                            width: "100%",
                            justifyContent: "space-around",
                        }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        variant='h3'
                                        sx={{
                                            fontFamily: 'Montserrat-Black',
                                            justifyContent: "center",
                                            fontSize: "1.2em",
                                            color: "#666666 !important"
                                        }}
                                    >
                                        Certificado
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        variant='h3'
                                        sx={{
                                            fontFamily: 'Montserrat-Black',
                                            justifyContent: "center",
                                            fontSize: "1.2em",
                                            color: "#666666 !important"
                                        }}
                                    >
                                        Fecha de la Solicitud
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        variant='h3'
                                        sx={{
                                            fontFamily: 'Montserrat-Black',
                                            justifyContent: "center",
                                            fontSize: "1.2em",
                                            color: "#666666 !important"
                                        }}
                                    >
                                        Estatus
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant='h3'
                                        sx={{
                                            fontFamily: 'Montserrat-Black',
                                            fontSize: "1.2em",
                                            color: "#666666 !important"
                                        }}
                                    >
                                        Acción
                                    </Typography>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData &&
                                tableData?.map((row: IGetUsersDocumentsData, index: any) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row" align="center">

                                            <Typography

                                                sx={{
                                                    fontSize: "1.1rem",
                                                    justifyContent: "center",
                                                    display: "flex",
                                                    color: "#666666 !important"
                                                }}
                                            >
                                                {row.name}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Typography sx={{
                                                fontSize: "1.1rem",
                                                color: "#666666 !important"
                                            }}>
                                                {formatDate(row.created)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            sx={{
                                                fontSize: "1.1rem",
                                                paddingTop: "1.5rem",
                                                color: "#666666 !important"
                                            }}
                                        >
                                            <CustomStatusButton statusName={statusList[parseInt(row.status) ?? 3]} statusCode={parseInt(row.status)} />
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                paddingTop: "1.5rem",
                                                justifyContent: "center",
                                                display: "flex",
                                                paddingLeft: "10%",
                                                paddingRight: "10%",
                                            }}
                                        >
                                            <Button variant="outlined"
                                                disabled={parseInt(row.status) !== 1}
                                                sx={{
                                                    width: '172px',
                                                    height: '43px',
                                                    padding: '8px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.8em !important',
                                                    gap: '8px',
                                                }}
                                                startIcon={<MarkEmailReadIcon />}>
                                                Reenviar a Correo
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer >

            }
        </>
    );
};

export default CustomTable;
