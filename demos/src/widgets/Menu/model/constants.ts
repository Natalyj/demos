import { Algorithm } from '#entities/Algorithm';

import { IMenuItem } from './types.ts';

export const MENU_ITEMS: IMenuItem[] = [
    {
        label: 'Convex hull',
        children: [
            { label: 'Graham scan', algorithm: Algorithm.GrahamScan },
            { label: 'Jarvis march', algorithm: Algorithm.JarvisMarch },
            { label: 'Quick hull', algorithm: Algorithm.QuickHull },
        ],
    },
];
