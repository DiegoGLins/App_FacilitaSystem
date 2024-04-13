import { Button, Grid, Typography } from "@mui/material";
import { StyledTable, StyledTr, StyledTh, StyledTd } from "../styles/task.styles";
import TaskCard from "./TaskCard";

interface TaskType {
    id: string;
    name: string;
    description: string
    createdAt: { dia: string, mes: string, ano: string } | undefined
}

interface TaskTableProps {
    tasks: TaskType[]
    editar: (id: string) => void
    deletar: (id: string) => void
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, deletar, editar }: TaskTableProps) => {

    return (
        <StyledTable>
            <thead>
                <StyledTr>
                    <StyledTh align="left"># id</StyledTh>
                    <StyledTh align="right">Nome</StyledTh>
                    <StyledTh align="center">Descrição</StyledTh>
                    <StyledTh align="center">Data de criação</StyledTh>
                    <StyledTh align="center">Ações</StyledTh>
                </StyledTr>
            </thead>
            <tbody>
                {Array.isArray(tasks) && tasks.map((item) => (
                    // <StyledTr key={item.id} >
                    //     <StyledTd align="left">{item.id}</StyledTd>
                    //     <StyledTd align="right">{item.name}</StyledTd>
                    //     <StyledTd align="right">{item.description}</StyledTd>
                    //     <StyledTd align="center" >
                    //         <Button sx={{ marginRight: '8px' }} onClick={() => editar(item.id)} color='primary' variant='contained'>Editar
                    //         </Button>
                    //         <Button onClick={() => deletar(item.id)} color='error' variant='contained'>Deletar
                    //         </Button>
                    //     </StyledTd>
                    // </StyledTr>
                    <TaskCard children={
                        <Grid container>
                            <Typography variant="body2">{item.id}</Typography>
                            <Typography variant="body2">{item.name}</Typography>
                            <Typography variant="body2">{item.description}</Typography>
                            <Typography variant="body2">{item.createdAt?.dia} - {item.createdAt?.mes} - {item.createdAt?.ano}</Typography>
                        </Grid>
                    } />
                ))}
            </tbody>
        </StyledTable>
    )
}

export default TaskTable