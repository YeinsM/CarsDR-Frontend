'use client';

import React, { useState, useContext } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import type { Page } from '@/types';
import { Tooltip } from 'primereact/tooltip';
import { InputNumber } from 'primereact/inputnumber';
import { LayoutConfigContext } from '../../../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';

const Verification: Page = () => {
    const { layoutConfig } = useContext(LayoutConfigContext);
    const router = useRouter();

    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);
    const [value4, setValue4] = useState(null);
    const [value5, setValue5] = useState(null);
    const [value6, setValue6] = useState(null);
    const [verify, setVerify] = useState(false);

    const goHome = () => {
        router.push('/pages/home');
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
            className={classNames('flex flex-col md:flex-row min-h-screen', {
                'layout-light': layoutConfig.colorScheme === 'light',
                'layout-dark': layoutConfig.colorScheme === 'dark'
            })}
        >
            {/* Imagen visible solo en pantallas medianas en adelante */}
            <div className="hidden md:block w-full h-64 md:h-auto">
                <img src={`/layout/images/pages/verification-${layoutConfig.colorScheme === 'dark' ? 'ondark' : 'onlight'}.png`} alt="verification" className="w-full h-full object-cover" />
            </div>

            {/* Contenedor del formulario */}
            <div
                className="w-full h-screen md:max-w-xl flex flex-col justify-center bg-no-repeat"
                style={{
                    background: 'var(--exception-pages-image)'
                }}
            >
                <div className="px-4 sm:px-8 py-3 sm:py-10 flex flex-col items-center text-center h-full justify-center">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-4 w-full">
                        <Button className="p-button-text" icon="pi pi-home" onClick={goHome} tooltip="Home" tooltipOptions={{ position: 'right' }} pt={{ icon: { className: 'text-4xl' } }} />
                        <p className="text-3xl font-bold text-emerald-500">CARS-DR</p>
                    </div>

                    {/* Formulario de verificación */}
                    <div className="w-full max-w-sm text-left space-y-6 mt-5">
                        <div className="">
                            <h4 className="text-gray-900 dark:text-white font-bold text-2xl mb-4">Verification</h4>
                            <p className="text-gray-500 text-lg">We have sent a code to your email:</p>
                            <div className="flex items-center mt-3 text-lg">
                                <i className="pi pi-envelope text-gray-500 mr-2"></i>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">dm**@gmail.com</span>
                            </div>
                        </div>

                        {/* Inputs de código */}
                        <div className="flex w-full justify-center gap-2 flex-wrap">
                            {[value1, value2, value3, value4, value5, value6].map((value, index) => (
                                <InputNumber
                                    key={index}
                                    inputId={`val${index + 1}`}
                                    value={value}
                                    onInput={(e) => {
                                        const setters = [setValue1, setValue2, setValue3, setValue4, setValue5, setValue6];
                                        setters[index](e.target);
                                    }}
                                    onKeyUp={focus}
                                    inputClassName="w-full max-w-11 sm:max-w-14 text-center text-xl text-primary "
                                    maxLength={1}
                                    max={9}
                                />
                            ))}
                        </div>

                        {/* Botones */}
                        <div className="flex sm:flex-row gap-4 mt-6">
                            <Button onClick={goHome} label="Cancel" className="p-button-danger p-button-outlined w-full text-xl" />

                            <Button onClick={() => setVerify(true)} label="Verify" className="hover:bg-primary p-button-outlined  w-full text-xl" />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 sm:mt-7 sm:pt-7 pt-4 w-full border-t border-gray-100">
                        <div className="flex flex-row sm:flex-row items-center justify-center gap-4">
                            <div className="w-40 h-12 flex justify-center items-center bg-blue-200 rounded-md text-blue-700 font-bold">logo</div>
                            <span className="text-lg text-primary font-semibold flex items-center gap-1">
                                &copy; <span className="hidden sm:inline">Copyright</span> 2025
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;
