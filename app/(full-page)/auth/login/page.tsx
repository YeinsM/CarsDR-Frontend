'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Page } from '../../../../types/layout';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import { Tooltip } from 'primereact/tooltip';
import Link from 'next/link';
import { User } from '@/app/core/models/user.model';
import { loginUser } from '@/app/core/services/user.service';
import { AxiosToastError } from '@/app/api/Api';

const Login: Page = () => {
    const toast = useRef(null);
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();
    const [credencials, setCredencials] = useState<User>({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredencials({
            ...credencials,
            [name]: value
        });
    };

    const goHome = () => {
        router.push('/');
    };

    const handleSubmit = async () => {
        try {
            const login = await loginUser(credencials);
            if (login.status === 200) {
                toast.current.show({ severity: 'success', summary: 'Session iniciada satisfactoriamente!', life: 3000 });
            }
            router.push('/');
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
                    backgroundImage: `url(/layout/images/pages/login-${layoutConfig.colorScheme === 'dark' ? 'ondark' : 'onlight'}.png)`
                }}
            >
                <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md sm:max-w-md bg-white/70 dark:bg-gray-700/70 p-3 sm:px-5 sm:py-3 rounded-2xl shadow-lg flex flex-col items-center">
                        <div className="relative w-full">
                            <Button className="absolute left-2 top-2 bg-transparent text-primary border-none" icon="pi pi-home" data-pr-tooltip="Home" data-pr-position="right" pt={{ icon: { style: { fontSize: '1.5rem' } } }} onClick={goHome} />
                            <Tooltip target=".absolute.left-2" />
                        </div>

                        <div className="text-center mt-2 mb-3">
                            <p className="text-3xl font-bold italic text-[#0bd18a]">CARS-DR</p>
                        </div>

                        <div className="w-full text-left px-2">
                            <h4 className="text-xl font-semibold text-[#0bd18a] mb-2">Login</h4>
                            <p className={`mb-4 text-sm ${layoutConfig.colorScheme === 'dark' ? 'text-white' : 'text-gray-200'}`}>Let’s get started</p>

                            {/* Fields Section */}
                            <div className="space-y-4 px-2">
                                <div className="flex flex-col gap-4">
                                    <span className="p-input-icon-left w-full">
                                        <i className="pi pi-user text-primary"></i>
                                        <InputText name="email" placeholder="Email or Username" value={credencials.email} onChange={handleChange} className="w-full bg-gray-100" />
                                    </span>
                                    <span className="p-input-icon-left w-full">
                                        <i className="pi pi-key text-primary"></i>
                                        <InputText type="password" name="password" placeholder="Password" value={credencials.password} onChange={handleChange} className="w-full bg-gray-100" />
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 px-4">
                                <Button onClick={handleSubmit} label="Submit" type="button" className="w-full" />
                            </div>

                            <p className={`mt-2 text-sm text-center ${layoutConfig.colorScheme === 'dark' ? 'text-white' : 'text-gray-200'}`}>
                                Don’t have an account?
                                <Link href="/auth/login" className="ml-2 text-primary font-medium hover:underline">
                                    Sign-up here
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

export default Login;
