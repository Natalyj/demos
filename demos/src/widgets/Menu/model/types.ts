import { Algorithm } from '#entities/Algorithm';

export interface IMenuItem {
    label: string;
    children?: IMenuItem[];
    algorithm?: Algorithm;
}
