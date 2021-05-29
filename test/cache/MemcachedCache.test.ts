let process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';

import { MemcachedCache } from '../../src/cache/MemcachedCache';
import { CacheFixture } from '../fixtures/CacheFixture';

suite('MemcachedCache', ()=> {
    let _cache: MemcachedCache;
    let _fixture: CacheFixture;

    setup(async () => {
        let host = process.env['MEMCACHED_SERVICE_HOST'] || 'localhost';
        let port = process.env['MEMCACHED_SERVICE_PORT'] || 11211;

        _cache = new MemcachedCache();

        let config = ConfigParams.fromTuples(
            'connection.host', host,
            'connection.port', port
        );
        _cache.configure(config);

        _fixture = new CacheFixture(_cache);

        await _cache.open(null);
    });

    teardown(async () => {
        await _cache.close(null);
    });

    test('Store and Retrieve', async () => {
        await _fixture.testStoreAndRetrieve();
    });    

    test('Retrieve Expired', async () => {
        await _fixture.testRetrieveExpired();
    });    

    test('Remove', async () => {
        await _fixture.testRemove();
    });    
    
});
