(function() {
  var db;

  function LocalStorage() {}
  db = LocalStorage;

  db.prototype.getItem = function(key: any) {
    if (this.hasOwnProperty(key)) {
      return String(this[key]);
    }
    return null;
  };

  db.prototype.setItem = function(key: any, val: any) {
    this[key] = String(val);
  };

  db.prototype.removeItem = function(key: any) {
    delete this[key];
  };

  db.prototype.clear = function() {
    var self = this;
    Object.keys(self).forEach(function(key) {
      self[key] = undefined;
      delete self[key];
    });
  };

  db.prototype.key = function(i: any) {
    i = i || 0;
    return Object.keys(this)[i];
  };

  db.prototype.__defineGetter__('length', function() {
    return Object.keys(this).length;
  });

  const g: any = global;

  if (g.localStorage) {
    module.exports = localStorage;
  } else {
    module.exports = new (LocalStorage as any)();
  }
})();
