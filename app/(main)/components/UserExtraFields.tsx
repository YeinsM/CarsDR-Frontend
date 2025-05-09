'use client';

import React from 'react';
import { InputText } from 'primereact/inputtext';

interface UserExtraFieldsProps {
    userType: string | null;
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserExtraFields: React.FC<UserExtraFieldsProps> = ({ userType, formData, onChange }) => {
    if (!userType) return null;

    return (
        <div className="space-y-2 mt-2 w-full">
            <h1 className="text-black dark:text-white text-xl">{userType}</h1>
            {/* // Componente Delear */}
            {userType === 'Delear' && (
                <>
                    <div className="space-y-2">
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-building text-primary" />
                                <InputText name="companyName" placeholder="Company Name" value={formData.companyName || ''} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-id-card text-primary" />
                                <InputText name="rnc" placeholder="RNC" value={formData.rnc || ''} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-envelope text-primary" />
                                <InputText type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-phone text-primary" />
                                <InputText type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-pencil text-primary" />
                                <InputText name="otherField1" placeholder="Other Field 1" value={formData.otherField1 || ''} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-pencil text-primary" />
                                <InputText name="otherField2" placeholder="Other Field 2" value={formData.otherField2 || ''} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                        </div>
                    </div>
                </>
            )}
            {/* // Componente de banco */}
            {userType === 'Banco' && (
                <>
                    <div className="space-y-2">
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-building text-primary" />
                                <InputText name="companyName" placeholder="Company Name" value={formData.companyName || ''} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-id-card text-primary" />
                                <InputText name="rnc" placeholder="RNC" value={formData.rnc || ''} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-envelope text-primary" />
                                <InputText type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-phone text-primary" />
                                <InputText type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-pencil text-primary" />
                                <InputText name="otherField1" placeholder="Other Field 1" value={formData.otherField1 || ''} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-pencil text-primary" />
                                <InputText name="otherField2" placeholder="Other Field 2" value={formData.otherField2 || ''} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                        </div>
                    </div>
                </>
            )}
            {/* // Componente de Invitado */}
            {userType === 'Invitado' && <InputText name="eventName" placeholder="Event Name" value={formData.eventName || ''} onChange={onChange} className="w-full bg-gray-100" />}

            {/* Componente de Usuario */}
            {userType === 'Usuario' && (
                <>
                    <div className="space-y-2">
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-envelope text-primary" />
                                <InputText name="email" placeholder="Email" value={formData.email} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-user text-primary"></i>
                                <InputText name="username" placeholder="Username" value={formData.username} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-pencil text-primary" />
                                <InputText name="otherField2" placeholder="Other Field 2" value={formData.otherField2 || ''} onChange={onChange} className="w-full bg-gray-100" />
                            </div>

                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-phone text-primary" />
                                <InputText type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={onChange} className="w-full bg-gray-100" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserExtraFields;
