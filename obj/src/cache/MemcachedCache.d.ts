/** @module cache */
import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { IOpenable } from 'pip-services3-commons-nodex';
import { ICache } from 'pip-services3-components-nodex';
/**
 * Distributed cache that stores values in Memcaches caching service.
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
 *     let cache = new MemcachedCache();
 *     cache.configure(ConfigParams.fromTuples(
 *       "host", "localhost",
 *       "port", 11211
 *     ));
 *
 *     await cache.open("123");
 *
 *     await cache.store("123", "key1", "ABC");
 *     let value = await cache.store("123", "key1"); // Result: "ABC"
 */
export declare class MemcachedCache implements ICache, IConfigurable, IReferenceable, IOpenable {
    private _connectionResolver;
    private _maxKeySize;
    private _maxExpiration;
    private _maxValue;
    private _poolSize;
    private _reconnect;
    private _timeout;
    private _retries;
    private _failures;
    private _retry;
    private _remove;
    private _idle;
    private _client;
    /**
     * Creates a new instance of this cache.
     */
    constructor();
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references: IReferences): void;
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen(): boolean;
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    open(correlationId: string): Promise<void>;
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    close(correlationId: string): Promise<void>;
    private checkOpened;
    /**
     * Retrieves cached value from the cache using its key.
     * If value is missing in the cache or expired it returns null.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique value key.
     * @returns a cached value or <code>null</code> if nothing was found.
     */
    retrieve(correlationId: string, key: string): Promise<any>;
    /**
     * Stores value in the cache with expiration time.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique value key.
     * @param value             a value to store.
     * @param timeout           expiration timeout in milliseconds.
     * @returns the stored value
     */
    store(correlationId: string, key: string, value: any, timeout: number): Promise<any>;
    /**
     * Removes a value from the cache by its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique value key.
     * @returns the deleted value.
     */
    remove(correlationId: string, key: string): Promise<any>;
}
