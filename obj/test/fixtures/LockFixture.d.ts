import { ILock } from 'pip-services3-components-nodex';
export declare class LockFixture {
    private _lock;
    constructor(lock: ILock);
    testTryAcquireLock(): Promise<void>;
    testAcquireLock(): Promise<void>;
    testReleaseLock(): Promise<void>;
}
