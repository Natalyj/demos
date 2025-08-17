import { emitEvent } from '#shared/lib/emitter';
import { cross, Point } from '#shared/lib/math2d';

import { FIND_POINT_EVENT, REMOVE_POINT_EVENT } from './events.ts';
import { sortHull } from './sortHull.ts';

export const grahamHull = (points: Point[]): Point[] => {
    if (points.length <= 1) {
        return points;
    }

    const hull: Point[] = [];

    const minPoint = points.reduce((min, point) =>
        point.y < min.y || (point.y === min.y && point.x < min.x) ? point : min,
    );
    emitEvent(FIND_POINT_EVENT, [minPoint]);

    const sorted = sortHull(points, minPoint);
    for (const point of sorted) {
        while (
            hull.length >= 2 &&
            cross(hull[hull.length - 2], hull[hull.length - 1], point) <= 0
        ) {
            const removedPoint = hull.pop();
            emitEvent(REMOVE_POINT_EVENT, [removedPoint]);
        }
        hull.push(point);
        emitEvent(FIND_POINT_EVENT, [point]);
    }

    return hull;
};
