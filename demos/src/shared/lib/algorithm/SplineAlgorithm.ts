import { Algorithm } from './currentAlgorithm.ts';

export type SplineAlgorithm =
    | Algorithm.SplineCentripetal;

const SPLINE_ALGORITHMS: ReadonlySet<Algorithm> = new Set([
    Algorithm.SplineCentripetal,
]);

export const isSplineAlgorithm = (algorithm: Algorithm): algorithm is SplineAlgorithm => 
    SPLINE_ALGORITHMS.has(algorithm);
