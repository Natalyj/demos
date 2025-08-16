import { selectEmitter } from './selectEmitter.ts';

export const addEventListener = (
    eventName: string,
    listener: (event: any) => void,
) => {
    selectEmitter(eventName).addEventListener(eventName, listener);
};

export const removeEventListener = (
    eventName: string,
    listener: (event: any) => void,
) => {
    selectEmitter(eventName).removeEventListener(eventName, listener);
};
