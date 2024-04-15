/* eslint-disable react-hooks/exhaustive-deps */

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { TaskType } from "../store/modules/task/task.slice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
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
    tasks: TaskType[]
    editar: (id: string) => void
    deletar: (id: string) => void
    isEdit?: string
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, editar, deletar }: TaskTableProps) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left"># id</StyledTableCell>
                        <StyledTableCell align="right">Nome</StyledTableCell>
                        <StyledTableCell align="right">Descrição</StyledTableCell>
                        <StyledTableCell align="left">Data da Criação</StyledTableCell>
                        <StyledTableCell align="left">Ações</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((item) => (
                        <StyledTableRow key={item.id}>
                            <StyledTableCell component="th" scope="row">
                                {item.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{item.name}</StyledTableCell>
                            <StyledTableCell align="right">{item.description}</StyledTableCell>
                            <StyledTableCell align="right">{item.createdAt?.dia} / {item.createdAt?.mes} / {item.createdAt?.ano}</StyledTableCell>
                            <StyledTableCell align="center"><Button variant='contained' onClick={() => editar(item.id)} color='success'>Editar</Button></StyledTableCell>
                            <StyledTableCell align="center"><Button variant='contained' onClick={() => deletar(item.id)} color='error'>Deletar</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default TaskTable