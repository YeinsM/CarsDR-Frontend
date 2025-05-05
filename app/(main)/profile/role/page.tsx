'use client';
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import RoleForm from '../../components/RoleFormDialog';

const RolesPage = () => {
    const [roles, setRoles] = useState([
        { id: crypto.randomUUID(), name: 'User', description: 'Rol privado para usuarios internos' },
        { id: crypto.randomUUID(), name: 'Banco', description: 'Rol privado para usuarios internos' },
        { id: crypto.randomUUID(), name: 'Administrador', description: 'Rol privado para usuarios internos' },
        { id: crypto.randomUUID(), name: 'Dealer', description: 'Rol para distribuidores' },
    ]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const handleSave = (role) => {
        if (role.id) {
            setRoles(roles.map(r => (r.id === role.id ? role : r)));
        } else {
            setRoles([...roles, { ...role, id: crypto.randomUUID() }]);
        }
    };

    const handleEdit = (role) => {
        setSelectedRole(role);
        setIsDialogVisible(true);
    };

    const handleDelete = (id) => {
        setRoles(roles.filter(role => role.id !== id));
    };

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-pencil"
                className="p-button-warning"
                onClick={() => handleEdit(rowData)}
                tooltip="Editar"
            />
            <Button
                icon="pi pi-trash"
                className="p-button-danger"
                onClick={() => handleDelete(rowData.id)}
                tooltip="Eliminar"
            />
        </div>
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Mantenimiento de Roles</h1>
            <Button
                label="Agregar Rol"
                icon="pi pi-plus"
                className="mb-4"
                onClick={() => {
                    setSelectedRole(null);
                    setIsDialogVisible(true);
                }}
            />
            <DataTable value={roles} paginator rows={5} stripedRows responsiveLayout="scroll">
                <Column field="id" header="ID" />
                <Column field="name" header="Nombre" />
                <Column field="description" header="Descripción" />
                <Column body={actionBodyTemplate} header="Acciones" />
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
