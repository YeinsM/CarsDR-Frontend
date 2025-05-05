'use client';

import React, { useContext, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { Checkbox } from 'primereact/checkbox';
import { Page } from '../../../../types/layout';
import { classNames } from 'primereact/utils';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { Tooltip } from 'primereact/tooltip';
import axios from "axios";
import Link from 'next/link';
import { promises } from 'dns';
import { registerUser } from '@/app/core/services/user.service';
import { User } from '@/app/core/models/user.model';

const Register: Page = () => {
    //const [confirmed, setConfirmed] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();
    const api = axios.create({
        baseURL: 'http://44.208.165.188:1000/api',
        headers: {
            'Content-Type': 'application/json'
        }
    })


    const [formData, setFormData] = useState<User>({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    const goHome = () => {
        router.push('/');
    };

    const handleSubmit = async () => {
        try {
            await registerUser(formData)
            router.push('/auth/login')
        } catch (error) {
            console.log('error', error)
        }

    }



    return (
        <>
            <div
                className={classNames('login-body', 'flex', 'min-h-screen', {
                    'layout-light': layoutConfig.colorScheme === 'light',
                    'layout-dark': layoutConfig.colorScheme === 'dark'
                })}
            >
                {/* <div className="login-image w-6 h-screen hidden md:block" style={{ maxWidth: '490px' }}>
                    <img src={`/layout/images/pages/register-${layoutConfig.colorScheme === 'dark' ? 'ondark' : 'onlight'}.png`} alt="atlantis" className="h-screen w-full" />
                </div> */}

                <div
                    className="w-full"
                    style={{
                        backgroundImage: `url(/layout/images/pages/register-${layoutConfig.colorScheme === 'dark' ? 'ondark' : 'onlight'}.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div
                        className={classNames(
                            'p-fluid',
                            'min-h-screen',
                            'bg-auto',
                            'md:bg-contain',
                            'bg-no-repeat',
                            'text-center',
                            'w-full',
                            'flex',
                            'align-items-center',
                            'md:align-items-center',
                            'justify-content-center',
                            'flex-column',
                            'bg-auto',
                            'md:bg-contain',
                            'bg-no-repeat',
                            'px-2'
                        )}
                    >
                        <div
                            className="flex flex-column py-2 sm:max-w-22rem md:max-w-26rem px-2 lg:px-3 lg:py-3 w-full lg:max-w-29rem align-items-center justify-content-center"
                            style={{
                                borderRadius: '14px',
                                backgroundColor: layoutConfig.colorScheme === 'dark' ? 'rgba(107, 114, 128, 0.60)' : 'rgba(107, 114, 128, 0.40)'
                            }}
                        >
                            <div className="relative w-full" style={{ userSelect: 'none' }}>
                                <Button
                                    className="absolute left-4 text-primary top-1/2 transform -translate-y-1/2 flex align-items-center justify-content-center bg-transparent border-none"
                                    style={{ width: '30px', height: '30px' }}
                                    icon="pi pi-home"
                                    data-pr-tooltip="Home"
                                    data-pr-position="right"
                                    pt={{ icon: { style: { fontSize: '1.5rem' } } }}
                                    onClick={goHome}
                                ></Button>

                                <Tooltip target=".absolute.left-4" />
                            </div>

                            {/* Logo */}
                            <div className="flex align-items-center gap-4 my-3 logo-container">
                                <p className="text-3xl font-italic mr-3 font-bold w-full text-center" style={{ color: '#0bd18a' }}>
                                    CARS-DR
                                </p>
                            </div>

                            <div className="form-container text-left sm:max-w-20rem">
                                <h4 className="m-0 mb-2" style={{ color: '#0bd18a' }}>
                                    Register
                                </h4>
                                <span className={`block font-medium mb-4 ${layoutConfig.colorScheme === 'dark' ? '' : 'text-50'}`}>Let’s get started</span>
                                {/* Inputs */}
                                <span className="p-input-icon-left">
                                    <i className="pi pi-user text-primary"></i>
                                    <InputText
                                        type="text"
                                        autoComplete="off"
                                        required
                                        placeholder="firstname"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className={`block mb-3 text-white ${layoutConfig.colorScheme === 'dark' ? 'bg-gray-700' : 'bg-gray-700'}`}
                                        style={{ width: '100%', maxWidth: '320px', minWidth: '270px' }}

                                    />
                                </span>

                                <span className="p-input-icon-left">
                                    <i className="pi pi-user text-primary"></i>
                                    <InputText
                                        type="text"
                                        autoComplete="off"
                                        required
                                        placeholder="lastname"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className={`block mb-3 text-white ${layoutConfig.colorScheme === 'dark' ? 'bg-gray-700' : 'bg-gray-700'}`}
                                        style={{ width: '100%', maxWidth: '320px', minWidth: '270px' }}
                                    />
                                </span>

                                <span className="p-input-icon-left">
                                    <i className="pi pi-user text-primary"></i>
                                    <InputText
                                        type="text"
                                        autoComplete="off"
                                        required
                                        placeholder="Username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className={`block mb-3 text-white ${layoutConfig.colorScheme === 'dark' ? 'bg-gray-700' : 'bg-gray-700'}`}
                                        style={{ width: '100%', maxWidth: '320px', minWidth: '270px' }}
                                    />
                                </span>

                                <span className="p-input-icon-left">
                                    <i className="pi pi-envelope text-primary"></i>
                                    <InputText
                                        type="email"
                                        autoComplete="off"
                                        required
                                        placeholder="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`block mb-3 text-white ${layoutConfig.colorScheme === 'dark' ? 'bg-gray-700' : 'bg-gray-700'}`}
                                        style={{ width: '100%', maxWidth: '320px', minWidth: '270px' }}
                                    />
                                </span>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-key text-primary"></i>
                                    <InputText
                                        type="password"
                                        autoComplete="off"
                                        required
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`block mb-3 text-white ${layoutConfig.colorScheme === 'dark' ? 'bg-gray-700' : 'bg-gray-700'}`}
                                        style={{ width: '100%', maxWidth: '320px', minWidth: '270px' }}
                                    />
                                </span>
                                <div className="mt-2 flex flex-wrap text-sm">
                                    {/* <Checkbox type="checkbox" id="confirmed" checked={'confirmed'} onChange={() => setConfirmed(!confirmed)} className="mr-2" />{' '} */}
                                    <label htmlFor="confirmed" className={`font-medium mr-2 ${layoutConfig.colorScheme === 'dark' ? '' : 'text-50 '}`}>
                                        I have read the
                                    </label>
                                    <a className={`hover:text-primary cursor-pointer ${layoutConfig.colorScheme === 'dark' ? '' : 'text-50'}`}>Terms and Conditions</a>
                                </div>
                            </div>
                            <div className="button-container mt-3 text-left" style={{ width: '100%', maxWidth: '320px', minWidth: '270px' }}>
                                <div className="buttons flex align-items-center justify-content-center gap-3 w-full">
                                    <Button
                                        onClick={handleSubmit}
                                        type="button" className="block w-full"
                                        style={{ maxWidth: '270px', marginBottom: '20px', minWidth: '270px' }}>
                                        Submit
                                    </Button>
                                </div>
                                <span className={`font-medium text-sm flex align-items-center justify-content-center gap-1 ${layoutConfig.colorScheme === 'dark' ? '' : 'text-50'}`}>
                                    Already have an account?{' '}
                                    <Link href="/auth/login" className={`${layoutConfig.colorScheme === 'dark' ? 'text-white' : 'text-50'} font-semibold cursor-pointer hover:text-primary transition-colors transition-duration-300 `}>
                                        Login
                                    </Link>
                                </span>
                            </div>

                            <div className="login-footer flex align-items-center mt-2">
                                <div className="flex align-items-center login-footer-logo-container pr-4 mr-4 border-right-1 border-primary">
                                    <p className="text-sm text-primary mr-3">CARSDR</p>
                                </div>
                                <span className="text-sm text-primary mr-3">&copy; Copyright 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
