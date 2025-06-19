"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

interface User {
    id?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    roleId?: string;
    extension?: string;
    cellPhone?: string;
    address?: string;
    businessId?: string;
    rnc?: string;
    emailOrUsername?: string;
}

const UserProfile = ({ user }: { user: User }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<User>(user);

    const fullName = `${formData.firstname ?? ""} ${formData.lastname ?? ""}`.trim();

    const handleChange = (field: keyof User, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = () => {
        // Aquí podrías hacer un fetch/post a tu backend
        console.log("Datos actualizados:", formData);
        setIsEditing(false);
    };

    return (
        <div className="h-full min-h-[80vh] bg-gradient-to-r from-slate-100 to-blue-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8">
                {/* Avatar y nombre */}
                <div className="flex flex-col items-center md:w-1/3">
                    <img
                        src={`https://ui-avatars.com/api/?name=${fullName || formData.username}&background=6366f1&color=fff&size=256`}
                        alt="Avatar"
                        className="w-36 h-36 rounded-full shadow-lg"
                    />
                    {!isEditing ? (
                        <>
                            <h2 className="text-xl font-bold text-gray-800 mt-4">{fullName || formData.username}</h2>
                            <p className="text-sm text-indigo-600 mt-1">{formData.roleId?.toUpperCase()}</p>
                            {formData.businessId && (
                                <p className="text-sm text-gray-500">ID Empresa: {formData.businessId}</p>
                            )}
                        </>
                    ) : (
                        <div className="w-full mt-4 flex flex-col gap-6 ">
                            <span className="p-float-label">
                                <InputText
                                    id="firstname"
                                    value={formData.firstname || ""}
                                    onChange={(e) => handleChange("firstname", e.target.value)}
                                    className="w-full"
                                />
                                <label htmlFor="firstname">Nombre</label>
                            </span>
                            <span className="p-float-label">
                                <InputText
                                    id="lastname"
                                    value={formData.lastname || ""}
                                    onChange={(e) => handleChange("lastname", e.target.value)}
                                    className="w-full"
                                />
                                <label htmlFor="lastname">Apellido</label>
                            </span>
                        </div>
                    )}
                </div>

                {/* Detalles o formulario */}
                <div className="w-full space-y-6 px-2 py-2">
                    <h3 className="text-xl font-semibold text-gray-700 mb-6">
                        {isEditing ? "Editar información" : "Información de contacto"}
                    </h3>

                    {!isEditing ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            {formData.email && (
                                <div className="flex items-center">
                                    <i className="pi pi-envelope text-indigo-500 mr-2" />
                                    <span>{formData.email}</span>
                                </div>
                            )}
                            {formData.cellPhone && (
                                <div className="flex items-center">
                                    <i className="pi pi-phone text-indigo-500 mr-2" />
                                    <span>{formData.cellPhone}</span>
                                </div>
                            )}
                            {formData.extension && (
                                <div className="flex items-center">
                                    <i className="pi pi-hashtag text-indigo-500 mr-2" />
                                    <span>Ext: {formData.extension}</span>
                                </div>
                            )}
                            {formData.address && (
                                <div className="flex items-center col-span-2">
                                    <i className="pi pi-map-marker text-indigo-500 mr-2" />
                                    <span>{formData.address}</span>
                                </div>
                            )}
                            {formData.rnc && (
                                <div className="flex items-center col-span-2">
                                    <i className="pi pi-id-card text-indigo-500 mr-2" />
                                    <span>RNC: {formData.rnc}</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                            <span className="p-float-label">
                                <InputText
                                    id="email"
                                    value={formData.email || ""}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="w-full"
                                />
                                <label htmlFor="email">Correo</label>
                            </span>
                            <span className="p-float-label">
                                <InputText
                                    id="cellPhone"
                                    value={formData.cellPhone || ""}
                                    onChange={(e) => handleChange("cellPhone", e.target.value)}
                                    className="w-full"
                                />
                                <label htmlFor="cellPhone">Teléfono</label>
                            </span>
                            <span className="p-float-label col-span-2">
                                <InputTextarea
                                    id="address"
                                    value={formData.address || ""}
                                    onChange={(e) => handleChange("address", e.target.value)}
                                    className="w-full"
                                    rows={2}
                                    autoResize
                                />
                                <label htmlFor="address">Dirección</label>
                            </span>
                            <span className="p-float-label col-span-2">
                                <InputText
                                    id="rnc"
                                    value={formData.rnc || ""}
                                    onChange={(e) => handleChange("rnc", e.target.value)}
                                    className="w-full"
                                />
                                <label htmlFor="rnc">RNC</label>
                            </span>
                        </div>
                    )}

                    <div className="mt-6 flex gap-3">
                        {!isEditing ? (
                            <Button
                                label="Editar perfil"
                                icon="pi pi-user-edit"
                                className="w-full md:w-auto"
                                onClick={() => setIsEditing(true)}
                            />
                        ) : (
                            <>
                                <Button
                                    label="Guardar"
                                    icon="pi pi-save"
                                    className="w-full md:w-auto"
                                    onClick={handleSave}
                                />
                                <Button
                                    label="Cancelar"
                                    icon="pi pi-times"
                                    className="p-button-secondary w-full md:w-auto"
                                    onClick={() => {
                                        setFormData(user); // Revertimos los cambios
                                        setIsEditing(false);
                                    }}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;