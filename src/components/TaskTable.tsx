/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { listTasks } from "../store/modules/task/task.slice";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { format } from 'date-fns'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface TaskTableProps {
    editar: (id: string) => void
    deletar: (id: string) => void
    isEdit?: string
}

const TaskTable: React.FC<TaskTableProps> = ({ editar, deletar, }: TaskTableProps) => {
    const dispatch = useAppDispatch();
    const tasksRedux = useAppSelector((state) => state.tasks)

    useEffect(() => {
        dispatch(listTasks())
    }, [])


    return (
        <>
            {tasksRedux.loading ?
                <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                    <CircularProgress color='secondary' />
                </Grid> : (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: '700px' }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Código</StyledTableCell>
                                    <StyledTableCell align="left">Nome</StyledTableCell>
                                    <StyledTableCell align="left">Descrição</StyledTableCell>
                                    <StyledTableCell align="left">Data da Criação</StyledTableCell>
                                    <StyledTableCell align="center">Ações</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasksRedux.data.length ? tasksRedux.data.map((item) => (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {item.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{item.name}</StyledTableCell>
                                        <StyledTableCell align="left">{item.description}</StyledTableCell>
                                        <StyledTableCell align="left">{format(item.createdAt, 'dd/MM/yyyy')}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button sx={{ marginRight: '10px' }} variant='contained' onClick={() => editar(item.id)} color='success'>Editar</Button>
                                            <Button variant='contained' onClick={() => deletar(item.id)} color='error'>Deletar</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )) : (<StyledTableRow>
                                    <StyledTableCell colSpan={5} align='center'>
                                        <Typography variant='body1' >Nenhuma tarefa para ser listada</Typography>
                                    </StyledTableCell>
                                </StyledTableRow>)
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>)
            }
        </>
    )
}


export default TaskTable