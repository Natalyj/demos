import { Algorithm } from '#shared/lib/algorithm';

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
    {
        label: 'Catmull-Rom Spline',
        children: [
            { label: 'centripetal', algorithm: Algorithm.SplineCentripetal },
        ],
    },
];
