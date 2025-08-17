import { EmitterManager } from './EmitterManager.ts';

export const emitEvent = <T>(eventName: string, payload: T) => {
    EmitterManager.getEmitter(eventName).emitEvent(payload);
};
