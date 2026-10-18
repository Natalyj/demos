import { isDefined } from '../types/isDefined.ts';

export const getContext2d = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');

    if (!isDefined(ctx)) {
        throw new Error('Canvas context is null');
    }

    return ctx;
};
