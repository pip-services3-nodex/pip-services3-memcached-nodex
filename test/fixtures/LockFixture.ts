const assert = require('chai').assert;

import { ILock } from 'pip-services3-components-nodex';

let LOCK1: string = "lock_1";
let LOCK2: string = "lock_2";
let LOCK3: string = "lock_3";

export class LockFixture {
    private _lock: ILock;

    public constructor(lock: ILock) {
        this._lock = lock;
    }

    public async testTryAcquireLock(): Promise<void> {
        // Try to acquire lock for the first time
        let ok = await this._lock.tryAcquireLock(null, LOCK1, 3000);
        assert.isTrue(ok);

        // Try to acquire lock for the second time
        ok = await this._lock.tryAcquireLock(null, LOCK1, 3000);
        assert.isFalse(ok);

        // Release the lock
        await this._lock.releaseLock(null, LOCK1);

        // Try to acquire lock for the third time
        ok = await this._lock.tryAcquireLock(null, LOCK1, 3000);
        assert.isTrue(ok);

        await this._lock.releaseLock(null, LOCK1);
    }

    public async testAcquireLock(): Promise<void> {
        // Acquire lock for the first time
        await this._lock.acquireLock(null, LOCK2, 3000, 1000);

        // Acquire lock for the second time
        try {
            await this._lock.acquireLock(null, LOCK2, 3000, 1000);
            assert.fail("Expected exception on the second lock attempt");
        } catch {
            // Expected exception...
        }

        // Release the lock
        await this._lock.releaseLock(null, LOCK2);

        // Acquire lock for the third time
        await this._lock.acquireLock(null, LOCK2, 3000, 1000);

        await this._lock.releaseLock(null, LOCK2);
    }

    public async testReleaseLock(): Promise<void> {
        // Acquire lock for the first time
        let ok = await this._lock.tryAcquireLock(null, LOCK3, 3000);
        assert.isTrue(ok);

        // Release the lock for the first time
        await this._lock.releaseLock(null, LOCK3);

        // Release the lock for the second time
        await this._lock.releaseLock(null, LOCK3);
    }
    
}