/** @module build */
import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { MemcachedCache } from '../cache/MemcachedCache';
import { MemcachedLock } from '../lock/MemcachedLock';

/**
 * Creates Redis components by their descriptors.
 * 
 * @see [[MemcachedCache]]
 * @see [[MemcachedLock]]
 */
export class DefaultMemcachedFactory extends Factory {
	private static readonly MemcachedCacheDescriptor = new Descriptor("pip-services", "cache", "memcached", "*", "1.0");
	private static readonly MemcachedLockDescriptor = new Descriptor("pip-services", "lock", "memcached", "*", "1.0");

	/**
	 * Create a new instance of the factory.
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultMemcachedFactory.MemcachedCacheDescriptor, MemcachedCache);
		this.registerAsType(DefaultMemcachedFactory.MemcachedLockDescriptor, MemcachedLock);
	}
}