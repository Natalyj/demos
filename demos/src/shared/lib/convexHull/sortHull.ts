import { Point } from '../math2d/types.ts';

export const sortHull = (hull: Point[]): Point[] => {
    let sumX = 0;
    let sumY = 0;
    for (const point of hull) {
        sumX += point.x;
        sumY += point.y;
    }

    const centerX = sumX / hull.length;
    const centerY = sumY / hull.length;

    return hull
        .slice()
        .sort(
            (point1, point2) =>
                Math.atan2(point1.y - centerY, point1.x - centerX) -
                Math.atan2(point2.y - centerY, point2.x - centerX),
        );
};
