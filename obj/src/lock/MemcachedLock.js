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
exports.MemcachedLock = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_components_nodex_2 = require("pip-services3-components-nodex");
/**
 * Distributed lock that implemented based on Memcaches caching service.
 *
 * The current implementation does not support authentication.
 *
 * ### Configuration parameters ###
 *
 * - connection(s):
 *   - discovery_key:         (optional) a key to retrieve the connection from [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/connect.idiscovery.html IDiscovery]]
 *   - host:                  host name or IP address
 *   - port:                  port number
 *   - uri:                   resource URI or connection string with all parameters in it
 * - options:
 *   - retry_timeout:         timeout in milliseconds to retry lock acquisition. (Default: 100)
 *   - max_size:              maximum number of values stored in this cache (default: 1000)
 *   - max_key_size:          maximum key length (default: 250)
 *   - max_expiration:        maximum expiration duration in milliseconds (default: 2592000)
 *   - max_value:             maximum value length (default: 1048576)
 *   - pool_size:             pool size (default: 5)
 *   - reconnect:             reconnection timeout in milliseconds (default: 10 sec)
 *   - retries:               number of retries (default: 3)
 *   - timeout:               default caching timeout in milliseconds (default: 1 minute)
 *   - failures:              number of failures before stop retrying (default: 5)
 *   - retry:                 retry timeout in milliseconds (default: 30 sec)
 *   - idle:                  idle timeout before disconnect in milliseconds (default: 5 sec)
 *
 * ### References ###
 *
 * - <code>\*:discovery:\*:\*:1.0</code>        (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/connect.idiscovery.html IDiscovery]] services to resolve connection
 *
 * ### Example ###
 *
 *     let lock = new MemcachedLock();
 *     lock.configure(ConfigParams.fromTuples(
 *       "host", "localhost",
 *       "port", 11211
 *     ));
 *
 *     await lock.open("123");
 *
 *     await lock.acquire("123", "key1");
 *     try {
 *       // Processing...
 *     } finally {
 *       await lock.releaseLock("123", "key1");
 *     }
 */
class MemcachedLock extends pip_services3_components_nodex_2.Lock {
    constructor() {
        super(...arguments);
        this._connectionResolver = new pip_services3_components_nodex_1.ConnectionResolver();
        this._maxKeySize = 250;
        this._maxExpiration = 2592000;
        this._maxValue = 1048576;
        this._poolSize = 5;
        this._reconnect = 10000;
        this._timeout = 5000;
        this._retries = 5;
        this._failures = 5;
        this._retry = 30000;
        this._remove = false;
        this._idle = 5000;
        this._client = null;
    }
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config) {
        super.configure(config);
        this._connectionResolver.configure(config);
        this._maxKeySize = config.getAsIntegerWithDefault('options.max_key_size', this._maxKeySize);
        this._maxExpiration = config.getAsLongWithDefault('options.max_expiration', this._maxExpiration);
        this._maxValue = config.getAsLongWithDefault('options.max_value', this._maxValue);
        this._poolSize = config.getAsIntegerWithDefault('options.pool_size', this._poolSize);
        this._reconnect = config.getAsIntegerWithDefault('options.reconnect', this._reconnect);
        this._timeout = config.getAsIntegerWithDefault('options.timeout', this._timeout);
        this._retries = config.getAsIntegerWithDefault('options.retries', this._retries);
        this._failures = config.getAsIntegerWithDefault('options.failures', this._failures);
        this._retry = config.getAsIntegerWithDefault('options.retry', this._retry);
        this._remove = config.getAsBooleanWithDefault('options.remove', this._remove);
        this._idle = config.getAsIntegerWithDefault('options.idle', this._idle);
    }
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references) {
        this._connectionResolver.setReferences(references);
    }
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen() {
        return this._client;
    }
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    open(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let connections = yield this._connectionResolver.resolveAll(correlationId);
            if (connections.length == 0) {
                throw new pip_services3_commons_nodex_2.ConfigException(correlationId, 'NO_CONNECTION', 'Connection is not configured');
            }
            let servers = [];
            for (let connection of connections) {
                let host = connection.getHost();
                let port = connection.getPort() || 11211;
                servers.push(host + ':' + port);
            }
            let options = {
                maxKeySize: this._maxKeySize,
                maxExpiration: this._maxExpiration,
                maxValue: this._maxValue,
                poolSize: this._poolSize,
                reconnect: this._reconnect,
                timeout: this._timeout,
                retries: this._retries,
                failures: this._failures,
                retry: this._retry,
                remove: this._remove,
                idle: this._idle
            };
            let Memcached = require('memcached');
            this._client = new Memcached(servers, options);
        });
    }
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    close(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            this._client = null;
        });
    }
    checkOpened(correlationId) {
        if (!this.isOpen()) {
            throw new pip_services3_commons_nodex_1.InvalidStateException(correlationId, 'NOT_OPENED', 'Connection is not opened');
        }
    }
    /**
     * Makes a single attempt to acquire a lock by its key.
     * It returns immediately a positive or negative result.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique lock key to acquire.
     * @param ttl               a lock timeout (time to live) in milliseconds.
     * @returns <code>true</code> if lock was successfull and <code>false</code> otherwise.
     */
    tryAcquireLock(correlationId, key, ttl) {
        this.checkOpened(correlationId);
        let lifetimeInSec = ttl / 1000;
        return new Promise((resolve, reject) => {
            this._client.add(key, 'lock', lifetimeInSec, (err) => {
                if (err != null && err.message && err.message.indexOf('not stored') >= 0) {
                    resolve(false);
                }
                else if (err != null) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    /**
     * Releases prevously acquired lock by its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique lock key to release.
     */
    releaseLock(correlationId, key) {
        this.checkOpened(correlationId);
        return new Promise((resolve, reject) => {
            this._client.del(key, (err) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}
exports.MemcachedLock = MemcachedLock;
//# sourceMappingURL=MemcachedLock.js.map