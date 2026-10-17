import { useEffect } from 'react';

import {
    type AlgorithmViewProps,
    Algorithm,
    HullAlgorithm,
} from '#shared/lib/algorithm';

import { grahamHull } from '../lib/grahamHull.ts';
import { jarvisHull } from '../lib/jarvisHull.ts';
import { quickHull } from '../lib/quickHull.ts';
import { useHull } from './useHull.tsx';

const chooseHullAlgorithm = (algorithm: HullAlgorithm) => {
    switch (algorithm) {
        case Algorithm.QuickHull:
            return quickHull;
        case Algorithm.GrahamScan:
            return grahamHull;
        case Algorithm.JarvisMarch:
            return jarvisHull;
        default:
            throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
};

interface Props extends AlgorithmViewProps {
    algorithm: HullAlgorithm;
}

export const HullView = ({
    algorithm,
    canvasRef,
    onActionsChange,
}: Props) => {
    const actions = useHull({ canvasRef, fn: chooseHullAlgorithm(algorithm) });

    useEffect(() => {
        onActionsChange(actions);
        return () => onActionsChange(null);
    }, [actions]);

    return null;
};
