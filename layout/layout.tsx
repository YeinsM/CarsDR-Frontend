'use client';
import React, { useCallback, useEffect, useRef, useContext, lazy, Suspense } from 'react';
import { classNames, DomHandler } from 'primereact/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { LayoutConfigContext, SidebarContext } from './context/layoutcontext';
import { useEventListener, useMountEffect, useResizeListener, useUnmountEffect } from 'primereact/hooks';
import AppTopbar from './AppTopbar';
import { PrimeReactContext } from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import { ChildContainerProps } from '@/types';
import AppBreadCrumb from './AppBreadCrumb';
const AppProfileMenu = lazy(() => import('./AppProfileMenu'));
const AppConfig = lazy(() => import('./AppConfig'));


const Layout = (props: ChildContainerProps) => {
    const { layoutConfig, isSlim, isSlimPlus, isHorizontal, isDesktop } = useContext(LayoutConfigContext);
    const { layoutState, setLayoutState } = useContext(SidebarContext);
    const { setRipple } = useContext(PrimeReactContext);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);
    const copyTooltipRef = useRef(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(sidebarRef.current.isSameNode(event.target) || sidebarRef.current.contains(event.target) || topbarRef.current.menubutton.isSameNode(event.target) || topbarRef.current.menubutton.contains(event.target));

            if (isOutsideClicked) {
                hideMenu();
            }
        }
    });

    const [bindDocumentResizeListener, unbindDocumentResizeListener] = useResizeListener({
        listener: () => {
            if (isDesktop() && !DomHandler.isTouchDevice()) {
                hideMenu();
            }
        }
    });

    const hideMenu = useCallback(() => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            overlaySubmenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
            menuClick: false,
            resetMenu: (isSlim() || isSlimPlus() || isHorizontal()) && isDesktop()
        }));
    }, [isSlim, isSlimPlus, isHorizontal, isDesktop, setLayoutState]);

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };
    useMountEffect(() => {
        setRipple(layoutConfig.ripple);
    });

    useEffect(() => {
        if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive || layoutState.overlaySubmenuActive) {
            bindMenuOutsideClickListener();
        }

        if (layoutState.staticMenuMobileActive) {
            blockBodyScroll();
            (isSlim() || isSlimPlus() || isHorizontal()) && bindDocumentResizeListener();
        }

        return () => {
            unbindMenuOutsideClickListener();
            unbindDocumentResizeListener();
            unblockBodyScroll();
        };
    }, [
        layoutState.overlayMenuActive,
        layoutState.staticMenuMobileActive,
        layoutState.overlaySubmenuActive,
        bindMenuOutsideClickListener,
        unbindMenuOutsideClickListener,
        bindDocumentResizeListener,
        unbindDocumentResizeListener,
        isSlim,
        isSlimPlus,
        isHorizontal
    ]);

    useEffect(() => {
        const onRouteChange = () => {
            hideMenu();
        };
        onRouteChange();
    }, [pathname, searchParams, hideMenu]);

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
    });

    const containerClassName = classNames('layout-wrapper', {
        'layout-light': layoutConfig.colorScheme === 'light',
        'layout-dark': layoutConfig.colorScheme === 'dark',
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-slim': layoutConfig.menuMode === 'slim',
        'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
        'layout-horizontal': layoutConfig.menuMode === 'horizontal',
        'layout-reveal': layoutConfig.menuMode === 'reveal',
        'layout-drawer': layoutConfig.menuMode === 'drawer',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive,
        'p-ripple-disabled': !layoutConfig.ripple,
        'layout-sidebar-active': layoutState.sidebarActive,
        'layout-sidebar-anchored': layoutState.anchored
    });

    return (
        <Suspense fallback={null}>
            <div className={classNames('layout-container', containerClassName)} data-theme={layoutConfig.colorScheme}>
                <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                <div className="layout-content-wrapper">
                    <AppTopbar ref={topbarRef} sidebarRef={sidebarRef} />
                    <div className="content-breadcrumb">
                        <AppBreadCrumb />
                    </div>

                    <div className="layout-content">{props.children}</div>
                    <div className="layout-mask"></div>
                </div>
                <Suspense fallback={null}>
                    <AppProfileMenu />
                </Suspense>
                <Suspense fallback={null}>
                    <AppConfig />
                </Suspense>
            </div>
        </Suspense>
    );
};

export default Layout;
