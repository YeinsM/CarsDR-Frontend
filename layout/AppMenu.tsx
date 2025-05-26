import { MenuModal } from '../types/layout';
import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model: MenuModal[] = [
        {
            label: 'Dashboards',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-home',
                    to: '/pages/home'
                }
            ]
        },
        { separator: true }
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
