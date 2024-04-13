/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../config/services/api.service";

interface UserType {
    id?: string;
    name: string;
    email: string;
    password: string
}

interface UserState {
    data: UserType[]
    loading: boolean
}

const initialState: UserState = {
    data: [],
    loading: false
}

export const createUser = createAsyncThunk('/user', async (user: Omit<UserType, 'id'>) => {
    try {
        const response = await apiService.post('/users', user)

        if (response.status === 201) {
            const { data } = response;

            if (data.ok) {
                return data.data;
            }
        }
        return []
    } catch (error: any) {
        return {
            ok: error.response.data?.ok,
            code: error.response.data?.code,
            message: error.response.data?.message,
            data: error.response.data?.data
        }
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        users: (state, action) => {
            state.data = action.payload
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            console.log("Resposta da Api:", action.payload)
            state.loading = false
            state.data.push(action.payload?.data)
            return state
        }),
            builder.addCase(createUser.rejected, (_, action) => {
                console.log("Erro ao cadastrar aluno:", action.error)
                alert(`${action.error}`)
            })
    }
})

export const { users } = usersSlice.actions
export default usersSlice.reducer