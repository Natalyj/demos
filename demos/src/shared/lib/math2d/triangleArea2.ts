import { cross } from './cross.ts';
import { Point } from './types.ts';

/**
 * Calculates the double area of the triangle formed by line and point p.
 */
export const triangleArea2 = (line: [Point, Point], p: Point): number =>
    Math.abs(cross(line[0], line[1], p));
