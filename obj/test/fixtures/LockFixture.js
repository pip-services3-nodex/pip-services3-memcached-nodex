"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockFixture = void 0;
const assert = require('chai').assert;
let LOCK1 = "lock_1";
let LOCK2 = "lock_2";
let LOCK3 = "lock_3";
class LockFixture {
    constructor(lock) {
        this._lock = lock;
    }
    testTryAcquireLock() {
        return __awaiter(this, void 0, void 0, function* () {
            // Try to acquire lock for the first time
            let ok = yield this._lock.tryAcquireLock(null, LOCK1, 3000);
            assert.isTrue(ok);
            // Try to acquire lock for the second time
            ok = yield this._lock.tryAcquireLock(null, LOCK1, 3000);
            assert.isFalse(ok);
            // Release the lock
            yield this._lock.releaseLock(null, LOCK1);
            // Try to acquire lock for the third time
            ok = yield this._lock.tryAcquireLock(null, LOCK1, 3000);
            assert.isTrue(ok);
            yield this._lock.releaseLock(null, LOCK1);
        });
    }
    testAcquireLock() {
        return __awaiter(this, void 0, void 0, function* () {
            // Acquire lock for the first time
            yield this._lock.acquireLock(null, LOCK2, 3000, 1000);
            // Acquire lock for the second time
            try {
                yield this._lock.acquireLock(null, LOCK2, 3000, 1000);
                assert.fail("Expected exception on the second lock attempt");
            }
            catch (_a) {
                // Expected exception...
            }
            // Release the lock
            yield this._lock.releaseLock(null, LOCK2);
            // Acquire lock for the third time
            yield this._lock.acquireLock(null, LOCK2, 3000, 1000);
            yield this._lock.releaseLock(null, LOCK2);
        });
    }
    testReleaseLock() {
        return __awaiter(this, void 0, void 0, function* () {
            // Acquire lock for the first time
            let ok = yield this._lock.tryAcquireLock(null, LOCK3, 3000);
            assert.isTrue(ok);
            // Release the lock for the first time
            yield this._lock.releaseLock(null, LOCK3);
            // Release the lock for the second time
            yield this._lock.releaseLock(null, LOCK3);
        });
    }
}
exports.LockFixture = LockFixture;
//# sourceMappingURL=LockFixture.js.map