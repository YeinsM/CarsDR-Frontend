'use client';

import Head from 'next/head';
import { Breadcrumb, LayoutConfig, LayoutContextProps, LayoutConfigContextProps, SidebarContextProps, BreadcrumbContextProps } from '../../types/layout';
import React, { useState, useCallback } from 'react';
import { ChildContainerProps } from '@/types';

export const LayoutContext = React.createContext({} as LayoutContextProps);
export const LayoutConfigContext = React.createContext({} as LayoutConfigContextProps);
export const SidebarContext = React.createContext({} as SidebarContextProps);
export const BreadcrumbContext = React.createContext({} as BreadcrumbContextProps);

export const LayoutProvider = (props: ChildContainerProps) => {
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
        ripple: true,
        inputStyle: 'outlined',
        menuMode: 'slim-plus',
        colorScheme: 'light',
        theme: 'magenta',
        scale: 14
    });

    const [layoutState, setLayoutState] = useState({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        overlaySubmenuActive: false,
        rightMenuVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        searchBarActive: false,
        resetMenu: false,
        sidebarActive: false,
        anchored: false,
        rightMenuActive: false
    });


    const hideOverlayMenu = useCallback(() => {

        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false
        }));
    }, []);


    const toggleSearch = useCallback(() => {

        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            searchBarActive: !prevLayoutState.searchBarActive
        }));
    }, [layoutState.searchBarActive]);


    const onSearchHide = useCallback(() => {

        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            searchBarActive: false
        }));
    }, []);


    const showRightSidebar = useCallback(() => {

        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            rightMenuActive: true
        }));
        hideOverlayMenu();
    }, [hideOverlayMenu]);


    const showConfigSidebar = useCallback(() => {

        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            configSidebarVisible: true
        }));
    }, []);

    const showSidebar = useCallback(() => {

        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            rightMenuVisible: true
        }));
    }, []);


    const isOverlay = useCallback(() => {
        return layoutConfig.menuMode === 'overlay';
    }, [layoutConfig.menuMode]);

    const isSlim = useCallback(() => {
        return layoutConfig.menuMode === 'slim';
    }, [layoutConfig.menuMode]);

    const isSlimPlus = useCallback(() => {
        return layoutConfig.menuMode === 'slim-plus';
    }, [layoutConfig.menuMode]);

    const isHorizontal = useCallback(() => {
        return layoutConfig.menuMode === 'horizontal';
    }, [layoutConfig.menuMode]);

    const isDesktop = useCallback(() => {
        return window.innerWidth > 991;
    }, [])

    const onMenuToggle = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                overlayMenuActive: !prevLayoutState.overlayMenuActive
            }));
        }
        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive
            }));
        } else {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive
            }));

            event.preventDefault();
        }
    }, [isOverlay, isDesktop]);

    const layoutConfigValue: LayoutConfigContextProps = {
        layoutConfig,
        setLayoutConfig,
        isSlim,
        isSlimPlus,
        isHorizontal,
        isDesktop
    };

    const sidebarValue: SidebarContextProps = {
        layoutState,
        setLayoutState,
        showRightSidebar,
        onMenuToggle,
        onSearchHide,
        toggleSearch,
        showConfigSidebar,
        showSidebar
    };

    const breadcrumbValue: BreadcrumbContextProps = {
        breadcrumbs,
        setBreadcrumbs
    };

    const contextValue: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        isSlim,
        isSlimPlus,
        isHorizontal,
        isDesktop,
        onMenuToggle,
        toggleSearch,
        onSearchHide,
        showRightSidebar,
        breadcrumbs,
        setBreadcrumbs,
        showConfigSidebar,
        showSidebar
    };

    return (
        <LayoutConfigContext.Provider value={layoutConfigValue}>
            <SidebarContext.Provider value={sidebarValue}>
                <BreadcrumbContext.Provider value={breadcrumbValue}>
                    <LayoutContext.Provider value={contextValue}>
                        <>
                            <Head>
                                <title>PrimeReact - DIAMOND</title>
                                <meta charSet="UTF-8" />
                                <meta name="description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
                                <meta name="robots" content="index, follow" />
                                <meta name="viewport" content="initial-scale=1, width=device-width" />
                                <meta property="og:type" content="website"></meta>
                                <meta property="og:title" content="Diamond by PrimeReact for NextJS"></meta>
                                <meta property="og:url" content="https://diamond.primereact.org"></meta>
                                <meta property="og:description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
                                <meta property="og:image" content="https://www.primefaces.org/static/social/diamond-react.png"></meta>
                                <meta property="og:ttl" content="604800"></meta>
                                <link rel="icon" href={`/favicon.ico`} type="image/x-icon"></link>
                            </Head>
                            {props.children}
                        </>
                    </LayoutContext.Provider>
                </BreadcrumbContext.Provider>
            </SidebarContext.Provider>
        </LayoutConfigContext.Provider>
    );
};
