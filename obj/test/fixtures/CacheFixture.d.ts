import { ICache } from 'pip-services3-components-nodex';
export declare class CacheFixture {
    private _cache;
    constructor(cache: ICache);
    testStoreAndRetrieve(): Promise<void>;
    testRetrieveExpired(): Promise<void>;
    testRemove(): Promise<void>;
}
