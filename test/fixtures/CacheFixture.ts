const assert = require('chai').assert;

import { ICache } from 'pip-services3-components-nodex';

let KEY1: string = "key1";
let KEY2: string = "key2";

let VALUE1: string = "value1";
let VALUE2: string = "value2";

export class CacheFixture {
    private _cache: ICache = null;

    public constructor(cache: ICache) {
        this._cache = cache;
    }

    public async testStoreAndRetrieve(): Promise<void> {
        await this._cache.store(null, KEY1, VALUE1, 5000);
        await this._cache.store(null, KEY2, VALUE2, 5000);

        await new Promise(resolve => setTimeout(resolve, 500));

        let val = await this._cache.retrieve(null, KEY1)
        assert.isNotNull(val);
        assert.equal(VALUE1, val);

        val = await this._cache.retrieve(null, KEY2);
        assert.isNotNull(val);
        assert.equal(VALUE2, val);
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
