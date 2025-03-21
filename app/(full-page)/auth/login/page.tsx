'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Page } from '../../../../types/layout';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';

const Login: Page = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    return (
        <React.Fragment>
            <div
                className={classNames('login-body', 'flex', 'min-h-screen', {
                    'layout-light': layoutConfig.colorScheme === 'light',
                    'layout-dark': layoutConfig.colorScheme === 'dark'
                })}
            >
                {' '}
                {/* image container */}
                {/* <div className="login-image w-full hidden h-screen md:block">
                    <img src={`/layout/images/pages/login-${layoutConfig.colorScheme === 'dark' ? 'ondark' : 'onlight'}.png`} alt="atlantis" className="h-screen w-full" />
                </div> */}
                {/* form container */}
                <div
                    className="login-panel w-full  md:block"
                    style={{
                        backgroundImage: `url(/layout/images/pages/login-${layoutConfig.colorScheme === 'dark' ? 'ondark' : 'onlight'}.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div
                        className="p-fluid min-h-screen text-center
                          flex align-items-center md:align-items-center px-2 py-3
                          justify-content-center m-auto flex-column"
                    >
                        <div
                            className="flex flex-column w-full justify-content-center align-items-center px-3 py-3 lg:px-5 lg:py-5"
                            style={{ borderRadius: '14px', backgroundColor: layoutConfig.colorScheme === 'dark' ? 'rgba(107, 114, 128, 0.30)' : 'rgba(107, 114, 128, 0.80)', maxWidth: '370px' }}
                        >
                            <div className="flex align-items-center mb-5 logo-container ">
                                <p className="text-3xl font-italic mr-3 font-bold" style={{ color: '#0bd18a' }}>
                                    CARS-DR
                                </p>
                            </div>

                            <div className="form-container">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-envelope text-primary"></i>
                                    <InputText type="text" placeholder="Email" className={`block mb-4 ${layoutConfig.colorScheme === 'dark' ? '' : 'bg-gray-200'}`} style={{ maxWidth: '340px', minWidth: '270px' }} />
                                </span>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-key text-primary"></i>
                                    <InputText type="password" placeholder="Password" className={`block mb-3 ${layoutConfig.colorScheme === 'dark' ? '' : 'bg-gray-200'}`} style={{ maxWidth: '320px', minWidth: '270px' }} />
                                </span>
                                <a href="/auth/forgotpassword" className="flex mb-4 text-sm font-semibold text-gray-50 hover:text-primary">
                                    Forgot your password?
                                </a>
                            </div>
                            <div className="button-container">
                                <Button
                                    type="button"
                                    onClick={() => router.push('/')}
                                    outlined
                                    className={`block font-bold hover:bg-primary
                                     line-height-2 
                                     hover:text-white white-space-nowrap
                                     text-white
                                    `}
                                    style={{ maxWidth: '320px', marginBottom: '20px' }}
                                >
                                    Login
                                </Button>

                                <span className={`flex text-sm mb-1 ${layoutConfig.colorScheme === 'dark' ? '' : 'text-white'}`}>
                                    Don’t have an account?
                                    <a className="cursor-pointer ml-1 text-white hover:text-primary" href="/auth/register">
                                        Sign-up here
                                    </a>
                                </span>
                            </div>

                            <div className="login-footer flex align-items-center text-white mt-2" style={{ bottom: '75px' }}>
                                <div className="flex align-items-center login-footer-logo-container pr-4 mr-4 border-right-1 surface-border">
                                    <p className="text-sm text-primary font-bold mr-3 ">CARSDR</p>
                                </div>

                                <span className="text-sm mr-3 text-primary font-bold">&copy; Copyright 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
