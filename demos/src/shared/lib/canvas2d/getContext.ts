import { RefObject } from 'react';

export const getContext = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
        throw new Error('Canvas context is null');
    }
    return ctx;
};
