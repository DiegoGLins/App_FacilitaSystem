/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/Navbar'
import { Alert, AlertColor, Button, Grid, Snackbar } from '@mui/material'
import TaskTable from '../components/TaskTable'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { createTask } from '../store/modules/task/task.slice'
import { StyleLabel, StyleInput } from '../styles/task.styles'
import apiService, { interceptor } from '../config/services/api.service'
import { UserType, userLogin } from '../store/modules/user/user.login.slice'

interface TaskType {
    id: string;
    name: string;
    description: string;
    createdAt: { dia: string, mes: string, ano: string } | undefined
}

interface UserLogged {
    id: string | undefined,
    email: string,
    name: string | undefined,
    token: string | undefined,
}

const Home: React.FC = () => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const navUrl = (url: string) => {
        navigate(url)
    }

    useEffect(() => {
        if (!token) {
            navUrl("/")
            return
        }
    }, [token])


    const userLogged = useAppSelector((state) => state.userLogin)
    // const taskRedux = useAppSelector((state) => state)

    const [alertMessage, setAlertMessage] = useState<string>()
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alertColor, setAlertColor] = useState<AlertColor>('error' || 'info' || 'success' || 'warning')

    const [nameTask, setNameTask] = useState<string>('')
    const [descriptionTask, setDescripitionTask] = useState<string>('')
    const [editMode, setEditmode] = useState<string>('')
    const [taskData, setTakData] = useState<TaskType[]>([])
    const [userData, setUserData] = useState<UserLogged>()

    const dataCreated = new Date()
    const day = dataCreated.getDate().toString().padStart(2, '0')
    const month = String(dataCreated.getMonth() + 1).padStart(2, '0');
    const year = String(dataCreated.getFullYear()).padStart(2, '0')

    useEffect(() => {
        function getLogged() {
            if (userLogged) {
                setUserData({
                    id: userLogged.id,
                    name: userLogged.name,
                    email: userLogged.email,
                    token: userLogged?.token
                })
            }
        }
        getLogged()
    }, [])


    const addTask = async () => {
        const newTask = {
            id: '',
            name: nameTask,
            description: descriptionTask,
            createdAt: {
                dia: `${day}`,
                mes: `${month}`,
                ano: `${year}`
            }
        }

        await apiService.post('/tasks', newTask, {
            headers: {
                Authorization: `Bearer ${userData?.token!}`
            }
        }).then(response => {
            setTakData(response.data.data)
            setAlertMessage(response.data.message)
            setAlertColor("success")
            setOpenAlert(true)
        })
    }

    return (
        <>
            <NavBar />
            <Grid container sx={{ justifyContent: 'center', marginTop: '30px', alignItems: 'center', flexDirection: 'column' }}>
                <Grid item sx={{ marginBottom: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    <StyleLabel htmlFor='name'>Nome da tarefa</StyleLabel>
                    <StyleInput placeholder='Digite o nome da tarefa' value={nameTask} onChange={(e) => setNameTask(e.target.value)} name='nameTask' type='text' />
                    <StyleLabel htmlFor='description'>Descrição da tarefa</StyleLabel>
                    <StyleInput placeholder='Digite a descrição da tarefa' value={descriptionTask} onChange={(e) => setDescripitionTask(e.target.value)} name='descriptionTask' type='text' />
                    <Button sx={{ marginLeft: '20px' }} onClick={addTask} color={editMode ? 'success' : 'primary'} variant='contained'>{editMode ? 'Salvar' : 'Cadastar'}</Button>
                </Grid>
                <TaskTable tasks={taskData} editar={() => console.log()} deletar={() => console.log()} />
            </Grid>
            <Snackbar className='styleAlert' open={openAlert} autoHideDuration={1600} onClose={() => setOpenAlert(false)}>
                <Alert variant='filled' onClose={() => setOpenAlert(false)} severity={alertColor}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Home