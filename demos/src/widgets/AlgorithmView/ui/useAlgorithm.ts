import { useAtomValue } from 'jotai';
import { RefObject } from 'react';

import { Algorithm, currentAlgorithm } from '#entities/Algorithm';
import { grahamHull, quickHull, useHull } from '#entities/Hull';

const chooseHullAlgorithm = (algorithm: Algorithm) => {
    switch (algorithm) {
        case Algorithm.QuickHull:
            return quickHull;
        case Algorithm.GrahamScan:
            return grahamHull;
        default:
            throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
};

export const useAlgorithm = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
) => {
    const algorithm = useAtomValue(currentAlgorithm);

    switch (algorithm) {
        case Algorithm.QuickHull:
        case Algorithm.GrahamScan:
            return useHull(canvasRef, chooseHullAlgorithm(algorithm));
        default:
            throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
};
