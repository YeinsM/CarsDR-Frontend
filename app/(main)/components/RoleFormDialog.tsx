"use client";

import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Role } from '@/app/core/models/role.model';

const RoleForm = ({ visible, onHide, onSave, role }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (role) {
            setName(role.name || '');
            setDescription(role.description || '');
        } else {
            setName('');
            setDescription('');
        }
    }, [role]);

    const handleSubmit = () => {
        if (!name.trim()) return;

        const newRole: Role = {
            name,
            description,
        };

        // Only include `id` if editing an existing role
        if (role?.id) {
            newRole.id = role.id;
        }

        onSave(newRole);
        onHide();
    };

    const dialogFooter = (
        <div className="flex justify-end gap-2">
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text text-gray-500 hover:text-gray-800"
                onClick={onHide}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="bg-blue-600 border-blue-600 hover:bg-blue-700"
                onClick={handleSubmit}
                autoFocus
            />
        </div>
    );

    return (
        <Dialog
            header={role ? 'Edit Role' : 'Add Role'}
            visible={visible}
            style={{ width: '400px' }}
            onHide={onHide}
            footer={dialogFooter}
            className="rounded-md"
        >
            <div className="p-fluid space-y-4">
                <div className="field">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Role Name
                    </label>
                    <InputText
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full"
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <InputText
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default RoleForm;