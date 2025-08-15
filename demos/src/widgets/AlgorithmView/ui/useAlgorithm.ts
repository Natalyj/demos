import { useAtomValue } from 'jotai';
import { MouseEvent, RefObject, useCallback, useState } from 'react';

import { Algorithm, currentAlgorithm } from '#entities/Algorithm';
import { getContext } from '#shared/lib/canvas2d';
import { quickHull, sortHull } from '#shared/lib/convexHull';
import { drawHullLines, drawPoint } from '#shared/lib/draw2d';
import { Point } from '#shared/lib/math2d';

export const useAlgorithm = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
) => {
    const algorithm = useAtomValue(currentAlgorithm);

    switch (algorithm) {
        case Algorithm.QuickHull:
        default:
            return useQuickHull(canvasRef);
        // default:
        // throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
};

export const useQuickHull = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
) => {
    const [points, setPoints] = useState<Point[]>([]);
    const [hull, setHull] = useState<Point[]>([]);

    const draw = useCallback(() => {
        const ctx = getContext(canvasRef);

        points.forEach((point) => {
            drawPoint(ctx, point);
        });

        drawHullLines(ctx, hull);
    }, [points, hull, canvasRef.current]);

    const handleCanvasClick = useCallback(
        (e: MouseEvent<HTMLCanvasElement>) => {
            if (canvasRef.current === null) {
                return;
            }

            const ctx = getContext(canvasRef);
            const rect = canvasRef.current.getBoundingClientRect();
            const point = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
            setPoints((prev) => [...prev, point]);
            drawPoint(ctx, point);
        },
        [canvasRef.current],
    );

    const clear = useCallback(() => {
        setPoints([]);
        setHull([]);
    }, []);

    const play = useCallback(() => {
        const ctx = getContext(canvasRef);

        const hull = sortHull(quickHull(points));
        setHull(hull);
        drawHullLines(ctx, hull);
    }, [canvasRef.current, points]);

    return {
        draw,
        clear,
        play,
        handleCanvasClick,
    };
};
