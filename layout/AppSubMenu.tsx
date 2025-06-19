'use client';

import { Tooltip } from 'primereact/tooltip';
import React, { useContext, useEffect, useRef, useCallback } from 'react';
import AppMenuitem from './AppMenuitem';
import { SidebarContext, BreadcrumbContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { Breadcrumb, BreadcrumbItem, MenuModal, MenuProps } from '../types/layout';
import breadCrumGenerator from './utils/breadCrumUtils';

const AppSubMenu = (props: MenuProps) => {
    const { layoutState } = useContext(SidebarContext);
    const { setBreadcrumbs } = useContext(BreadcrumbContext);
    const tooltipRef = useRef<Tooltip | null>(null);

    useEffect(() => {
        tooltipRef.current?.hide();
    }, [layoutState.overlaySubmenuActive]);

    const generateBreadcrumbs = useCallback((model: MenuModal[]) => {
        let breadcrumbs: Breadcrumb[] = [];

        const getBreadcrumb = (item: BreadcrumbItem, labels: string[] = []) => {
            const { label, to, items } = item;

            label && labels.push(label);
            items &&
                items.forEach((_item) => {
                    getBreadcrumb(_item, labels.slice());
                });
            to && breadcrumbs.push({ labels, to });
        };

        model.forEach((item) => {
            getBreadcrumb(item);
        });
        setBreadcrumbs(breadcrumbs);
    }, [setBreadcrumbs]);

    useEffect(() => {
        generateBreadcrumbs(props.model);
    }, [generateBreadcrumbs, props.model]);

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {props.model.map((item, i) => {
                    return !item.separator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li key={i} className="menu-separator"></li>;
                })}
            </ul>
            <Tooltip ref={tooltipRef} target="li:not(.active-menuitem)>.tooltip-target" />
        </MenuProvider>
    );
};

export default AppSubMenu;
