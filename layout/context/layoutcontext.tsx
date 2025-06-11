'use client';

import React, { useState } from 'react';
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

    const onMenuToggle = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
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

    const hideOverlayMenu = React.useCallback(() => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false
        }));
    }, []);

    const toggleSearch = React.useCallback(() => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            searchBarActive: !prevLayoutState.searchBarActive
        }));
    }, [layoutState.searchBarActive]);

    const onSearchHide = React.useCallback(() => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            searchBarActive: false
        }));
    }, []);

    const showRightSidebar = React.useCallback(() => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            rightMenuActive: true
        }));
        hideOverlayMenu();
    }, [hideOverlayMenu]);

    const showConfigSidebar = React.useCallback(() => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            configSidebarVisible: true
        }));
    }, []);
    const showSidebar = React.useCallback(() => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            rightMenuVisible: true
        }));
    }, []);

    const isOverlay = React.useCallback(() => {
        return layoutConfig.menuMode === 'overlay';
    }, [layoutConfig.menuMode]);

    const isSlim = React.useCallback(() => {
        return layoutConfig.menuMode === 'slim';
    }, [layoutConfig.menuMode]);

    const isSlimPlus = React.useCallback(() => {
        return layoutConfig.menuMode === 'slim-plus';
    }, [layoutConfig.menuMode]);

    const isHorizontal = React.useCallback(() => {
        return layoutConfig.menuMode === 'horizontal';
    }, [layoutConfig.menuMode]);

    const isDesktop = React.useCallback(() => {
        return window.innerWidth > 991;
    }, []);

    const value = React.useMemo(
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
        ]
    );

    return (
        <LayoutContext.Provider value={value}>{props.children}</LayoutContext.Provider>
    );
};
