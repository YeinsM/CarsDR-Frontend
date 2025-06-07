import { Api } from "@/app/api/Api";
import { Role } from "../models/role.model";

// Create a new role
export const postRole = async (role: Role) => {
    console.log("role", role);
    const response = await Api.post('/Roles', role);
    return response.data;
}

// Get all roles
export const getRoles = async () => {
    const response = await Api.get('/Roles');
    return response.data;
}

// Get a role by ID
export const getRoleId = async (id: string) => {
    const response = await Api.get(`/Roles/${id}`);
    return response.data;
}

// Update a role by ID
export const putRoleId = async (id: string, role: Role) => {
    const response = await Api.put(`/Roles/${id}`, role);
    return response.data;
}

// Delete a role by ID
export const deleteRoleId = async (id: string) => {
    const response = await Api.delete(`/Roles/${id}`);
    return response.data;
}
