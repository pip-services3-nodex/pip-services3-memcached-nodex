import { ConfigParams } from 'pip-services3-commons-nodex';

import { MemcachedLock } from '../../src/lock/MemcachedLock';
import { LockFixture } from '../fixtures/LockFixture';

suite('MemcachedLock', ()=> {
    let _lock: MemcachedLock;
    let _fixture: LockFixture;

    setup(async () => {
        let host = process.env['MEMCACHED_SERVICE_HOST'] || 'localhost';
        let port = process.env['MEMCACHED_SERVICE_PORT'] || 11211;

        _lock = new MemcachedLock();

        let config = ConfigParams.fromTuples(
            'connection.host', host,
            'connection.port', port
        );
        _lock.configure(config);

        _fixture = new LockFixture(_lock);

        await _lock.open(null);
    });

    teardown(async () => {
        await _lock.close(null);
    });

    test('Try Acquire Lock', async () => {
        await _fixture.testTryAcquireLock();
    });

    test('Acquire Lock', async () => {
        await _fixture.testAcquireLock();
    });

    test('Release Lock', async () => {
        await _fixture.testReleaseLock();
    });

});
