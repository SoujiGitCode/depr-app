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
    Typography
} from '@mui/material';

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CustomStatusButton from '../customStatusButton';
import { IGetUsersDocumentsData } from "../../types";

interface CustomTableProps {
    tableData: IGetUsersDocumentsData[];
}

const CustomTable = ({ tableData }: CustomTableProps) => {

    const statusList: { [key: number]: string } = {
        0: "En Progreso",
        1: "Enviado",
        2: "Cancelado",
        3: "Error",
    };

    function formatDate(inputDate: string) {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Sumamos 1 al mes, ya que en JavaScript los meses empiezan desde 0 (enero) hasta 11 (diciembre).
        const year = date.getFullYear().toString();
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                padding: "1rem",
                boxShadow: '0px 4px 13.5px 0px rgba(0, 0, 0, 0.1)',
            }}
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
                                variant='h6'
                                sx={{
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
                                variant='h6'
                                sx={{
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
                                variant='h6'
                                sx={{
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
                                variant='h6'
                                sx={{
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
                                            width: '172px',  // Ancho específico
                                            height: '43px',   // Altura específica
                                            padding: '8px',   // Padding interno
                                            borderRadius: '4px', // Redondeo de bordes
                                            fontSize: '0.8em !important',
                                            gap: '8px',      // Espacio entre icono y texto (si utilizas un icono)
                                        }}
                                        startIcon={<MarkEmailReadIcon />}>
                                        Reenviar a Correo
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
