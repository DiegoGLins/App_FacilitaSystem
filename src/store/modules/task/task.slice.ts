/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../config/services/api.service";
export interface TaskType {
    id: string;
    name: string;
    description: string;
    userId: string;
    createdAt: string
}

export type TaskCreate = Omit<TaskType, 'id' | 'createdAt'>
export type TaskUpdate = Omit<TaskType, 'userId' | 'createdAt'>

interface TaskState {
    data: TaskType[]
    loading: boolean
}

const initialState: TaskState = {
    data: [],
    loading: false
}

export const createTask = createAsyncThunk('create/tasks', async (task: TaskCreate) => {
    const tokenStorage = JSON.parse(localStorage.getItem("token") || '')

    try {
        const response = await apiService.post('/tasks', task, {
            headers: {
                Authorization: `Bearer ${tokenStorage}`
            }
        })

        return response.data

    }
    catch (error: any) {
        return {
            ok: error.response.data?.ok,
            code: error.response.data?.code,
            message: error.response.data?.message,
            data: error.response.data?.data
        }
    }
})

export const listTasks = createAsyncThunk('list/tasks', async () => {
    const tokenStorage = JSON.parse(localStorage.getItem("token") || '')

    try {
        const response = await apiService.get('/tasks', {
            headers: {
                Authorization: `Bearer ${tokenStorage}`
            }
        })
        return response.data
    }
    catch (error: any) {
        console.log(error)
        return {
            ok: false,
            code: error.response,
            message: error.toString()
        }
    }
})

export const editTask = createAsyncThunk('edit/tasks', async (data: TaskUpdate) => {
    const tokenStorage = JSON.parse(localStorage.getItem("token") || '')

    try {
        const response = await apiService.put(`/tasks/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${tokenStorage}`
            }
        })
        return response.data

    } catch (error: any) {
        return {
            ok: false,
            code: error.response,
            message: error.toString()
        }
    }
})

export const deleteTask = createAsyncThunk('delete/tasks', async (idTask: string) => {
    const tokenStorage = JSON.parse(localStorage.getItem("token") || '')

    try {
        const response = await apiService.delete(`/tasks/${idTask}`, {
            headers: {
                Authorization: `Bearer ${tokenStorage}`
            }
        })
        return response.data

    } catch (error: any) {
        return {
            ok: false,
            code: error.response,
            message: error.toString()
        }
    }
})


const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTask.pending, (state) => {
            state.loading = true
            return state
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            console.log("Resposta da Api:", action.payload)
            state.loading = false
            if (action.payload.ok) {
                state.data.push(action.payload?.data)
            }
            return state
        });
        builder.addCase(createTask.rejected, (state, action) => {
            state.loading = false
            console.log("Erro ao criar Tarefa:", action.error)
            alert(`${action.error}`)
            return state
        });
        builder.addCase(listTasks.pending, (state) => {
            state.loading = true
            return state
        });
        builder.addCase(listTasks.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload.ok) {
                state.data = action.payload.data
            }
            return state
        })
        builder.addCase(listTasks.rejected, (state, action) => {
            state.loading = false
            console.log(`Erro ao listar tarefas:`, action.error)
            alert("Erro ao listar tarefas")
            return state
        });
        builder.addCase(editTask.pending, (state) => {
            state.loading = true
            return state
        });
        builder.addCase(editTask.fulfilled, (state, action: PayloadAction<TaskUpdate>) => {
            state.loading = false
            const findTask = action.payload
            const indexTask = state.data.findIndex((item => item.id === findTask.id))
            if (indexTask >= 0) {
                state.data[indexTask].name = action.payload.name
                state.data[indexTask].description = action.payload.description
                state.data[indexTask].id = action.payload.id
            }
            return state
        });
        builder.addCase(editTask.rejected, (state, action) => {
            state.loading = false
            console.log(`Erro ao editar tarefa:`, action.error)
            alert("Erro ao editar tarefa")
            return state
        });
        builder.addCase(deleteTask.pending, (state, action) => {
            state.loading = true
            if (action.payload) {
                state.data = action.payload
            }
        });
        builder.addCase(deleteTask.fulfilled, (state, action: PayloadAction<TaskType>) => {
            state.loading = false;
            const findIndex = state.data.findIndex((item) => item.id === action.payload.id)
            if (findIndex !== -1) {
                state.data.splice(findIndex, 1)
                return state
            }
        });
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.loading = false
            console.log(`Erro ao editar tarefa:`, action.error)
            alert("Erro ao editar tarefa")
            return state
        })
    }
})

export const { clear } = taskSlice.actions
export default taskSlice.reducer