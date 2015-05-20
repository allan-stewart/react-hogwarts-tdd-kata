var should = {
  exist: function() {
    return require("should").exist
  },
  not: function() {
    return function(obj, msg){
      return require("should").not
    };
  }
}

should.not.exist = function() {
  return function(obj, msg){
    return require("should").not.exist
  };
}

global.should = should
