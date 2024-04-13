import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../config/services/api.service";

export interface UserType {
    id: string;
    name: string;
    email: string
    password: string
    token?: string
    loading: boolean
}

const initialState: UserType = {
    id: '',
    email: '',
    name: '',
    password: '',
    token: '',
    loading: false
}

interface UserLogin {
    email: string;
    password: string
}

export const login = createAsyncThunk('/auth/user', async (user: UserLogin) => {
    const response = await apiService.post('/auth', user)
    if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data?.token))
        return response.data
    }
})

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        userLogin: (state) => {
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            return state
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.id = action.payload.id,
                state.name = action.payload.name,
                state.email = action.payload.email,
                state.password = action.payload.password
            state.token = action.payload.token
            return state
        })
    }
})

export const { userLogin } = userLoginSlice.actions
export default userLoginSlice.reducer