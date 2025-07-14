import { IMenuItem } from './types.ts';

interface Props {
    item: IMenuItem;
}

export const MenuItem = ({ item }: Props) => {
    return (
        <li>
            {item.label}
            {item.children && item.children.length > 0 && (
                <ul>
                    {item.children.map((child, index) => (
                        <MenuItem key={index} item={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};
