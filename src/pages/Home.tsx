/* eslint-disable react-hooks/exhaustive-deps */
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
import { TaskCreate, TaskUpdate, createTask, deleteTask, editTask, listTasks } from '../store/modules/task/task.slice'


const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    const userLoggedRedux = useAppSelector((state) => state.userLogin)
    const tasksRedux = useAppSelector((state) => state.tasks.data)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const [alertMessage, setAlertMessage] = useState<string>()
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alertColor, setAlertColor] = useState<AlertColor>('error' || 'info' || 'success' || 'warning')

    const [nameTask, setNameTask] = useState<string>('')
    const [descriptionTask, setDescriptionTask] = useState<string>('')
    const [editMode, setEditMode] = useState<string>('')

    const navUrl = (url: string) => {
        navigate(url)
    }

    useEffect(() => {
        if (!token) {
            navUrl("/")
            return
        }
        dispatch(listTasks())
    }, [token])

    const clear = () => {
        setNameTask('')
        setDescriptionTask('')
    }

    const addTask = async () => {
        const newTask: TaskCreate = {
            name: nameTask,
            description: descriptionTask,
            userId: userLoggedRedux.id,
        }

        await dispatch(createTask(newTask)).then(response => {
            if (response.payload) {
                clear()
                setAlertMessage('Tarefa criada com sucesso')
                setAlertColor('success')
                setOpenAlert(true)
            }

        }).catch(() => {
            setAlertMessage('Erro ao criar tarefa')
            setAlertColor('error')
            setOpenAlert(true)
        })
    }

    const edit = async (id: string) => {
        setEditMode(id)
        const taskToEdit = tasksRedux.findIndex(task => task.id === id)
        if (taskToEdit) {
            setNameTask(tasksRedux[taskToEdit].name)
            setDescriptionTask(tasksRedux[taskToEdit].description)
        }
    }

    const toogleEditOperation = async () => {
        if (!editMode) {
            setNameTask(nameTask)
            setDescriptionTask(descriptionTask)
            addTask()
        } else {
            const editedTask: TaskUpdate = {
                name: nameTask,
                description: descriptionTask,
                id: editMode,
            }
            await dispatch(editTask(editedTask)).then(response => {
                if (response.payload) {
                    dispatch(listTasks())
                    clear()
                    setAlertMessage('Tarefa editada com sucesso')
                    setAlertColor('success')
                    setOpenAlert(true)
                }
            })
        }
    }

    const removeTask = (id: string) => {
        dispatch(deleteTask(id))
        dispatch(listTasks())
        setAlertMessage("Tarefa excluída com sucesso")
        setAlertColor("success")
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
                    <StyleInput placeholder='Digite a descrição da tarefa' value={descriptionTask} onChange={(e) => setDescriptionTask(e.target.value)} name='descriptionTask' type='text' />
                    <Button sx={{ marginLeft: '20px' }} onClick={toogleEditOperation} color={editMode ? 'secondary' : 'primary'} variant='contained'>{editMode ? 'Salvar' : 'Cadastar'}</Button>
                </Grid>
                <Grid item sx={{ width: '85%' }}>
                    <TaskTable isEdit={editMode} editar={edit} deletar={removeTask} />
                </Grid>
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