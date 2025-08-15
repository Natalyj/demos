import { Point } from '../math2d/types.ts';

export const uniquePoints = (points: Point[]): Point[] => {
    const seen = new Set<string>();
    return points.filter((point) => {
        const key = `${point.x}${point.y}`;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
};
