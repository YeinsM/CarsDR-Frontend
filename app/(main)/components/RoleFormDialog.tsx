'use client';
import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const RoleForm = ({ visible, onHide, onSave, role }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (role) {
            setName(role.name);
            setDescription(role.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [role]);

    const handleSubmit = () => {
        const newRole = {
            id: role ? role.id : null,
            name,
            description,
        };
        onSave(newRole);
        onHide();
    };

    return (
        <Dialog
            header={role ? 'Editar Rol' : 'Agregar Rol'}
            visible={visible}
            style={{ width: '400px' }}
            onHide={onHide}
            footer={
                <div>
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={onHide} />
                    <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} autoFocus />
                </div>
            }
        >
            <div className="p-fluid">
                <div className="field mb-3">
                    <label htmlFor="name">Nombre</label>
                    <InputText
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="description">Descripción</label>
                    <InputText
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default RoleForm;