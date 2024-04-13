/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/Navbar'
import { Alert, AlertColor, Button, Grid, Snackbar } from '@mui/material'
import TaskTable from '../components/TaskTable'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { StyleLabel, StyleInput } from '../styles/task.styles'
import apiService from '../config/services/api.service'
import { TaskType, createTask } from '../store/modules/task/task.slice'

interface UserLogged {
    id: string | undefined,
    email: string,
    name: string | undefined,
    token: string | undefined,
}

const Home: React.FC = () => {

    // const userLoggedRedux = useAppSelector((state) => state.userLogin)
    const tasksRedux = useAppSelector((state) => state.tasks)
    const dispatch = useAppDispatch();

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const [alertMessage, setAlertMessage] = useState<string>()
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alertColor, setAlertColor] = useState<AlertColor>('error' || 'info' || 'success' || 'warning')

    const [nameTask, setNameTask] = useState<string>('')
    const [descriptionTask, setDescripitionTask] = useState<string>('')
    const [editMode, setEditmode] = useState<string>('')
    // const [taskData, setTaskData] = useState<TaskType[]>([])
    // const [userData, setUserData] = useState<UserLogged>()

    const dataCreated = new Date()
    const day = dataCreated.getDate().toString().padStart(2, '0')
    const month = String(dataCreated.getMonth() + 1).padStart(2, '0');
    const year = String(dataCreated.getFullYear()).padStart(2, '0')

    const navUrl = (url: string) => {
        navigate(url)
    }

    useEffect(() => {
        if (!token) {
            navUrl("/")
            return
        }
    }, [token])

    // useEffect(() => {
    //     function getLogged() {
    //         if (userLoggedRedux) {
    //             setUserData({
    //                 id: userLoggedRedux.id,
    //                 name: userLoggedRedux.name,
    //                 email: userLoggedRedux.email,
    //                 token: userLoggedRedux?.token
    //             })
    //         }
    //     }
    //     getLogged()
    // }, [])

    const addTask = async () => {
        const newTask: TaskType = {
            id: '',
            name: nameTask,
            description: descriptionTask,
            createdAt: {
                dia: `${day}`,
                mes: `${month}`,
                ano: `${year}`
            }
        }

        // await apiService.post('/tasks', newTask, {
        //     headers: {
        //         Authorization: `Bearer ${userData?.token!}`
        //     }
        // }).then(response => {
        //     setTakData([...tasksRedux.data, response.data.data])
        //     setAlertMessage(response.data.message)
        //     setAlertColor("success")
        //     setOpenAlert(true)
        // })

        const { payload } = await dispatch(createTask(newTask))
        if (payload) {
            setAlertMessage('Tarefa criada com sucesso')
            setAlertColor('success')
            setOpenAlert(true)
        }
        setAlertMessage('Erro ao criar tarefa')
        setAlertColor('error')
        setOpenAlert(true)
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
                {tasksRedux.data.length &&
                    <TaskTable isEdit={editMode} editar={() => console.log()} deletar={() => console.log()} />
                } : <></>
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