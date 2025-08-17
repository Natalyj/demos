import { Point } from '#shared/lib/math2d';

export const findMinMax = (points: Point[], component: 'x' | 'y' = 'x') => {
    let minPoint = points[0];
    let maxPoint = points[0];

    for (const p of points) {
        if (p[component] < minPoint[component]) {
            minPoint = p;
        }
        if (p[component] > maxPoint[component]) {
            maxPoint = p;
        }
    }
    return { minPoint, maxPoint };
};
