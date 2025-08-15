import { Point } from './types.ts';

/**
 * Can be used to determine the orientation of the triplet (a, b, c).
 * Result > 0 if c is to the left of the line AB (CCW),
 * Result < 0 if c is to the right of the line AB (CW),
 * Result = 0 if a, b, c are collinear.
 */
export const cross = (a: Point, b: Point, c: Point): number =>
    (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
