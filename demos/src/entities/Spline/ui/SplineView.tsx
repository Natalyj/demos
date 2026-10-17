import { useEffect } from 'react';

import {
    type AlgorithmViewProps,
    Algorithm,
    SplineAlgorithm,
} from '#shared/lib/algorithm';

import { useSpline } from './useSpline.tsx';

// TODONAT setup only, implement

const chooseSplineAlgorithm = (algorithm: SplineAlgorithm) => {
    switch (algorithm) {
        case Algorithm.SplineCentripetal:
        default:
            throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
};

interface Props extends AlgorithmViewProps {
    algorithm: SplineAlgorithm;
}

export const SplineView = ({
    algorithm,
    canvasRef,
    onActionsChange,
}: Props) => {
    const actions = useSpline({ canvasRef, fn: chooseSplineAlgorithm(algorithm) });

    useEffect(() => {
        onActionsChange(actions);
        return () => onActionsChange(null);
    }, [actions]);

    return null;
};
