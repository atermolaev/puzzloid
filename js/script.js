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

  // Размеры полотна для сбора пазлов
  this.canvasWidth = 500;
  this.canvasHeight = 500;

  // Данные блока с новыми пазлами
  this.choiserWidth = 150;
  this.choiserHeight = 525;
  this.choiserX = 575;
  this.choiserY = 25;

  // Данные бока для сбора пазлов
  this.complitedWidth = 525;
  this.complitedHeight = 525;
  this.complitedX = 25;
  this.complitedY = 25;

  // Размеры контейнера для игры
  this.containerWidth = this.canvasWidth + this.choiserWidth + 100;
  this.containerHeight = this.canvasHeight + 75;

  this.box = jQuery(".container");
  this.box.css("margin", "0 auto");
  this.box.css("display", "flex");
  this.box.css("justify-content", "space-around");
  this.box.css("width", `${this.containerWidth}px`);
  this.box.css("height", `${this.containerHeight}px`);

  this.colorMainBorder = "#ABABAB";
  this.colorInnerBoxesBG = "#FFFFFF";
}

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

function PuzzlCanvas() {
  this._super();

  this.draw = SVG()
    .attr({ inherit: null })
    .addTo(".container")
    .size(this.containerWidth, this.containerHeight);
}

PuzzlCanvas.inherit(Main);

PuzzlCanvas.prototype.drawInit = function () {
  this.box.css("border", `1px solid ${this.colorMainBorder}`);
  this.drawChoiserBox();
  this.drawComplitedCanvas();
  this.drawFirstPuzzl();
};

PuzzlCanvas.prototype.drawFirstPuzzl = function () {
  const colorLightRed = "rgba(255, 107, 166, 1)";
  const colorRed = "rgba(235, 7, 15, 1)";

  const puzzl = this.draw
    .path("M 0 0 L 100 0 L 100 100 L 0 100 Z")
    .move(100, 100);

  puzzl.attr({ inherit: null, x: 100, y: 100 }).fill(colorLightRed);
  puzzl.click(function () {
    const currentColor = puzzl.attr("fill");

    this.fill({
      color: currentColor === colorLightRed ? colorRed : colorLightRed,
    });
  });
};

// Рисум бокс для приходящих пазлов
PuzzlCanvas.prototype.drawChoiserBox = function () {
  const choiserRect = this.draw.rect(this.choiserWidth, this.choiserHeight);
  choiserRect
    .attr({
      inherit: null,
      x: this.choiserX,
      y: this.choiserY,
      fill: this.colorInnerBoxesBG,
    })
    .stroke({ width: 1, color: this.colorMainBorder });
};

PuzzlCanvas.prototype.drawComplitedCanvas = function () {
  const complitedRect = this.draw.rect(
    this.complitedWidth,
    this.complitedHeight,
  );
  complitedRect
    .attr({
      inherit: null,
      x: this.complitedX,
      y: this.complitedY,
      fill: this.colorInnerBoxesBG,
    })
    .stroke({ width: 1, color: this.colorMainBorder });
};
