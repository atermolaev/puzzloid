Object.prototype.inherit = function(Parent){
    const F = function() { }
    F.prototype = Parent.prototype
    this.prototype = new F()
    this.prototype.constructor = this
    this.superclass = Parent.prototype
}

function Main() {

}

Main.prototype.method = function(param){
    return `param: ${param}`;
}

function Box() {

}

Box.inherit(Main);