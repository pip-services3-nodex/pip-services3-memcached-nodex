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
let KEY3 = "key3";
let KEY4 = "key4";
let KEY5 = "key5";
let KEY6 = "key6";
let VALUE1 = "value1";
let VALUE2 = { val: "value2" };
let VALUE3 = new Date();
let VALUE4 = [1, 2, 3, 4];
let VALUE5 = 12345;
let VALUE6 = null;
class CacheFixture {
    constructor(cache) {
        this._cache = null;
        this._cache = cache;
    }
    testStoreAndRetrieve() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._cache.store(null, KEY1, VALUE1, 5000);
            yield this._cache.store(null, KEY2, VALUE2, 5000);
            yield this._cache.store(null, KEY3, VALUE3, 5000);
            yield this._cache.store(null, KEY4, VALUE4, 5000);
            yield this._cache.store(null, KEY5, VALUE5, 5000);
            yield this._cache.store(null, KEY6, VALUE6, 5000);
            yield new Promise(resolve => setTimeout(resolve, 500));
            let val = yield this._cache.retrieve(null, KEY1);
            assert.isNotNull(val);
            assert.equal(VALUE1, val);
            val = yield this._cache.retrieve(null, KEY2);
            assert.isNotNull(val);
            assert.equal(VALUE2.val, val.val);
            val = yield this._cache.retrieve(null, KEY3);
            assert.isNotNull(val);
            assert.equal(VALUE3.toISOString(), val);
            val = yield this._cache.retrieve(null, KEY4);
            assert.isNotNull(val);
            assert.lengthOf(val, 4);
            assert.equal(VALUE4[0], val[0]);
            val = yield this._cache.retrieve(null, KEY5);
            assert.isNotNull(val);
            assert.equal(VALUE5, val);
            val = yield this._cache.retrieve(null, KEY6);
            assert.isNull(val);
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