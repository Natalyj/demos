import { MouseEvent, RefObject, useCallback, useEffect, useState } from 'react';

import { getContext } from '#shared/lib/canvas2d';
import { drawHullLines, drawPoint } from '#shared/lib/draw2d';
import { addEventListener, removeEventListener } from '#shared/lib/emitter';
import { Point } from '#shared/lib/math2d';

import { FIND_POINT_EVENT, REMOVE_POINT_EVENT } from '../lib/events.ts';

interface Step {
    points: Point[];
    eventName: string;
}

export const useHull = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    fn: (points: Point[]) => Point[],
) => {
    const [points, setPoints] = useState<Point[]>([]);
    const [hull, setHull] = useState<Point[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);

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
        setHull(fn(points));
    }, [points, prepareToPlay, fn]);

    const updateSteps = (e: CustomEvent<Point[]>) => {
        setSteps((prevSteps) => [
            ...prevSteps,
            { points: e.detail, eventName: e.type },
        ]);
    };

    useEffect(() => {
        addEventListener(FIND_POINT_EVENT, updateSteps);
        addEventListener(REMOVE_POINT_EVENT, updateSteps);

        return () => {
            removeEventListener(FIND_POINT_EVENT, updateSteps);
            removeEventListener(REMOVE_POINT_EVENT, updateSteps);
        };
    }, []);

    const animate = useCallback(() => {
        const ctx = getContext(canvasRef);

        const stepByStep = async () => {
            for (let i = 0; i < steps.length; i++) {
                const step = steps[i];
                const { eventName } = step;
                step.points.forEach((point) => {
                    drawPoint(ctx, point, {
                        color:
                            eventName === FIND_POINT_EVENT ? 'red' : undefined,
                    });
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
