import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Size } from '#shared/lib/math2d';
import { IconPlay, IconRemove } from '#shared/ui/icons';
import { interactive } from '#shared/ui/interactive';
import { useAlgorithm } from './useAlgorithm.ts';

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
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(null);
    const sizeRef = useRef<Size & { updated: boolean }>({
        width: 0,
        height: 0,
        updated: false,
    });
    const [canvasSize, setCanvasSize] = useState<Size>({ width: 0, height: 0 });

    const { draw, clear, play, handleCanvasClick } = useAlgorithm(canvasRef);

    const handleDraw = useCallback(() => {
        if (sizeRef.current.updated) {
            draw();
            sizeRef.current.updated = false;
        }
        rafRef.current = requestAnimationFrame(handleDraw);
    }, [draw]);

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

    return (
        <Container ref={containerRef}>
            <Canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                width={canvasSize.width}
                height={canvasSize.height}
            />
            <ControlPanel>
                <IconButton isInteractive onClick={clear}>
                    <IconRemove />
                </IconButton>
                <IconButton isInteractive onClick={play}>
                    <IconPlay />
                </IconButton>
            </ControlPanel>
        </Container>
    );
};
