import { cross, Point, triangleArea2 } from '../math2d/index.ts';
import { uniquePoints } from './uniquePoints.ts';

export const quickHull = (points: Point[]): Point[] => {
    if (points.length < 3) {
        return points;
    }

    let minPoint = points[0];
    let maxPoint = points[0];

    for (const p of points) {
        if (p.x < minPoint.x) {
            minPoint = p;
        }
        if (p.x > maxPoint.x) {
            maxPoint = p;
        }
    }

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

    return uniquePoints(hull);
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

    findHull(subsetA, a, farthestPoint, hull);
    findHull(subsetB, farthestPoint, b, hull);
};
