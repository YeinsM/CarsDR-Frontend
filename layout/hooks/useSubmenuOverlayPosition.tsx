'use client';

import { useEventListener } from 'primereact/hooks';
import { DomHandler } from 'primereact/utils';

import { useCallback, useContext, useEffect } from 'react';
import { LayoutConfigContext, SidebarContext } from '../context/layoutcontext';
import { MenuContext } from '../context/menucontext';

export const useSubmenuOverlayPosition = ({ target, overlay, container, when }) => {
    const { isSlim, isSlimPlus, isHorizontal } = useContext(LayoutConfigContext);
    const { setLayoutState, layoutState } = useContext(SidebarContext);
    const { activeMenu } = useContext(MenuContext);
    const [bindScrollListener, unbindScrollListener] = useEventListener({
        type: 'scroll',
        target: container,
        listener: () => {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                overlayMenuActive: false,
                overlaySubmenuActive: false,
                staticMenuMobileActive: false,
                menuHoverActive: false,
                resetMenu: true
            }));
        }
    });

    const calculatePosition = useCallback(() => {
        if (overlay) {
            const { left, top } = target.getBoundingClientRect();
            const { height: vHeight } = DomHandler.getViewport();
            const oHeight = overlay.offsetHeight;

            // reset
            overlay.style.top = overlay.style.left = '';

            if (isHorizontal()) {
                overlay.style.left = `${left - 80}px`;
            } else if (isSlim() || isSlimPlus()) {
                const height = top + oHeight;
                overlay.style.top = vHeight < height ? `${top - (height - vHeight)}px` : `${top}px`;
            }
        }
    }, [overlay, target, isHorizontal, isSlim, isSlimPlus]);

    useEffect(() => {
        when && bindScrollListener();

        return () => {
            unbindScrollListener();
        };
    }, [when, bindScrollListener, unbindScrollListener]);

    useEffect(() => {
        when && calculatePosition();
    }, [when, activeMenu, calculatePosition]);
};
