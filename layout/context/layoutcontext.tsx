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

    const onMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    };

    const hideOverlayMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false
        }));
    };

    const toggleSearch = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            searchBarActive: !layoutState.searchBarActive
        }));
    };

    const onSearchHide = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            searchBarActive: false
        }));
    };

    const showRightSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            rightMenuActive: true
        }));
        hideOverlayMenu();
    };

    const showConfigSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            configSidebarVisible: true
        }));
    };
    const showSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            rightMenuVisible: true
        }));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isSlim = () => {
        return layoutConfig.menuMode === 'slim';
    };

    const isSlimPlus = () => {
        return layoutConfig.menuMode === 'slim-plus';
    };

    const isHorizontal = () => {
        return layoutConfig.menuMode === 'horizontal';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value = {
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
        <LayoutContext.Provider value={value}>{props.children}</LayoutContext.Provider>
    );
};
