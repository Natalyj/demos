import { atom } from 'jotai';

export enum Algorithm {
    GrahamScan = 'GrahamScan',
    JarvisMarch = 'JarvisMarch',
    QuickHull = 'QuickHull',
    SplineCentripetal = 'SplineCentripetal',
}

export const currentAlgorithm = atom<Algorithm>(Algorithm.GrahamScan);
