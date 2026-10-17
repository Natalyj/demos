import type { MouseEvent, ReactNode, RefObject } from 'react';

export interface AlgorithmActions {
    draw: () => void;
    play?: () => void;
    clear?: () => void;
    handleCanvasClick?: (event: MouseEvent<HTMLCanvasElement>) => void;
    overlay?: ReactNode;
}

export interface AlgorithmViewProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    onActionsChange: (actions: AlgorithmActions | null) => void;
}
