/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../config/services/api.service";
export interface TaskType {
    id: string;
    name: string;
    description: string;
    userId: string;
    createdAt?: { dia: string, mes: string, ano: string } | undefined
}

interface TaskState {
    data: TaskType[]
    loading: boolean
}

const initialState: TaskState = {
    data: [],
    loading: false
}

export const createTask = createAsyncThunk('/tasks', async (task: TaskType) => {
    const tokenStorage = localStorage.getItem("token")

    if (!tokenStorage) {
        return {
            ok: false,
            code: 500,
            message: "Erro ao criar tarefa"
        }
    }
    try {
        const response = await apiService.post('/tasks', task, {
            headers: {
                Authorization: `Bearer ${tokenStorage}`
            }
        })

        if (response.status === 201) {
            const { data } = response

            return {
                ok: response.data?.ok,
                code: response.data?.code,
                message: response.data?.message,
                data: data
            }
        }
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

export const listTasks = createAsyncThunk('/tasks', async () => {
    const tokenStorage = localStorage.getItem("token")

    try {
        if (!tokenStorage) {
            return {
                ok: false,
                code: 500,
                message: "Erro interno ao listar tarefas: Dentro do primeiro if do try"
            }
        }
        const response = await apiService.get('/tasks', {
            headers: {
                Authorization: `Bearer ${tokenStorage}`
            }
        })
        if (response.status === 200) {
            return response.data
        }
        return {
            ok: false,
            code: 404,
            message: "Erro ao listar tarefas"
        }
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


const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        tasks: (state, action) => {
            state.data = action.payload
            return state
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
            state.data.push(action.payload?.data)
            return state
        });
        builder.addCase(createTask.rejected, (_, action) => {
            console.log("Erro ao criar Tarefa:", action.error)
            alert(`${action.error}`)
        });
        builder.addCase(listTasks.pending, (state) => {
            state.loading = true
            return state
        });
        builder.addCase(listTasks.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload || initialState
            return state
        })
        builder.addCase(listTasks.rejected, (_, action) => {
            console.log(`Erro ao listar tarefas:`, action.error)
            alert("Erro ao listar tarefas")
        });
    }
})

export const { tasks } = taskSlice.actions
export default taskSlice.reducer