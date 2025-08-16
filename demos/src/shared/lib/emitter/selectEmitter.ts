import { EmitterManager } from './EmitterManager.ts';

export const selectEmitter = (eventName: string) => {
    const emitter = EmitterManager.getEmitter(eventName);

    if (emitter === undefined) {
        throw new Error(`Emitter for event "${eventName}" not found.`);
    }

    return emitter;
};
