import { atom } from 'jotai';

import { Algorithm } from '#shared';

export const currentAlgorithm = atom<Algorithm>(Algorithm.GrahamScan);
