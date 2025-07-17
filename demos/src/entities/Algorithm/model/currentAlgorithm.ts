import { atom } from 'jotai';

export enum Algorithm {
    GrahamScan = 'GrahamScan',
    JarvisMarch = 'JarvisMarch',
    QuickHull = 'QuickHull',
}

export const currentAlgorithm = atom<Algorithm>(Algorithm.GrahamScan);
