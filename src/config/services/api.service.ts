/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { TaskType } from "../../store/modules/task/task.slice";

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default apiService

const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


export interface ResponseApiUser {
    ok?: boolean;
    code?: number;
    message?: string;
    data?: any
}

export interface TaskResponse {
    ok?: boolean;
    code?: number;
    message?: string;
    data?: TaskType
}