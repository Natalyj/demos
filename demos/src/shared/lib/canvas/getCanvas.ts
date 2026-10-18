import { RefObject } from 'react';

export const getCanvas = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
): HTMLCanvasElement => {
    const canvas = canvasRef.current;

    if (canvas === null) {
        throw new Error('Canvas is not defined.');
    }

    return canvas;
};
