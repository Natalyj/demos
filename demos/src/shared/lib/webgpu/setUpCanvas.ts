import { isDefined } from '../types/isDefined.ts';
import { getContextWebGPU } from './getContext.ts';

export interface CanvasResources {
    device: GPUDevice;
    context: GPUCanvasContext;
}

export const setUpCanvas = async (
    canvas: HTMLCanvasElement,
): Promise<CanvasResources> => {
    const { gpu } = navigator;

    if (!isDefined(gpu)) {
        throw new Error(
            'GPU API is not available. Check if the context is secure.',
        );
    }

    const adapter = await gpu.requestAdapter();

    if (!isDefined(adapter)) {
        throw new Error('GPU Adapter is not available.');
    }

    const device = await adapter.requestDevice();

    let context: GPUCanvasContext | null = null;

    try {
        context = getContextWebGPU(canvas);
        const format = gpu.getPreferredCanvasFormat();
        context.configure({ device, format });
        return { device, context };
    } catch (cause) {
        context?.unconfigure();
        device.destroy();
        throw new Error('Failed to initialize WebGPU canvas context', {
            cause,
        });
    }
};
