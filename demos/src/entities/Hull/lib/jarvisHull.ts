import { emitEvent } from '#shared/lib/emitter';
import { cross, distance2, Point } from '#shared/lib/math2d';

import { FIND_POINT_EVENT } from './events.ts';
import { findMinMax } from './findMinMax.ts';

export const jarvisHull = (points: Point[]): Point[] => {
    if (points.length <= 1) {
        return points;
    }

    const hull: Point[] = [];

    const { minPoint } = findMinMax(points);

    let current = minPoint;
    do {
        hull.push(current);
        emitEvent(FIND_POINT_EVENT, [current]);

        let next = points[0];
        for (const point of points) {
            if (point === current) continue;
            const result = cross(current, next, point);
            if (
                result < 0 ||
                (result === 0 &&
                    distance2(point, current) > distance2(next, current))
            ) {
                next = point;
            }
        }

        current = next;
    } while (current !== minPoint);

    return hull;
};
