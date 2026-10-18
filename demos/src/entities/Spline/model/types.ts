import { RefObject } from 'react';

export interface SplineViewProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    // TODONAT pass points?
    fn: (args: any) => any;
}
