const assert = require('chai').assert;

import { ICache } from 'pip-services3-components-nodex';

let KEY1: string = "key1";
let KEY2: string = "key2";
let KEY3: string = "key3";
let KEY4: string = "key4";
let KEY5: string = "key5";
let KEY6: string = "key6";

let VALUE1: string = "value1";
let VALUE2 = { val: "value2" };
let VALUE3 = new Date();
let VALUE4 = [1, 2, 3, 4];
let VALUE5 = 12345;
let VALUE6 = null;


export class CacheFixture {
    private _cache: ICache = null;

    public constructor(cache: ICache) {
        this._cache = cache;
    }

    public async testStoreAndRetrieve(): Promise<void> {
        await this._cache.store(null, KEY1, VALUE1, 5000);
        await this._cache.store(null, KEY2, VALUE2, 5000);
        await this._cache.store(null, KEY3, VALUE3, 5000);
        await this._cache.store(null, KEY4, VALUE4, 5000);
        await this._cache.store(null, KEY5, VALUE5, 5000);
        await this._cache.store(null, KEY6, VALUE6, 5000);

        await new Promise(resolve => setTimeout(resolve, 500));

        let val = await this._cache.retrieve(null, KEY1)
        assert.isNotNull(val);
        assert.equal(VALUE1, val);

        val = await this._cache.retrieve(null, KEY2);
        assert.isNotNull(val);
        assert.equal(VALUE2.val, val.val);

        val = await this._cache.retrieve(null, KEY3);
        assert.isNotNull(val);
        assert.equal(VALUE3.toISOString(), val);

        val = await this._cache.retrieve(null, KEY4);
        assert.isNotNull(val);
        assert.lengthOf(val, 4)
        assert.equal(VALUE4[0], val[0]);

        val = await this._cache.retrieve(null, KEY5)
        assert.isNotNull(val);
        assert.equal(VALUE5, val);

        val = await this._cache.retrieve(null, KEY6);
        assert.isNull(val);
    }

    public async testRetrieveExpired(): Promise<void> {
        this._cache.store(null, KEY1, VALUE1, 1000);

        await new Promise(resolve => setTimeout(resolve, 1500));

        let val = await this._cache.retrieve(null, KEY1);
        assert.isNull(val || null);
    }
    
    public async testRemove(): Promise<void> {
        await this._cache.store(null, KEY1, VALUE1, 1000);

        await this._cache.remove(null, KEY1);

        let val = await this._cache.retrieve(null, KEY1);
        assert.isNull(val || null);
    }

}
