import axios from "axios";
import { User } from "../models/user.model";

const api = axios.create({
    baseURL: 'http://44.208.165.188:1000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})


export const postUser = async (user: User) => {
    const response = await api.post('/Users', user);
    return response.data
}

export const loginUser = async (user: User) => {
    const response = await api.post('/Users/login', user)
    return response.data
}

export const registerUser = async (user: User) => {
    const response = await api.post('/Users/register', user)
    return response.data
}