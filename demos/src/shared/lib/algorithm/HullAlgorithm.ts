import { Algorithm } from './currentAlgorithm.ts';

export type HullAlgorithm =
    | Algorithm.GrahamScan
    | Algorithm.JarvisMarch
    | Algorithm.QuickHull;

const HULL_ALGORITHMS: ReadonlySet<Algorithm> = new Set([
    Algorithm.GrahamScan,
    Algorithm.JarvisMarch,
    Algorithm.QuickHull,
]);

export const isHullAlgorithm = (algorithm: Algorithm): algorithm is HullAlgorithm => 
    HULL_ALGORITHMS.has(algorithm);
