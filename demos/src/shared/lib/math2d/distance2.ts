import { Point } from './types.ts';

/**
 * Returns the squared distance between two points.
 */
export const distance2 = (a: Point, b: Point): number => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy;
};
