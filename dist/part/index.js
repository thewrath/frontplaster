function FrontPlaster() {
  this.version = "1.0.0";
}

FrontPlaster.prototype.init = function (callback) {
  callback();
};

FrontPlaster.prototype.update = function (callback) {
  window.document.onload = callback();
};