import { Emitter } from './Emitter.ts';

export class EmitterManager {
    private static emittersMap = new Map<string, Emitter>();

    static getEmitter(event: string) {
        if (!EmitterManager.emittersMap.has(event)) {
            EmitterManager.emittersMap.set(event, new Emitter(event));
        }
        return EmitterManager.emittersMap.get(event);
    }
}
