import { Point } from '../math2d/types.ts';
import { drawLine } from './drawLine.ts';

export const drawHullLines = (ctx: CanvasRenderingContext2D, hull: Point[]) => {
    for (let i = 0; i < hull.length; i++) {
        const a = hull[i];
        const b = hull[(i + 1) % hull.length];
        drawLine(ctx, a, b);
    }
};
