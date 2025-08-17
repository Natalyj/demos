import { Point } from '#shared/lib/math2d';

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
