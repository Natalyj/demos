import { selectEmitter } from './selectEmitter.ts';

export const emitEvent = <T>(eventName: string, payload: T) => {
    selectEmitter(eventName).emitEvent(payload);
};
