import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService, { ResponseApiUser } from "../../../config/services/api.service";
export interface UserType {
    id: string;
    name: string;
    email: string
    password: string
    token?: string
    loading?: boolean
}

const initialState: UserType = {
    id: '',
    name: '',
    email: '',
    password: '',
    token: '',
    loading: false
}

interface UserLogin {
    email: string;
    password: string
}

export const login = createAsyncThunk('/auth/user', async (user: UserLogin): Promise<ResponseApiUser> => {
    const response = await apiService.post('/auth', user)
    if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data?.token))
        return response.data
    }
    return {
        ok: response.data?.ok,
        code: response.data?.code,
        message: response.data?.message
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
            state.id = action.payload?.data?.id;
            state.name = action.payload?.data?.name;
            state.email = action.payload?.data?.email;
            state.password = action.payload?.data?.password
            state.token = action.payload?.data?.token
            return state
        })
    }
})

export const { userLogin } = userLoginSlice.actions
export default userLoginSlice.reducer