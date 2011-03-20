function SplitView(left,right,parent) {
  this._width = $(parent).width()
  this._parent = $(parent)
  this._right = $(right)
  this._left = $(left)
  console.log('new')
  this.init()
  return this
}
SplitView.prototype._init_handle = function() {
  this._parent.append("<div class='handle'></div>")
  this._handle = this._parent.children('.handle')
  this._handle.width(5)
  this._handle.height(this._parent.height())
  this._handle.css('left',this._left.width()-this._handle.width())
  this._handle.css('z-index',300)
  var self = this
  this._handle.draggable({containment: 'parent',drag:function(e,ui) {self.drag(e,ui)}})
}
SplitView.prototype._init_position = function() {
  this._parent.css('position','relative')
 
  this._right.css('position','absolute')
  this._left.css('position','absolute')

  this._left.css('z-index',200)
  this._right.css('z-index',100)
  this._left.css('left',0) 
  this._left.css('top',0) 

  this._right.css('left',0) 
  this._right.css('top',0) 
}
SplitView.prototype._init_dimensions = function() {
  var width = this._parent.width()
  this._right.width(width)
  this._left.width(width/2)

  var height = this._parent.height()
  this._right.height(height)
  this._left.height(height)
}

SplitView.prototype.init = function() {
  this._init_dimensions() // first - for size calc
  this._init_handle() // required for position
  this._init_position()
}
SplitView.prototype.right = function() {
  return this._right
}

SplitView.prototype.left = function() {
  return this._left
}

SplitView.prototype.drag = function(event, ui) {
  console.log(event)
  console.log(ui)

  var p = ui.position
  var width = this._parent.width()
  if (p.left > width) {
    this._left.width(width)
  } else if (p.left < 0){
    this._left.width(0)
  } else {
    this._left.width(p.left)
  }
};

