'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { Page } from '../../../../types/layout';
import { classNames } from 'primereact/utils';
import { LayoutConfigContext } from '../../../../layout/context/layoutcontext';
import { Tooltip } from 'primereact/tooltip';
import { User } from '@/app/core/models/user.model';
import { AxiosToastError } from '@/app/api/Api';
import Link from 'next/link';
import { Dropdown } from 'primereact/dropdown';
import UserExtraFields from '@/app/(main)/components/UserExtraFields';
import { Checkbox } from 'primereact/checkbox';
import { getRoles } from '@/app/core/services/role.service';
import { registerUser } from '@/app/core/services/user.service';

const Register: Page = () => {
    const toast = useRef(null);
    const { layoutConfig } = useContext(LayoutConfigContext);
    const router = useRouter();
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [selectCountry, setSelectCountrye] = useState(null);
    const [roles, setRoles] = useState([]);

    const [confirmed, setConfirmed] = useState(false);

    const [formData, setFormData] = useState<User & { confirmPassword?: string }>({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        roleId: '',
        cellPhone: '',
        address: ''
    });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                const formattedRoles = data.map((role: any) => ({
                    label: role.name,
                    value: role.id
                }));
                setRoles(formattedRoles);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const selecttCountry = [
        { label: 'Selecciona Pais', value: '' },
        { label: 'Dominican Republic', value: 'Dominican Republic' },
        { label: 'Colombia', value: 'colombia' }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const goHome = () => {
        router.push('/');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            AxiosToastError({ message: 'Passwords do not match' }, toast);
            return;
        }

        try {
            const { confirmPassword, ...userData } = formData;

            const response = await registerUser(userData);
            if (response.status === 200) {
                router.push('/auth/login');
            }
            setFormData({
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                roleId: '',
                cellPhone: ''
            });
        } catch (error) {
            AxiosToastError(error, toast);
        }
    };

    return (
        <div
            className={classNames('login-body flex min-h-screen', {
                'layout-light': layoutConfig.colorScheme === 'light',
                'layout-dark': layoutConfig.colorScheme === 'dark'
            })}
        >
            <div
                className="w-full bg-cover bg-center h-full p-2 sm:p-0"
                style={{
                    backgroundImage: `url(/layout/images/pages/register-${layoutConfig.colorScheme === 'dark' ? 'ondark' : 'onlight'}.png)`
                }}
            >
                <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-8">
                    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white/70 dark:bg-gray-700/70 p-3 sm:px-6 sm:py-3 rounded-2xl shadow-lg flex flex-col items-center">
                        <div className="relative w-full">
                            <Button className="absolute left-2 top-2 bg-transparent text-primary border-none" icon="pi pi-home" data-pr-tooltip="Home" data-pr-position="right" pt={{ icon: { style: { fontSize: '1.5rem' } } }} onClick={goHome} />
                            <Tooltip target=".absolute.left-2" />
                        </div>

                        <div className="text-center mt-2 mb-3">
                            <p className="text-3xl font-bold italic text-[#0bd18a]">CARS-DR</p>
                        </div>

                        <div className="w-full text-left">
                            <h4 className="text-xl font-semibold text-[#0bd18a] mb-2">Register</h4>
                            <p className={`mb-4 text-sm ${layoutConfig.colorScheme === 'dark' ? 'text-white' : 'text-gray-200'}`}>Let’s get started</p>

                            {/* Fields Section */}
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <span className="p-input-icon-left w-full">
                                        <i className="pi pi-user text-primary"></i>
                                        <InputText name="firstname" placeholder="Firstname" value={formData.firstname} onChange={handleChange} className="w-full bg-gray-100" />
                                    </span>
                                    <span className="p-input-icon-left w-full">
                                        <i className="pi pi-user text-primary"></i>
                                        <InputText name="lastname" placeholder="Lastname" value={formData.lastname} onChange={handleChange} className="w-full bg-gray-100" />
                                    </span>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <span className="p-input-icon-left w-full">
                                        <Dropdown options={selecttCountry} placeholder="Seleccione Pais" value={selectCountry} onChange={(e) => setSelectCountrye(e.value)} className="w-full bg-gray-100" />
                                    </span>
                                    <span className="p-input-icon-left w-full">
                                        <Dropdown
                                            options={roles}
                                            placeholder="Seleccione Rol"
                                            value={formData.roleId}
                                            onChange={(e) => {
                                                const selectedRole = roles.find((role: any) => role.value === e.value);
                                                setFormData({ ...formData, roleId: e.value });
                                                setSelectedUserType(selectedRole?.label || null);
                                            }}
                                            className="w-full bg-gray-100"
                                        />
                                    </span>
                                </div>

                                <div className="w-full px-2">
                                    <UserExtraFields userType={selectedUserType} formData={formData} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="mt-3 text-sm  px-4">
                                <Checkbox type="checkbox" id="confirmed" checked={confirmed} onChange={() => setConfirmed(!confirmed)} className="mr-2" />
                                <label className={`font-medium mr-2 ${layoutConfig.colorScheme === 'dark' ? 'text-white' : 'text-gray-200'}`}>I have read the</label>
                                <a className={`hover:text-primary cursor-pointer underline ${layoutConfig.colorScheme === 'dark' ? 'text-white' : 'text-gray-200'}`}>Terms and Conditions</a>
                            </div>

                            <div className="mt-4 px-6">
                                <Button onClick={handleSubmit} label="Submit" className="w-full" />
                            </div>

                            <p className={`mt-2 text-sm text-center ${layoutConfig.colorScheme === 'dark' ? 'text-white' : 'text-gray-200'}`}>
                                Already have an account?
                                <Link href="/auth/login" className="ml-1 text-primary font-medium hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4 text-sm text-primary text-center">
                            <span className="mr-2">CARSDR</span> &copy; 2025
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
