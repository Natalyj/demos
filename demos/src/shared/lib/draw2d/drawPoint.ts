import { Point } from '../math2d/types.ts';

interface Props {
    radius: number;
    color: string;
}

const defaultProps: Props = {
    radius: 5,
    color: 'blue',
};

export const drawPoint = (
    ctx: CanvasRenderingContext2D,
    point: Point,
    props: Partial<Props> = {},
) => {
    const color = props.color || defaultProps.color;
    const radius = props.radius || defaultProps.radius;

    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
};
