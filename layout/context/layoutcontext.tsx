'use client';

import Head from 'next/head';
import React, { useState, useMemo, useCallback } from 'react';
import { Breadcrumb, LayoutConfig, LayoutContextProps } from '../../types/layout';
import { ChildContainerProps } from '@/types';

export const LayoutContext = React.createContext({} as LayoutContextProps);

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
    }, []);

    const value = useMemo(

        () => ({
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
        }),
        [
            layoutConfig,
            layoutState,
            breadcrumbs,

            isSlim,
            isSlimPlus,
            isHorizontal,
            isDesktop,
            onMenuToggle,
            toggleSearch,
            onSearchHide,
            showRightSidebar,

            showConfigSidebar,
            showSidebar
        ]
    );

    return (
        <LayoutContext.Provider value={value}>{props.children}</LayoutContext.Provider>
    );
};
