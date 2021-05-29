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
exports.CacheFixture = void 0;
const assert = require('chai').assert;
let KEY1 = "key1";
let KEY2 = "key2";
let VALUE1 = "value1";
let VALUE2 = "value2";
class CacheFixture {
    constructor(cache) {
        this._cache = null;
        this._cache = cache;
    }
    testStoreAndRetrieve() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._cache.store(null, KEY1, VALUE1, 5000);
            yield this._cache.store(null, KEY2, VALUE2, 5000);
            yield new Promise(resolve => setTimeout(resolve, 500));
            let val = yield this._cache.retrieve(null, KEY1);
            assert.isNotNull(val);
            assert.equal(VALUE1, val);
            val = yield this._cache.retrieve(null, KEY2);
            assert.isNotNull(val);
            assert.equal(VALUE2, val);
        });
    }
    testRetrieveExpired() {
        return __awaiter(this, void 0, void 0, function* () {
            this._cache.store(null, KEY1, VALUE1, 1000);
            yield new Promise(resolve => setTimeout(resolve, 1500));
            let val = yield this._cache.retrieve(null, KEY1);
            assert.isNull(val || null);
        });
    }
    testRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._cache.store(null, KEY1, VALUE1, 1000);
            yield this._cache.remove(null, KEY1);
            let val = yield this._cache.retrieve(null, KEY1);
            assert.isNull(val || null);
        });
    }
}
exports.CacheFixture = CacheFixture;
//# sourceMappingURL=CacheFixture.js.map