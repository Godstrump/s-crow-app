import { apiUrl } from '../utils/constants/api'
import axios from "axios";

export const logIn = async (data) => {
    try {
        const res = await axios.post(`${apiUrl}/auths/signin`,data)
        return {
            data: res.data,
            status: res.status,
        }
    }
    catch(error) {
        console.error('auth',error)
        return {
            status: error.response?.status,
            message: error.response?.data
        }
    }
}

export const signUp = async (data) => {
    try {
        const res = await axios.post(`${apiUrl}/auths/signup`,data)
        return {
            data: res.data,
            status: res.status,
        }
    }
    catch(error) {
        console.log('auth',error)
        return {
            status: error.response?.status,
            message: error.response?.data
        }
    }
}