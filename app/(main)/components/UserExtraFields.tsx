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

            {/* Componente Usuario */}
            {userType === 'Usuario' && (
                <>
                    <div className="space-y-2">
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-envelope text-primary" />
                                <InputText
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email"
                                    value={formData.email || ''}
                                    onChange={onChange}
                                    className="w-full bg-gray-100"
                                />
                            </div>
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-user text-primary" />
                                <InputText
                                    name="username"
                                    type="text"
                                    required
                                    placeholder="Username"
                                    value={formData.username || ''}
                                    onChange={onChange}
                                    className="w-full bg-gray-100"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-pencil text-primary" />
                                <InputText
                                    name="address"
                                    type="text"
                                    required
                                    placeholder="Address"
                                    value={formData.address || ''}
                                    onChange={onChange}
                                    className="w-full bg-gray-100"
                                />
                            </div>

                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-phone text-primary" />
                                <InputText
                                    type="text"
                                    name="cellPhone"
                                    placeholder="cellPhone"
                                    required
                                    value={formData.cellPhone || ''}
                                    onChange={onChange}
                                    className="w-full bg-gray-100"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-envelope text-primary" />
                                <InputText
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password || ''}
                                    onChange={onChange}
                                    className="w-full bg-gray-100"
                                />
                            </div>
                            <div className="p-input-icon-left w-full md:w-1/2">
                                <i className="pi pi-user text-primary" />
                                <InputText
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={formData.confirmPassword || ''}
                                    onChange={onChange}
                                    className="w-full bg-gray-100"
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserExtraFields;