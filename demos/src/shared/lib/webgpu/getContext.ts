import { isDefined } from '../types/isDefined.ts';

export const getContextWebGPU = (
    canvas: HTMLCanvasElement,
): GPUCanvasContext => {
    const ctx = canvas.getContext('webgpu');

    if (!isDefined(ctx)) {
        throw new Error(
            'Could not create WebGPU context. ' +
                'Check browser support and canvas context type.',
        );
    }

    return ctx;
};
