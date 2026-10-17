import styled from '@emotion/styled';
import {
    MouseEvent,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { getContext } from '#shared/lib/canvas2d';
import { drawHullLines, drawPoint } from '#shared/lib/draw2d';
import { Point } from '#shared/lib/math2d';

import { SplineViewProps } from '../model/types.ts';

// TODONAT copy of hull, implement

const OverlayContainer = styled.div`
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    background: #f5f5f5;
    padding: 16px;
    user-select: none;
`;

interface Step {
    points: Point[];
    eventName: string;
}

export const useSpline = ({ canvasRef, fn }: SplineViewProps) => {
    const [points, setPoints] = useState<Point[]>([]);
    const [hull, setHull] = useState<Point[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);

    const overlay = useMemo(
        () => (
            <OverlayContainer>
                Put points by clicking on the canvas and click "Play"
            </OverlayContainer>
        ),
        [],
    );

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

    const animate = useCallback(() => {
        const ctx = getContext(canvasRef);

        const stepByStep = async () => {
            for (let i = 0; i < steps.length; i++) {
                const step = steps[i];
                step.points.forEach((point) => {
                    drawPoint(ctx, point);
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

    return useMemo(
        () => ({
            draw,
            clear,
            play,
            handleCanvasClick,
            overlay,
        }),
        [draw, clear, play, handleCanvasClick, overlay],
    );
};
