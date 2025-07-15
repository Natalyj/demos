import { Algorithm } from '#shared';

export interface IMenuItem {
    label: string;
    children?: IMenuItem[];
    algorithm?: Algorithm;
}
