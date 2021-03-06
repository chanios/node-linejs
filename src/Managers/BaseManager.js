'use strict';

const Collection = require('../util/Collection');

/**
 * Manages the API methods of a data model and holds its cache.
 * @abstract
 */
class BaseManager {
  constructor(client, iterable, Structure, cacheType = Collection, ...cacheOptions) {
    /**
     * The data structure belonging to this manager
     * @name BaseManager#holds
     * @type {Function}
     * @private
     * @readonly
     */
    Object.defineProperty(this, 'holds', { value: Structure });

    /**
     * The client that instantiated this Manager
     * @name BaseManager#client
     * @type {import("../Client/Client")}
     * @readonly
     */
    Object.defineProperty(this, 'client', { value: client });

    /**
     * The type of Collection of the Manager
     * @type {Collection}
     */
    this.cacheType = cacheType;

    /**
     * Holds the cache for the data model
     * @type {Collection}
     * @private
     */
    this.cache = new cacheType(...cacheOptions);
    if (iterable) for (const i of iterable) this.add(i);
  }

  add(data, cache = true, { id, extras = [] } = {}) {
    const existing = this.cache.get(id || data.id);
    if (existing && existing._patch && cache) existing._patch(data);
    if (existing) return existing;

    const entry = this.holds ? new this.holds(this.client, data, ...extras) : data;
    if (cache) this.cache.set(id || entry.id, entry);
    return entry;
  }

  /**
   * Resolves a data entry to a data Object.
   * @param {string|Object} idOrInstance The id or instance of something in this Manager
   * @returns {?Object} An instance from this Manager
   */
  resolve(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance;
    if (typeof idOrInstance === 'string') return this.cache.get(idOrInstance) || null;
    return null;
  }

  /**
   * Resolves a data entry to an instance ID.
   * @param {string|Object} idOrInstance The id or instance of something in this Manager
   * @returns {?Snowflake}
   */
  resolveID(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance.id;
    if (typeof idOrInstance === 'object' && idOrInstance.id) return idOrInstance.id;
    if (typeof idOrInstance === 'string') return idOrInstance;
    return null;
  }

  valueOf() {
    return this.cache;
  }
}

module.exports = BaseManager;