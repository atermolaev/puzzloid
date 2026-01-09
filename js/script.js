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

  // Размеры блока с новыми пазлами
  this.choiserWidth = 200;
  this.choiserHeight = 500;

  // Размеры контейнера для игры
  this.containerWidth = this.canvasWidth + this.choiserWidth + 100;
  this.containerHeight = this.canvasHeight + 100;

  this.box = jQuery('.container');
  this.box.css('margin', '0 auto');
  this.box.css('display', 'flex');
  this.box.css('justify-content', 'space-around');
  this.box.css('width', `${this.containerWidth}px`);
  this.box.css('height', `${this.containerHeight}px`);
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

function PuzzlCanvas(){
  this._super();
  
  this.draw = SVG()
    .attr({ inherit: null })
    .addTo(".container")
    .size(this.containerWidth, this.containerHeight);
  
  var rect = this.draw.rect(100, 100);
  rect.attr({ inherit: null, fill: "rgba(255, 107, 166, 1)" });
  rect.click(function () {
    this.fill({ color: "#b32020ff" });
  });

}

PuzzlCanvas.inherit(Main);

PuzzlCanvas.prototype.drawInit = function() {
  this.box.css('border', '1px solid #000000');
  this.drawCompliteBox();
}

PuzzlCanvas.prototype.drawCompliteBox = function() {
  $(this.box).append('<div class="compliteBox"></div>');
}
