import { EmitterManager } from './EmitterManager.ts';

export const addEventListener = (
    eventName: string,
    listener: (event: any) => void,
) => {
    EmitterManager.getEmitter(eventName).addEventListener(eventName, listener);
};

export const removeEventListener = (
    eventName: string,
    listener: (event: any) => void,
) => {
    EmitterManager.getEmitter(eventName).removeEventListener(
        eventName,
        listener,
    );
};
