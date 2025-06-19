'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useCallback } from 'react';
import AppMenu from './AppMenu';
import { LayoutConfigContext, SidebarContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { classNames } from 'primereact/utils';

const AppSidebar = (props: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
    const { layoutConfig } = useContext(LayoutConfigContext);
    const { setLayoutState, layoutState } = useContext(SidebarContext);
    const anchor = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            anchored: !prevLayoutState.anchored
        }));
    };

    const resetOverlay = useCallback(() => {
        if (layoutState.overlayMenuActive) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                overlayMenuActive: false
            }));
        }
    }, [layoutState.overlayMenuActive, setLayoutState]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            resetOverlay();
        };
    }, [resetOverlay]);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onMouseEnter = () => {
        if (!layoutState.anchored) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                sidebarActive: true
            }));
        }
    };

    const onMouseLeave = () => {
        if (!layoutState.anchored) {
            if (!timeoutRef.current) {
                timeoutRef.current = window.setTimeout(
                    () =>
                        setLayoutState((prevLayoutState) => ({
                            ...prevLayoutState,
                            sidebarActive: false
                        })),
                    300
                ) as unknown as ReturnType<typeof setTimeout>;
            }
        }
    };

    return (
        <>
            <div ref={props.sidebarRef} className="layout-sidebar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <div className="sidebar-header">
                    <Link href="/" className="app-logo">
                        <div className="app-logo-small h-2rem">
                            <Image
                                src={`/layout/images/logo/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'light'}.png`}
                                alt="Logo"
                                width={layoutConfig.colorScheme === 'light' ? 113 : 146}
                                height={layoutConfig.colorScheme === 'light' ? 103 : 133}
                            />
                        </div>
                        <div className="app-logo-normal">
                            <Image
                                className="h-2rem"
                                src={`/layout/images/logo/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'light'}.png`}
                                alt="logo"
                                width={layoutConfig.colorScheme === 'light' ? 113 : 146}
                                height={layoutConfig.colorScheme === 'light' ? 103 : 133}
                            />
                            <Image
                                className="h-2rem ml-3"
                                src={`/layout/images/logo/appname-${layoutConfig.colorScheme === 'light' ? 'dark' : 'light'}.png`}
                                alt="App Name Logo"
                                width={layoutConfig.colorScheme === 'light' ? 235 : 304}
                                height={layoutConfig.colorScheme === 'light' ? 47 : 60}
                            />
                        </div>
                    </Link>
                    <button className="layout-sidebar-anchor p-link z-2" type="button" onClick={anchor}></button>
                </div>
                <div className="layout-menu-container">
                    <MenuProvider>
                        <AppMenu />
                    </MenuProvider>
                </div>
            </div>
        </>
    );
};

export default AppSidebar;
