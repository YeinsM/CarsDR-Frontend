'use client';
import React, { useState, useContext } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import type { Page } from '@/types';
import { Tooltip } from 'primereact/tooltip';
import { InputNumber } from 'primereact/inputnumber';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';

const Verification: Page = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);
    const [value4, setValue4] = useState(null);
    const [value5, setValue5] = useState(null);
    const [value6, setValue6] = useState(null);
    const [verify, setVerify] = useState(false);

    const goHome = () => {
        router.push('/page/home');
    };

    const focus = (event: React.KeyboardEvent) => {
        const regexNum = /^\d+$/;
        const isValid = regexNum.test(event.key);
        const nextElementInputRef = event.currentTarget.nextElementSibling?.children[0];
        if (isValid && nextElementInputRef) {
            (nextElementInputRef as HTMLElement).focus();
        }
    };

    return (
        <div
            className={classNames(
                'login-body flex min-h-screen',
                {
                    'layout-light': layoutConfig.colorScheme === 'light',
                    'layout-dark': layoutConfig.colorScheme === 'dark'
                }
            )}
        >
            {/* Imagen de verificación para escritorio */}
            <div className="login-image w-full h-screen hidden md:block">
                <img
                    src={`/layout/images/pages/verification-${layoutConfig.colorScheme === 'dark' ? 'ondark' : 'onlight'}.png`}
                    alt="car"
                    className="w-full h-screen object-cover"
                />
            </div>
            {/* Contenedor principal del formulario */}
            <div className="w-full max-w-xl" style={{ background: 'var(--surface-ground)' }}>
                <div
                    className="p-fluid relative flex flex-col min-h-screen text-center w-full bg-no-repeat"
                    style={{
                        padding: '20% 10% 20% 10%',
                        background: 'var(--exception-pages-image)'
                    }}
                >
                    <div className="flex flex-col">
                        {/* Header con botón de home y logo */}
                        <div className="flex flex-col gap-4 items-center justify-between  px-4 py-2 rounded-t-md">
                            <div className="w-full select-none">
                                <Button
                                    className="p-2"
                                    style={{ width: '50px', height: '30px' }}
                                    icon="pi pi-home"
                                    data-pr-tooltip="Home"
                                    data-pr-position="right"
                                    pt={{ icon: { style: { fontSize: '1.2rem' } } }}
                                    onClick={goHome}
                                />
                                <Tooltip target=".absolute.left-4" />
                            </div>
                            <div className='w-full'>
                                <p className="text-3xl" style={{ color: '#0bd18a' }}>
                                    CARS-DR
                                </p>
                            </div>

                        </div>

                        {/* Formulario de verificación */}
                        <div
                            className="form-container text-left mx-auto max-w-[320px] min-w-[270px] mt-5 p-2"
                        >
                            <h4 className="text-900 font-bold mb-4">Verification</h4>
                            <span className="text-600 font-medium">We have sent code to your email:</span>
                            <div className="flex items-center mt-2 mb-4 py-1 px-2">
                                <i className="pi pi-envelope text-600"></i>
                                <span className="text-900 font-bold ml-2">dm**@gmail.com</span>
                            </div>
                            <div className="flex justify-between items-center gap-3">
                                <InputNumber
                                    inputId="val1"
                                    value={value1}
                                    onInput={(e) => setValue1(e.target)}
                                    inputClassName="w-12 text-center text-primary"
                                    maxLength={1}
                                    max={9}
                                    onKeyUp={focus}
                                />
                                <InputNumber
                                    inputId="val2"
                                    value={value2}
                                    onInput={(e) => setValue2(e.target)}
                                    inputClassName="w-12 text-center text-primary"
                                    maxLength={1}
                                    max={9}
                                    onKeyUp={focus}
                                />
                                <InputNumber
                                    inputId="val3"
                                    value={value3}
                                    onInput={(e) => setValue3(e.target)}
                                    inputClassName="w-12 text-center text-primary"
                                    maxLength={1}
                                    max={9}
                                    onKeyUp={focus}
                                />
                                <InputNumber
                                    inputId="val4"
                                    value={value4}
                                    onInput={(e) => setValue4(e.target)}
                                    inputClassName="w-12 text-center text-primary"
                                    maxLength={1}
                                    max={9}
                                />
                                <InputNumber
                                    inputId="val5"
                                    value={value5}
                                    onInput={(e) => setValue5(e.target)}
                                    inputClassName="w-12 text-center text-primary"
                                    maxLength={1}
                                    max={9}
                                />
                                <InputNumber
                                    inputId="val6"
                                    value={value6}
                                    onInput={(e) => setValue6(e.target)}
                                    inputClassName="w-12 text-center text-primary"
                                    max={9}
                                    maxLength={1}
                                />
                            </div>
                        </div>

                        {/* Botones */}
                        <div
                            className="button-container mt-5 text-left mx-auto w-full max-w-[320px] min-w-[300px]"
                        >
                            <div className="buttons flex items-center gap-3">
                                <Button
                                    onClick={goHome}
                                    className="block p-button-danger p-button-outlined"
                                    style={{ maxWidth: '320px', marginBottom: '32px' }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => setVerify(true)}
                                    className="block"
                                    style={{ maxWidth: '320px', marginBottom: '32px' }}
                                >
                                    Verify
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Footer sin posición absoluta */}
                    <div className="login-footer flex items-center justify-center mt-auto py-4">
                        <div className="flex items-center pr-4 mr-4 border-r border-gray-300">
                            <img
                                src="/layout/images/logo/logo-gray.png"
                                className="login-footer-logo"
                                style={{ width: '22px' }}
                                alt="logo"
                            />
                            <img
                                src="/layout/images/logo/appname-gray.png"
                                className="login-footer-appname ml-2"
                                style={{ width: '45px' }}
                                alt="appname"
                            />
                        </div>
                        <span className="text-sm mr-3 text-primary font-bold">&copy; Copyright 2025</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;
