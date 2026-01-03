Object.prototype.inherit = function (Parent) {
  const F = function () {};
  F.prototype = Parent.prototype;
  this.prototype = new F();
  this.prototype.constructor = this;
  this.superclass = Parent.prototype;
  this.prototype._super = function () {
    Parent.apply(this, arguments);
  };
};

function Main() {
  // Количество пазлов по вертикали и горизонтали
  this.x = 10;
  this.y = 10;
}

Main.prototype.init = function () {
  var draw = SVG().addTo(".container").size(300, 300);
  var rect = draw.rect(100, 100);
  rect.attr({ fill: "rgba(255, 107, 166, 1)" });
  rect.click(function () {
    this.fill({ color: "#b32020ff" });
  });
};

Main.prototype.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Grid() {
  this._super();

  this.gridArr = [];
}

Grid.inherit(Main);

Grid.prototype.getRandomGridArr = function () {
  const arTopToBottom = [];
  const arLeftToRight = [];

  const x = this.x - 1;
  const y = this.y - 1;

  for (let i = 0; i <= y; i++) {
    const arLineX = [];
    for (let j = 0; j < x; j++) {
      arLineX.push(this.getRandomInt(0, 1));
    }
    arTopToBottom.push(arLineX);
  }

  for (let i = 0; i < x; i++) {
    const arLineY = [];
    for (let j = 0; j <= y; j++) {
      arLineY.push(this.getRandomInt(0, 1));
    }
    arLeftToRight.push(arLineY);
  }

  this.gridArr = [arTopToBottom, arLeftToRight];

  return [arTopToBottom, arLeftToRight];
};
