"use client";

import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import RoleForm from '../../components/RoleFormDialog';
import { Role } from '@/app/core/models/role.model';
import { getRoles, postRole, putRoleId, deleteRoleId } from '@/app/core/services/role.service';

const RolesPage = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // Load roles from API
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const data = await getRoles();
            setRoles(data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (role: Role) => {
        try {
            if (role.id) {
                await putRoleId(role.id, role);
            } else {
                console.log(role);
                const response = await postRole(role);               
            }
            fetchRoles();
        } catch (error) {
            console.error("Error saving role:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteRoleId(id);
            fetchRoles();
        } catch (error) {
            console.error("Error deleting role:", error);
        }
    };

    const handleEdit = (role: any) => {
        setSelectedRole(role);
        setIsDialogVisible(true);
    };

    const actionBodyTemplate = (rowData: Role) => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-pencil"
                className="p-button-sm p-button-rounded p-button-warning"
                onClick={() => handleEdit(rowData)}
                tooltip="Edit"
                tooltipOptions={{ position: 'top' }}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-sm p-button-rounded p-button-danger"
                onClick={() => handleDelete(rowData.id)}
                tooltip="Delete"
                tooltipOptions={{ position: 'top' }}
            />
        </div>
    );


    return (
        <div className="p-6">

            <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white border-b pb-2">
                Role Management
            </h1>

            <Button
                label="Add Role"
                icon="pi pi-plus"
                className="mb-4 bg-blue-600 border-blue-600 hover:bg-blue-700"
                onClick={() => {
                    setSelectedRole(null);
                    setIsDialogVisible(true);
                }}
            />
            <DataTable
                value={roles}
                paginator
                rows={5}
                stripedRows
                loading={loading}
                responsiveLayout="scroll"
                emptyMessage="No roles found."
                className="rounded-md "
            >
                <Column field="id" header="ID" className="text-sm" />
                <Column field="name" header="Name" className="text-sm" />
                <Column field="description" header="Description" className="text-sm" />
                <Column body={actionBodyTemplate} header="Actions" className="text-sm" />
            </DataTable>

            <RoleForm
                visible={isDialogVisible}
                onHide={() => setIsDialogVisible(false)}
                onSave={handleSave}
                role={selectedRole}
            />
        </div>
    );
};

export default RolesPage;