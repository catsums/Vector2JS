"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector2Line = void 0;
var MY = _interopRequireWildcard(require("@catsums/my"));
var _Vector = require("../Vector2/Vector2");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Vector2Line {
  a = 1;
  b = -1;
  c = 0;
  // f //x intercept
  // e //y intercept
  // m //gradient
  static get Y_AXIS() {
    return new Vector2Line(1, 0, 0);
  }
  static get X_AXIS() {
    return new Vector2Line(0, -1, 0);
  }
  static get ONE() {
    return new Vector2Line(1, -1, 0);
  }
  static get NEG_ONE() {
    return new Vector2Line(1, 1, 0);
  }
  get gradient() {
    return MY.safeDivide(-this.a, this.b);
  }
  get m() {
    return this.gradient;
  }
  get xIntercept() {
    return MY.safeDivide(-this.c, this.a);
  }
  get f() {
    return this.xIntercept;
  }
  get yIntercept() {
    return MY.safeDivide(-this.c, this.b);
  }
  get e() {
    return this.yIntercept;
  }
  constructor(x, y, z) {
    if (x instanceof _Vector.Vector2 && y instanceof _Vector.Vector2 || MY.isObject(x) && MY.isObject(y) || MY.isArray(x) && MY.isArray(y)) {
      //make line that passes through these points
      let a, b, c;
      let v1 = new _Vector.Vector2(x.x || x[0] || 0, x.y || x[1] || 0);
      let v2 = new _Vector.Vector2(y.x || y[0] || 0, y.y || y[1] || 0);
      let m = _Vector.Vector2.SUBTRACT(v2, v1).gradient();

      //y=mx+e
      //e = y - mx

      let e, f;
      if (MY.isInfinity(m)) {
        //vertical line
        c = -(v1.x || v2.x);
        b = 0;
        a = 1;
      } else if (m == 0) {
        //horizontal line
        a = 0;
        b = -1;
        c = v1.y || v2.y;
      } else {
        e = v1.y - m * v1.x;
        f = MY.safeDivide(-e, m);
        c = -(f * m);
        b = MY.safeDivide(-c, e) || 1;
        a = -(b * m);

        //
      }

      //finish and account for vertical and horizontal lines

      this.a = a;
      this.b = b;
      this.c = c;
    } else if (MY.isObject(x) && 'a' in x && 'b' in x && 'c' in x) {
      //use standard form
      let obj = x;
      this.a = obj.a;
      this.b = obj.b;
      this.c = obj.c;
    } else if (MY.isObject(x) && ('gradient' in x || 'm' in x) && ('e' in x || 'c' in x || 'yIntercept' in x)) {
      //use intercept form
      let obj = x;
      let a, b, c;
      let m = obj.gradient || obj.m || 0;
      let e = obj.e || obj.c || obj.yIntercept || 0;
      let f;
      if ('f' in obj || 'xIntercept' in obj) {
        f = obj.f || obj.xIntercept || 0;
        c = -(f * m);
      } else {
        c = 1;
        f = MY.safeDivide(-c, m);
      }
      b = MY.safeDivide(-c, e);
      a = -(b * m);
      this.a = a;
      this.b = b;
      this.c = c;
    } else if (MY.isObject(x) && ('f' in x || 'x' in x || 'c' in x || 'xIntercept' in x) && ('e' in x || 'y' in x || 'yIntercept' in x)) {
      //use intercept form but with actual intercepts
      let obj = x;
      let a, b, c;
      let e = obj.e || obj.c || obj.y || obj.yIntercept || 0;
      let f = obj.f || obj.x || obj.xIntercept || 0;
      let m = new _Vector.Vector2(0 - e, f - 0).gradient();
      c = -(f * m);
      b = MY.safeDivide(-c, e);
      a = -(b * m);
      this.a = a;
      this.b = b;
      this.c = c;
    } else if (MY.isNumber(x) && MY.isNumber(y)) {
      //treat as x and y intercepts

      let a, b, c;
      let e = y;
      let f = x;
      let m = new _Vector.Vector2(0 - e, f - 0).gradient();
      c = -(f * m);
      b = MY.safeDivide(-c, e);
      a = -(b * m);
      this.a = a;
      this.b = b;
      this.c = c;
    } else if (MY.isNumber(x) && MY.isNumber(y) && MY.isNumber(z)) {
      //treat as x and y intercepts

      let a, b, c;
      a = x;
      b = y;
      c = z;
      this.a = a;
      this.b = b;
      this.c = c;
    }
  }
  getX(y) {
    let x;
    if (this.b != 0) {
      let m = this.gradient;
      let e = this.yIntercept;

      //y = mx+e
      //x = (y - e)/m

      x = MY.safeDivide(y - e, m);
    } else {
      let c = this.c;
      let a = this.a;
      x = MY.safeDivide(-c, a);
    }
    return x;
  }
  getY(x) {
    let y;
    if (this.a != 0) {
      let m = this.gradient;
      let e = this.yIntercept;

      //y = mx+e
      //x = (y - e)/m

      y = m * x + e;
    } else {
      let c = this.c;
      let b = this.b;
      y = MY.safeDivide(-c, b);
    }
    return y;
  }
  equals(other) {
    return this.gradient == other.gradient && this.yIntercept == other.yIntercept && this.xIntercept == other.xIntercept;
  }
  isHorizontal() {
    return this.a === 0;
  }
  isVertical() {
    return this.b === 0;
  }
  hasPoint(point) {
    let v = new _Vector.Vector2(point);

    //ax+by+c=0

    let res;
    if (MY.isInfinity(this.a) && MY.isInfinity(this.b)) {
      if (a == b) {
        // INF + INF
        res = Infinity + this.c;
      } else {
        // INF - INF
        res = 0 + this.c;
      }
    } else {
      let ax = this.a * v.x;
      let by = this.b * v.y;
      let c = this.c;
      res = ax + by + c;
      res = Number(res);
    }
    return res == 0;
  }
  angle() {
    let xInt = this.xIntercept;
    let yInt = this.yIntercept;
    if (xInt == Infinity) return 0; //or Math.PI
    if (xInt == -Infinity) return Math.PI; //or Math.PI
    if (yInt == Infinity) return Math.PI / 2;
    if (yInt == -Infinity) return -(Math.PI / 2);
    let vx = new _Vector.Vector2(xInt, 0);
    let vy = new _Vector.Vector2(0, yInt);
    return vx.angleToPoint(vy);
  }
  static INTERSECT(l1, l2) {
    return l1.intersect(l2);
  }
  static INTERSECTS(arr) {
    if (!MY.isArray(arr) || !(arr[0] instanceof Vector2Line)) {
      return [];
    }
    let pts = [];
    for (let lineA of arr) {
      for (let lineB of arr) {
        if (lineA == lineB) continue;
        let ab = Vector2Line.INTERSECT(lineA, lineB);
        if (ab) pts.push(ab);
      }
    }
    return pts;
  }
  intersect(other) {
    //x = (b1c2-b2c1)/(a1b2-a2b1) = BC/AB
    //y = (a2c1-a1c2)/(a1b2-a2b1) = AC/AB

    if (other.gradient == this.gradient) {
      return null;
    }
    let a1 = this.a,
      a2 = other.a;
    let b1 = this.b,
      b2 = other.b;
    let c1 = this.c,
      c2 = other.c;
    let b1c2 = b1 * c2;
    let b2c1 = b2 * c1;
    let a1b2 = a1 * b2;
    let a2b1 = a2 * b1;
    let a2c1 = a2 * c1;
    let a1c2 = a1 * c2;
    let BC, AB, AC;
    if (MY.isInfinity(b1c2) && MY.isInfinity(b2c1) && b1c2 == b2c1) {
      BC = b1c2;
    } else {
      BC = b1c2 - b2c1;
    }
    if (MY.isInfinity(a1b2) && MY.isInfinity(a2b1) && a1b2 == a2b1) {
      AB = a1b2;
    } else {
      AB = a1b2 - a2b1;
    }
    if (MY.isInfinity(a2c1) && MY.isInfinity(a1c2) && a2c1 == a1c2) {
      AC = a2c1;
    } else {
      AC = a2c1 - a1c2;
    }

    // console.log({BC,AB,AC, l1:this,l2:other})

    let x = MY.safeDivide(BC, AB);
    let y = MY.safeDivide(AC, AB);

    // console.log({x,y})

    return new _Vector.Vector2(x, y);
  }
  perpendicular(point) {
    point = new _Vector.Vector2(point);
    if (this.a == 0) {
      let a = this.b,
        b = this.a,
        c = point.x;
      return new Vector2Line({
        a,
        b,
        c
      });
    } else if (this.b == 0) {
      let a = this.b,
        b = this.a,
        c = point.y;
      return new Vector2Line({
        a,
        b,
        c
      });
    } else {
      let m = MY.safeDivide(-1, this.gradient);
      let e = point.y + 1 / m * point.x;
      let f = MY.safeDivide(-e, m);
      return new Vector2Line({
        gradient: m,
        xIntercept: f,
        yIntercept: f
      });
    }
  }
  normal() {
    return new _Vector.Vector2(this.a, this.b);
  }
  mirror(point) {
    point = new _Vector.Vector2(point);
    if (this.hasPoint(point)) {
      return new _Vector.Vector2(point);
    }
    let _normal = this.normal();
    let unitNormal = _normal.normalized();
    let unitC = MY.safeDivide(this.c, _normal.length());
    let signedDist = unitNormal.x * point.x + unitNormal.y * point.y + unitC;
    let mx = point.x - 2 * unitNormal.x * signedDist;
    let my = point.y - 2 * unitNormal.y * signedDist;
    return new _Vector.Vector2(mx, my);
  }
  asObject() {
    return {
      a: this.a,
      b: this.b,
      c: this.c
    };
  }
  toString() {
    return `(${this.a}x + ${this.b}y + ${this.c})`;
  }
  toJSON() {
    return this.asObject();
  }
}
exports.Vector2Line = Vector2Line;