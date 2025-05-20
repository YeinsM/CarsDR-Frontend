import { MenuModal } from '../types/layout';
import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model: MenuModal[] = [
        {
            label: 'home',
            icon: 'pi pi-fw pi-home',
            to: '/pages/home'

        },
        { separator: true },
        { // profile
            label: 'profiles',
            icon: 'pi pi-users',
            items: [
                {
                    label: 'Roles',
                    icon: 'pi pi-fw pi-unlock',
                    to: '/profile/role'
                },
                { separator: true },
                {
                    label: 'List Customers',
                    icon: 'pi pi-fw pi-list',
                    to: '/profile/list'
                },
                { separator: true },
                {
                    label: 'Modulos',
                    icon: 'pi pi-th-large',
                    to: '/profile/module'
                },
            ]
        }
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
