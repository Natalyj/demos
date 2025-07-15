import { MENU_ITEMS } from '../model/constants.ts';
import { MenuItem } from './MenuItem.tsx';

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
