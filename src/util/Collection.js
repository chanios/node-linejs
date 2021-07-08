
const BaseCollection = require('@discordjs/collection');
const Util = require('./Util');

class Collection extends BaseCollection {
  toJSON() {
    return this.map(e => (typeof e?.toJSON === 'function' ? e.toJSON() : Util.flatten(e)));
  }
}

module.exports = Collection;