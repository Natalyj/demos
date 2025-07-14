import { MenuItem } from './MenuItem.tsx';
import { IMenuItem } from './types.ts';

const MENU_ITEMS: IMenuItem[] = [
    {
        label: 'Convex hull',
        children: [
            { label: 'Graham scan' },
            { label: 'Jarvis march' },
            { label: 'Quick hull' },
        ],
    },
];

export const Menu = () => {
    return (
        <nav>
            <ul>
                {MENU_ITEMS.map((item, index) => (
                    <MenuItem key={index} item={item} />
                ))}
            </ul>
        </nav>
    );
};
