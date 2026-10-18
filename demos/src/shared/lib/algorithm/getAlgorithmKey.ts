import { Algorithm } from './currentAlgorithm.ts';
import { isHullAlgorithm } from './HullAlgorithm.ts';
import { isSplineAlgorithm } from './SplineAlgorithm.ts';

enum AlgorithmKey {
    Hull = 'hull',
    Spline = 'spline',
    Empty = 'empty',
}

export const getAlgorithmKey = (algorithm: Algorithm) => {
    if (isHullAlgorithm(algorithm)) {
        return AlgorithmKey.Hull;
    }

    if (isSplineAlgorithm(algorithm)) {
        return AlgorithmKey.Spline;
    }

    return AlgorithmKey.Empty;
};
