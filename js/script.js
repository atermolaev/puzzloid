Object.prototype.inherit = function (Parent) {
  const F = function () {};
  F.prototype = Parent.prototype;
  this.prototype = new F();
  this.prototype.constructor = this;
  this.superclass = Parent.prototype;
};

function Main() {}

Main.prototype.init = function () {
  var draw = SVG().addTo(".container").size(300, 300);
  var rect = draw.rect(100, 100);
  rect.attr({ fill: "#f06" });
  rect.click(function () {
    this.fill({ color: "#b32020ff" });
  });
};

function Box() {}

Box.inherit(Main);
