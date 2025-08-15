import { Point } from '../math2d/types.ts';

interface Props {
    width: number;
    color: string;
}

const defaultProps: Props = {
    width: 1,
    color: 'black',
};

export const drawLine = (
    ctx: CanvasRenderingContext2D,
    start: Point,
    end: Point,
    props: Partial<Props> = {},
) => {
    const color = props.color || defaultProps.color;
    const width = props.width || defaultProps.width;

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
};
