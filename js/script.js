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

Main.prototype.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Grid(xlength, ylength) {
  this.x = xlength - 1;
  this.y = ylength - 1;
  this.gridArr = [];
}

Grid.inherit(Main);

Grid.prototype.getRandomGridArr = function () {
  const arTopToBottom = [];
  const arLeftToRight = [];

  for (let i = 0; i <= this.y; i++) {
    const arLineX = [];
    for (let j = 0; j < this.x; j++) {
      arLineX.push(this.getRandomInt(0, 1));
    }
    arTopToBottom.push(arLineX);
  }

  for (let i = 0; i < this.x; i++) {
    const arLineY = [];
    for (let j = 0; j <= this.y; j++) {
      arLineY.push(this.getRandomInt(0, 1));
    }
    arLeftToRight.push(arLineY);
  }

  this.gridArr = [arTopToBottom, arLeftToRight];
};
