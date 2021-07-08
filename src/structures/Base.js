module.exports = class Base {
    
      /**
       * @param {import("../Client/Client")} client
       */
    constructor(client) {
      this.client = client
    }
    /** @private */
    _clone() {
      return Object.assign(Object.create(this), this);
    }
  
    /** @private */
    _patch(data) {
        return data;
    }

    /** @private */
    _update(data) {
      const clone = this._clone();
      this._patch(data);
      return clone;
    }
  
    /** @private */
    valueOf() {
      return this.id;
    }
  }
  