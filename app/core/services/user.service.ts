import { Api } from "@/app/api/Api";
import { User } from "../models/user.model";


export const postUser = async (user: User) => {
    const response = await Api.post('/Users', user);
    return response.data
}

export const loginUser = async (user: User) => {
    const response = await Api.post('/Users/login', user)
    return response.data
}

export const registerUser = async (user: User) => {
    const response = await Api.post('/Users/register', user)
    return response.data
}