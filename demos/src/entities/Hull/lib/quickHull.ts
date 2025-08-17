import { emitEvent } from '#shared/lib/emitter';
import { cross, Point, triangleArea2 } from '#shared/lib/math2d';

import { FIND_POINT_EVENT } from './events.ts';
import { findMinMax } from './findMinMax.ts';
import { sortHull } from './sortHull.ts';
import { uniquePoints } from './uniquePoints.ts';

export const quickHull = (points: Point[]): Point[] => {
    if (points.length < 3) {
        return sortHull(points);
    }

    const { minPoint, maxPoint } = findMinMax(points);

    const leftSet = [];
    const rightSet = [];

    for (const p of points) {
        if (p === minPoint || p === maxPoint) {
            continue;
        }
        const side = cross(minPoint, maxPoint, p);
        if (side > 0) {
            leftSet.push(p);
        } else if (side < 0) {
            rightSet.push(p);
        }
    }

    const hull: Point[] = [];

    findHull(leftSet, minPoint, maxPoint, hull);
    findHull(rightSet, maxPoint, minPoint, hull);

    hull.push(minPoint, maxPoint);

    emitEvent(FIND_POINT_EVENT, [minPoint, maxPoint]);

    return sortHull(uniquePoints(hull));
};

const findHull = (points: Point[], a: Point, b: Point, hull: Point[]) => {
    if (points.length === 0) {
        return;
    }

    let maxDist = -1;
    let farthestPoint: Point | null = null;

    for (const point of points) {
        const dist = triangleArea2([a, b], point);
        if (dist > maxDist) {
            maxDist = dist;
            farthestPoint = point;
        }
    }

    if (farthestPoint === null) {
        return;
    }

    hull.push(farthestPoint);

    let subsetA: Point[] = [];
    let subsetB: Point[] = [];

    for (const point of points) {
        if (point === farthestPoint) {
            continue;
        }

        if (cross(a, farthestPoint, point) > 0) {
            subsetA.push(point);
        }
        if (cross(farthestPoint, b, point) > 0) {
            subsetB.push(point);
        }
    }

    emitEvent(FIND_POINT_EVENT, [farthestPoint]);

    findHull(subsetA, a, farthestPoint, hull);
    findHull(subsetB, farthestPoint, b, hull);
};
