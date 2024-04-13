/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../config/services/api.service";
import { UserType } from "../user/user.login.slice";

export interface TaskType {
    id: string;
    name: string;
    description: string;
    userId: string | undefined
    token?: string;
    createAt?: { dia: string, mes: string, ano: string } | undefined
}


interface TaskState {
    data: TaskType[]
    loading: boolean
}

const initialState: TaskState = {
    data: [],
    loading: false
}

export const createTask = createAsyncThunk('/task', async (task: TaskType, { getState }) => {
    const stateLogged = getState() as { userLogged: UserType | undefined }

    const token = stateLogged.userLogged?.token

    if (!token) {
        return {
            ok: false,
            code: 500,
            message: "Erro ao criar tarefa"
        }
    }
    try {
        const response = await apiService.post('/tasks', task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 201) {
            return {
                ok: response.data?.ok,
                code: response.data?.code,
                message: response.data?.message,
                data: response.data?.data
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
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            console.log("Resposta da Api:", action.payload)
            state.loading = false
            state.data.push(action.payload?.data)
            return state
        }),
            builder.addCase(createTask.rejected, (_, action) => {
                console.log("Erro ao criar Tarefa:", action.error)
                alert(`${action.error}`)
            })
    }
})

export const { tasks } = taskSlice.actions
export default taskSlice.reducer