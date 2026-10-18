import { Algorithm } from '#shared/lib/algorithm';

export interface IMenuItem {
    label: string;
    children?: IMenuItem[];
    algorithm?: Algorithm;
}
