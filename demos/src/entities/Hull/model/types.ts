import type { RefObject } from 'react';

import { Point } from '#shared/lib/math2d';

export interface HullViewProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    fn: (points: Point[]) => Point[];
}

export interface Step {
    points: Point[];
    eventName: string;
}
