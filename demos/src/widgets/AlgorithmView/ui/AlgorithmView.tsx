import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
    type AlgorithmActions,
    currentAlgorithm,
    getAlgorithmKey,
    isHullAlgorithm,
    isSplineAlgorithm,
} from '#shared/lib/algorithm';
import type { Size } from '#shared/lib/math2d';
import { IconPlay, IconRemove } from '#shared/ui/icons';
import { interactive } from '#shared/ui/interactive';

import { HullView } from '#entities/Hull';
import { SplineView } from '#entities/Spline';

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

export const AlgorithmView = () => {
    const algorithm = useAtomValue(currentAlgorithm);

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(null);
    const sizeRef = useRef<Size & { updated: boolean }>({
        width: 0,
        height: 0,
        updated: false,
    });
    const [canvasSize, setCanvasSize] = useState<Size>({ width: 0, height: 0 });
    const [actions, setActions] = useState<AlgorithmActions | null>(null);

    const handleDraw = useCallback(() => {
        if (sizeRef.current.updated && actions?.draw !== undefined) {
            actions.draw();
            sizeRef.current.updated = false;
        }
        rafRef.current = requestAnimationFrame(handleDraw);
    }, [actions?.draw]);

    useEffect(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(handleDraw);
    }, [handleDraw]);

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

    const algorithmKey = useMemo(() => getAlgorithmKey(algorithm), [algorithm]);

    return (
        <Container ref={containerRef}>
            <Canvas
                key={algorithmKey}
                ref={canvasRef}
                onClick={actions?.handleCanvasClick}
                width={canvasSize.width}
                height={canvasSize.height}
            />

            {isHullAlgorithm(algorithm) && (
                <HullView
                    algorithm={algorithm}
                    canvasRef={canvasRef}
                    onActionsChange={setActions}
                />
            )}

            {isSplineAlgorithm(algorithm) && (
                <SplineView
                    algorithm={algorithm}
                    canvasRef={canvasRef}
                    onActionsChange={setActions}
                />
            )}

            <ControlPanel>
                <IconButton
                    isInteractive
                    onClick={actions?.clear}
                    disabled={actions?.clear === undefined}
                >
                    <IconRemove />
                </IconButton>
                <IconButton
                    isInteractive
                    onClick={actions?.play}
                    disabled={actions?.play === undefined}
                >
                    <IconPlay />
                </IconButton>
            </ControlPanel>
            {actions?.overlay}
        </Container>
    );
};
