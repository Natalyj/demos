import { useAtomValue } from 'jotai';
import { MouseEvent, RefObject, useCallback, useEffect, useState } from 'react';

import { Algorithm, currentAlgorithm } from '#entities/Algorithm';
import { getContext } from '#shared/lib/canvas2d';
import { FIND_POINT_EVENT, quickHull, sortHull } from '#shared/lib/convexHull';
import { drawHullLines, drawPoint } from '#shared/lib/draw2d';
import { addEventListener, removeEventListener } from '#shared/lib/emitter';
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
    const [steps, setSteps] = useState<Point[][]>([]);

    const draw = useCallback(() => {
        const ctx = getContext(canvasRef);

        points.forEach((point) => {
            const color = hull.includes(point) ? 'red' : undefined;
            drawPoint(ctx, point, { color });
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

    const clearCanvas = useCallback(() => {
        if (canvasRef.current === null) {
            return;
        }
        const { width, height } = canvasRef.current;
        const ctx = getContext(canvasRef);
        ctx.clearRect(0, 0, width, height);
    }, [canvasRef.current]);

    const clear = useCallback(() => {
        clearCanvas();
        setPoints([]);
        setHull([]);
        setSteps([]);
    }, [clearCanvas]);

    const prepareToPlay = useCallback(() => {
        clearCanvas();
        const ctx = getContext(canvasRef);
        points.forEach((point) => {
            drawPoint(ctx, point);
        });
        setSteps([]);
    }, [canvasRef.current, points, clearCanvas]);

    const play = useCallback(() => {
        prepareToPlay();
        setHull(sortHull(quickHull(points)));
    }, [points, prepareToPlay]);

    const updateSteps = (e: CustomEvent<Point[]>) => {
        setSteps((prevSteps) => [...prevSteps, e.detail]);
    };

    useEffect(() => {
        addEventListener(FIND_POINT_EVENT, updateSteps);

        return () => {
            removeEventListener(FIND_POINT_EVENT, updateSteps);
        };
    }, []);

    const animate = useCallback(() => {
        const ctx = getContext(canvasRef);

        const stepByStep = async () => {
            for (let i = 0; i < steps.length; i++) {
                steps[i].forEach((point) => {
                    drawPoint(ctx, point, { color: 'red' });
                });
                await new Promise((resolve) => setTimeout(resolve, 500));
            }

            drawHullLines(ctx, hull);
        };
        stepByStep();
    }, [canvasRef.current, steps]);

    useEffect(() => {
        animate();
    }, [hull]);

    return {
        draw,
        clear,
        play,
        handleCanvasClick,
    };
};
