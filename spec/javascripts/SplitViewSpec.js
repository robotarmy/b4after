describe("SplitView", function() {
  var sp = null
  beforeEach(function() {
    loadFixtures('SplitView.html')
    sp = new SplitView('.left','.right','.photobox')
  })

  describe('defaults', function() {
    it("has a parent width set", function() {
      expect(sp._parent.width()).toBeTruthy()
    })
    it("left has > z-index than right", function() {
      expect(sp.left().css('z-index')).toBeGreaterThan(sp.right().css('z-index'))
    })
    it("handle has z-index than  left ", function() {
      expect(Number(sp._handle.css('z-index'))).toEqual(Number(sp.left().css('z-index')) + 100)
    })
    it("split view defaults to middle", function() {
      expect(sp.left().width()).toEqual(sp._parent.width()/2)
      // right is size of parent
      // and under left
      expect(sp.right().width()).toEqual(sp._parent.width())
    })
    it("inherits height of parent", function() {
      expect(sp.left().height()).toEqual(sp._parent.height())
      expect(sp.right().height()).toEqual(sp._parent.height())
    })

    it("makes parent relative position", function() {
      expect(sp._parent.css('position')).toEqual('relative')
    })

    it("makes children absolute position",function() {
      expect(sp.right().css('position')).toEqual('absolute')
      expect(sp.left().css('position')).toEqual('absolute')
    })

    it("has a left child at left 0, top 0", function() {
      expect(sp.left().position().left).toEqual(0)
      expect(sp.left().position().top).toEqual(0)
    })

    it("has a right child at left 0, top 0", function() {
      expect(sp.right().position().left).toEqual(0)
      expect(sp.right().position().top).toEqual(0)

    })
    it("has dragable handle",function() {
     expect(sp._handle.hasClass('ui-draggable')).toBeTruthy()
     expect(sp._handle.width()).toEqual(5)
     expect(sp._handle.height()).toEqual(sp.left().height())
     expect(sp._handle.position()).toEqual({top:0, left:sp.left().width()-5})
    })
  })

  describe("doesn't go out of upper bounds (drag right)",function() {
    var left_abs = 999
    var width = null
    beforeEach(function() {
      width = sp._parent.width()
      // Absolute postition left
      sp.drag({},{position:{left:left_abs}})
    });

    it("updates width of left to make it apear moving over right",function() {
      expect(sp.left().width()).toEqual(width)
    })

    it("doesn't change right",function() {
      expect(sp.right().width()).toEqual(width)
    })
  })
  describe("doesn't go out of upper bounds",function() {
    var left_abs = 999
    var width = null
    beforeEach(function() {
      width = sp._parent.width()
      // Absolute postition left
      sp._handle.css('left',left_abs) // simulate handle move
      sp.drag({},{position:{left:left_abs}})
    });

    it("keeps bounds on left",function() {
      expect(sp.left().width()).toEqual(width)
    })
  })

  describe("updates the size of the left and right on drag to the right",function() {
    var left_abs = 810
    var width = null
    beforeEach(function() {
      width = sp._parent.width()
      // Absolute postition left
      sp.drag({},{position:{left:left_abs}})
    });

    it("updates width of left to make it apear moving over right",function() {
      expect(sp.left().width()).toEqual(left_abs)
    })
  })
  describe("updates the size of the left and right on drag to the left",function() {
    var left_abs = 10
    var width = null
    beforeEach(function() {
      width = sp._parent.width()
      // Absolute postition left
      sp.drag({},{position:{left:left_abs}})
    });

    it("updates left",function() {
      expect(sp.left().width()).toEqual(left_abs)
    })

  })
   describe("doesn't go below lower bound - drag left",function() {
    var left_abs = -110
    var width = null
    beforeEach(function() {
      width = sp._parent.width()
      // Absolute postition left
      sp._handle.css('left',left_abs) // simulate handle move
      sp.drag({},{position:{left:left_abs}})
    });

    it("keeps bounds on left",function() {
      expect(sp.left().width()).toEqual(0)
    })
  })

});
