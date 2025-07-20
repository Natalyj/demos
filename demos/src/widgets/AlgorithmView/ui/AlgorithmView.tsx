import styled from '@emotion/styled';
// import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IconPlay, IconRemove } from '#shared/ui/icons';
import { interactive } from '#shared/ui/interactive';
// import { currentAlgorithm } from '#entities/Algorithm';

const Container = styled.div`
    display: flex;
    position: relative;
`;

const Canvas = styled.canvas`
    position: absolute;
`;

const ControlPanel = styled.div`
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const IconButton = styled.button<{ isInteractive: boolean }>`
    width: 32px;
    height: 32px;
    ${({ isInteractive }) => isInteractive && interactive()}
`;

interface Point {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

export const AlgorithmView = () => {
    // const algorithm = useAtomValue(currentAlgorithm);

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(null);
    const sizeRef = useRef<Size & { updated: boolean }>({
        width: 0,
        height: 0,
        updated: false,
    });

    const [points, setPoints] = useState<Point[]>([]);
    const [canvasSize, setCanvasSize] = useState<Size>({ width: 0, height: 0 });

    const getContext = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) {
            throw new Error('Canvas context is null');
        }
        return ctx;
    };

    const drawPoint = (point: Point) => {
        const ctx = getContext();
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
    };

    const draw = useCallback(() => {
        if (sizeRef.current.updated) {
            points.forEach(drawPoint);
            sizeRef.current.updated = false;
        }
        rafRef.current = requestAnimationFrame(draw);
    }, [points]);

    useEffect(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(draw);
    }, [draw]);

    useEffect(() => {
        if (containerRef.current === null) {
            return;
        }

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                if (
                    sizeRef.current.width !== width ||
                    sizeRef.current.height !== height
                ) {
                    sizeRef.current = { width, height, updated: true };
                    setCanvasSize({ width, height });
                }
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [containerRef.current]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (canvasRef.current === null) {
            return;
        }

        const rect = canvasRef.current.getBoundingClientRect();
        const point = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        setPoints((prev) => [...prev, point]);
        drawPoint(point);
    };

    const handleClear = () => {
        setPoints([]);
        getContext().clearRect(0, 0, canvasSize.width, canvasSize.height);
    };

    return (
        <Container ref={containerRef}>
            <Canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                width={canvasSize.width}
                height={canvasSize.height}
            />
            <ControlPanel>
                <IconButton isInteractive onClick={handleClear}>
                    <IconRemove />
                </IconButton>
                <IconButton isInteractive>
                    <IconPlay />
                </IconButton>
            </ControlPanel>
        </Container>
    );
};
