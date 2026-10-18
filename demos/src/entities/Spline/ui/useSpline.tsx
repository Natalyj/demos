import styled from '@emotion/styled';
import { MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';

import { getCanvas } from '#shared/lib/canvas';
import { CanvasResources, setUpCanvas } from '#shared/lib/webgpu';
import { renderClearPass } from '#shared/lib/webgpu/renderPass';

import { SplineViewProps } from '../model/types.ts';

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

export const useSpline = ({ canvasRef, fn }: SplineViewProps) => {
    const canvasResources = useRef<CanvasResources | null>(null);

    const overlay = useMemo(
        () => (
            <OverlayContainer>
                Put points by clicking on the canvas and click "Play"
            </OverlayContainer>
        ),
        [],
    );

    const draw = useCallback(() => {
        const resources = canvasResources.current;

        if (resources === null) {
            console.error('Resources are not set before draw.');
            return;
        }

        const canvas = getCanvas(canvasRef);

        if (canvas.width === 0 || canvas.height === 0) {
            console.warn('Canvas has zero size.');
            return;
        }

        renderClearPass(
            resources.device,
            resources.context,
            [0.5, 0.5, 0, 1],
        );
    }, [canvasRef]);

    const handleCanvasClick = useCallback(
        (e: MouseEvent<HTMLCanvasElement>) => {
            // TODONAT implement
        },
        [canvasRef.current],
    );

    const clearCanvas = useCallback(() => {
        // TODONAT implement
    }, [canvasRef.current]);

    const clear = useCallback(() => {
        clearCanvas();
        // TODONAT implement
    }, [clearCanvas]);

    const prepareToPlay = useCallback(() => {
        // TODONAT implement
    }, [canvasRef.current]);

    const play = useCallback(() => {
        prepareToPlay();
        // TODONAT implement
    }, [prepareToPlay]);

    const clearResources = useCallback(() => {
        const resources = canvasResources.current;

        canvasResources.current = null;

        if (resources === null) {
            return;
        }

        resources.context.unconfigure();
        resources.device.destroy();
    }, []);

    useEffect(() => {
        const canvas = getCanvas(canvasRef);
        let cancelled = false;

        setUpCanvas(canvas)
            .then((resources) => {
                if (cancelled) {
                    resources.context.unconfigure();
                    resources.device.destroy();
                    return;
                }

                canvasResources.current = resources;
                // TODONAT test draw
                draw();
            })
            .catch((err) => {
                if (!cancelled) {
                    console.error(`WebGPU setup failed: ${err}`);
                }
            });

        return () => {
            cancelled = true;
            clearResources();
        };
    }, [canvasRef, clearResources, draw]);

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
