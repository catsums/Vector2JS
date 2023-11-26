(function (g, f) {
    if ("object" == typeof exports && "object" == typeof module) {
      module.exports = f();
    } else if ("function" == typeof define && define.amd) {
      define("VECTOR2", [], f);
    } else if ("object" == typeof exports) {
      exports["VECTOR2"] = f();
    } else {
      g["VECTOR2"] = f();
    }
  }(this, () => {
var exports = {};
var module = { exports };
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod3) => __copyProps(__defProp({}, "__esModule", { value: true }), mod3);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Rect2: () => Rect2,
  Transform2: () => Transform2,
  Vector2: () => Vector2,
  Vector2Line: () => Vector2Line,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/MY.ts
function mod(n, m) {
  return (n % m + m) % m;
}
__name(mod, "mod");
function safeDivide(a, b, useNaN = false) {
  let INF = Infinity;
  let res;
  if (a == 0 && b == 0) {
    if (useNaN)
      res = NaN;
    else
      res = 0;
  } else if (a == 0 && isInfinity(b)) {
    res = 0 * 1;
  } else if (isInfinity(a) && b == 0) {
    res = a * 1;
  } else if (isInfinity(a) && isInfinity(b)) {
    if (useNaN)
      res = NaN;
    else if (a == b)
      res = 1;
    else
      res = -1;
  } else if (b == 0) {
    if (useNaN)
      res = NaN;
    res = INF * a;
  } else if (isInfinity(b)) {
    if (useNaN)
      res = NaN;
    res = 0 * a;
  } else {
    res = a / b;
  }
  return res;
}
__name(safeDivide, "safeDivide");
function isInfinity(x) {
  return x === -Infinity || x === Infinity;
}
__name(isInfinity, "isInfinity");
function roundTo(num, step) {
  if (step == 0)
    return num;
  if (isInfinity(step))
    return Infinity;
  let invStep = Math.pow(step, -1);
  let invMiniStep = Math.pow(step / 10, -1);
  let initNum = Math.round(num * invMiniStep) / invMiniStep;
  let init = Math.round(initNum * invStep) / invStep;
  let res = Math.round((init + Number.EPSILON) * invStep) / invStep;
  return res;
}
__name(roundTo, "roundTo");

// src/Vector2.ts
var Vector2 = class _Vector2 {
  static {
    __name(this, "Vector2");
  }
  x;
  y;
  static get ZERO() {
    return new _Vector2(0, 0);
  }
  static get ONE() {
    return new _Vector2(1, 1);
  }
  static get NEG_ONE() {
    return new _Vector2(-1, -1);
  }
  static get INF() {
    return new _Vector2(Infinity, Infinity);
  }
  static get NEG_INF() {
    return new _Vector2(-Infinity, -Infinity);
  }
  static get EPSILON() {
    return new _Vector2(Number.MIN_VALUE, Number.MIN_VALUE);
  }
  static get UP() {
    return new _Vector2(0, -1);
  }
  static get DOWN() {
    return new _Vector2(0, 1);
  }
  static get LEFT() {
    return new _Vector2(-1, 0);
  }
  static get RIGHT() {
    return new _Vector2(1, 0);
  }
  static ADD(v1, v2) {
    return new _Vector2(v1.x + v2.x, v1.y + v2.y);
  }
  add(other) {
    this.x += other.x;
    this.y += other.y;
  }
  static SUBTRACT(v1, v2) {
    return new _Vector2(v1.x - v2.x, v1.y - v2.y);
  }
  subtract(other) {
    this.x -= other.x;
    this.y -= other.y;
  }
  static MULTIPLY(v1, v2) {
    if (typeof v2 === "number")
      v2 = new _Vector2(v2, v2);
    return new _Vector2(v1.x * v2.x, v1.y * v2.y);
  }
  multiply(other) {
    if (typeof other === "number") {
      return this.scaled(other);
    }
    this.x *= other.x;
    this.y *= other.y;
  }
  static DIVIDE(v1, v2) {
    if (typeof v2 === "number")
      v2 = new _Vector2(v2, v2);
    return new _Vector2(v1.x / v2.x, v1.y / v2.y);
  }
  divide(other) {
    if (typeof other === "number") {
      return this.scaled(1 / other);
    }
    this.x /= other.x;
    this.y /= other.y;
  }
  static SCALE(v1, n) {
    return new _Vector2(v1.x * n, v1.y * n);
  }
  scaleBy(n) {
    this.x *= n;
    this.y *= n;
  }
  scaled(n) {
    return new _Vector2(this.x * n, this.y * n);
  }
  static MOD(v1, v2) {
    return new _Vector2(
      mod(v1.x, v2.x),
      mod(v1.y, v2.y)
    );
  }
  mod(other) {
    this.x = mod(this.x, other.x);
    this.y = mod(this.y, other.y);
  }
  static MODBY(v1, n) {
    return new _Vector2(
      mod(v1.x, n),
      mod(v1.y, n)
    );
  }
  modBy(n) {
    this.x = mod(this.x, n);
    this.y = mod(this.y, n);
  }
  static DOT(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  static EQUALS(v1, v2, precision = 0) {
    let p = precision;
    if (v1 === v2)
      return true;
    if (!v1 || !v2)
      return false;
    if (v1?.x === v2?.x && v1?.y === v2?.y)
      return true;
    if (roundTo(v1.x, p) === roundTo(v2.x, p) && roundTo(v1.y, p) === roundTo(v2.y, p))
      return true;
    if (Math.abs(v1?.x - v2?.x) < Number.EPSILON && Math.abs(v1?.y - v2?.y) < Number.EPSILON)
      return true;
    return false;
  }
  equals(other, precision = 0) {
    return _Vector2.EQUALS(this, other, precision);
  }
  static SortAlgo(a, b) {
    if (a.isGreaterThan(b))
      return 1;
    else if (a.isLesserThan(b))
      return -1;
    return 0;
  }
  static SortAlgoX(a, b) {
    if (a.x > b.x)
      return 1;
    else if (a.x < b.x)
      return -1;
    return 0;
  }
  static SortAlgoY(a, b) {
    if (a.y > b.y)
      return 1;
    else if (a.y < b.y)
      return -1;
    return 0;
  }
  static SortAlgoXY(a, b) {
    if (a.x > b.x)
      return 1;
    else if (a.x < b.x)
      return -1;
    if (a.y > b.y)
      return 1;
    else if (a.y < b.y)
      return -1;
    return 0;
  }
  static SortAlgoYX(a, b) {
    if (a.y > b.y)
      return 1;
    else if (a.y < b.y)
      return -1;
    if (a.x > b.x)
      return 1;
    else if (a.x < b.x)
      return -1;
    return 0;
  }
  static SortAlgoAvg(a, b) {
    let x, y;
    if (a.x > b.x)
      x = 1;
    else if (a.x < b.x)
      x = -1;
    else
      x = 0;
    if (a.y > b.y)
      y = 1;
    else if (a.y < b.y)
      y = -1;
    else
      y = 0;
    let avg = x + y / 2;
    return Math.trunc(avg);
  }
  constructor(...args) {
    if (args[0] instanceof Object) {
      let v = args[0];
      this.x = v?.x || 0;
      this.y = v?.y || 0;
    } else if (args[0] instanceof Array) {
      let arr = args[0];
      this.x = arr[0];
      this.y = arr[1];
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      let [x, y] = args;
      this.x = x;
      this.y = y;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }
  abs() {
    var v = new _Vector2(Math.abs(this.x), Math.abs(this.y));
    return v;
  }
  lengthSquared() {
    var llengthSquared = Math.pow(this.x, 2) + Math.pow(this.y, 2);
    return llengthSquared;
  }
  length() {
    return Math.sqrt(this.lengthSquared());
  }
  lerp(other, t) {
    let x = this.x + (other.x - this.x) * t;
    let y = this.y + (other.y - this.y) * t;
    return new _Vector2(x, y);
  }
  sumOfParts() {
    return this.x + this.y;
  }
  ratioed() {
    var sum = this.sumOfParts();
    return new _Vector2(
      safeDivide(this.x, sum),
      safeDivide(this.y, sum)
    );
  }
  isNormalised() {
    return Math.abs(this.lengthSquared() - 1) == 0;
  }
  normalized() {
    var llen = this.length();
    return new _Vector2(
      safeDivide(this.x, llen),
      safeDivide(this.y, llen)
    );
  }
  normalised() {
    return this.normalized();
  }
  magnitude() {
    return this.length();
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  lineTo(other) {
    return _Vector2.SUBTRACT(other, this);
  }
  gradient() {
    return safeDivide(this.y, this.x);
  }
  angle() {
    return Math.atan2(this.y, this.x);
  }
  angleTo(other) {
    return Math.atan2(this.y, this.x) - Math.atan2(other.y, other.x);
  }
  angleToPoint(other) {
    return this.lineTo(other).angle();
  }
  angleBetween(a, b) {
    let c = new _Vector2(this);
    let top = a.y * (c.x - b.x) + c.y * (b.x - a.x) + b.y * (a.x - c.x);
    let bot = (a.x - c.x) * (c.x - b.x) + (a.y - c.y) * (c.y - b.y);
    let angle = Math.atan2(top, bot);
    return angle;
  }
  distanceSquaredTo(other) {
    return _Vector2.SUBTRACT(other, this).lengthSquared();
  }
  distanceTo(other) {
    return _Vector2.SUBTRACT(other, this).length();
  }
  directionTo(other) {
    return _Vector2.SUBTRACT(other, this).normalized();
  }
  rotateAround(pivot, angle) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    let sinO = Math.sin(angle);
    let cosO = Math.cos(angle);
    pt.x -= ct.x;
    pt.y -= ct.y;
    this.x = pt.x * cosO - pt.y * sinO + ct.x;
    this.y = pt.x * sinO + pt.y * cosO + ct.y;
  }
  rotated(pivot, angle) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    let sinO = Math.sin(angle);
    let cosO = Math.cos(angle);
    pt.x -= ct.x;
    pt.y -= ct.y;
    let _x = pt.x * cosO - pt.y * sinO + ct.x;
    let _y = pt.x * sinO + pt.y * cosO + ct.y;
    return new _Vector2(_x, _y);
  }
  skewed(pivot, skewer) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    pt.x -= ct.x;
    pt.y -= ct.y;
    let _x = pt.x + pt.y * skewer.x + ct.x;
    let _y = pt.x * skewer.y + pt.y + ct.y;
    return new _Vector2(_x, _y);
  }
  skew(pivot, skewer) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    pt.x -= ct.x;
    pt.y -= ct.y;
    this.x = pt.x + pt.y * skewer.x + ct.x;
    this.y = pt.x * skewer.y + pt.y + ct.y;
  }
  static INVERSE(v1) {
    let ix = safeDivide(1, v1.x);
    let iy = safeDivide(1, v1.y);
    return new _Vector2(ix, iy);
  }
  inverse() {
    let ix = safeDivide(1, this.x);
    let iy = safeDivide(1, this.y);
    return new _Vector2(ix, iy);
  }
  static FLIPPED(v1) {
    return new _Vector2(v1.y, v1.x);
  }
  flipped() {
    return new _Vector2(this.y, this.x);
  }
  static MIDPOINT(arr) {
    if (arr instanceof Array == false) {
      arr = [];
    }
    let _x = 0, _y = 0;
    for (let v of arr) {
      _x += v.x;
      _y += v.y;
    }
    let x = safeDivide(_x, arr.length);
    let y = safeDivide(_y, arr.length);
    return new _Vector2(x, y);
  }
  midPoint(other) {
    let arr = [];
    if (other instanceof Array) {
      arr = arr.concat(other);
    } else {
      arr.push(other);
    }
    let _x = 0, _y = 0;
    for (let v of arr) {
      _x += v.x;
      _y += v.y;
    }
    _x += this.x;
    _y += this.y;
    let x = safeDivide(_x, arr.length + 1);
    let y = safeDivide(_y, arr.length + 1);
    return new _Vector2(x, y);
  }
  floor() {
    return new _Vector2(Math.floor(this.x), Math.floor(this.y));
  }
  ceil() {
    return new _Vector2(Math.ceil(this.x), Math.ceil(this.y));
  }
  reflect(other) {
    return _Vector2.SUBTRACT(this, _Vector2.SCALE(other, 2 * _Vector2.DOT(this, other)));
  }
  project(norm) {
    let normLengthSquared = Math.pow(this.x, 2) + Math.pow(this.y, 2);
    return _Vector2.SCALE(norm, this.dot(norm) / normLengthSquared);
  }
  slide(other) {
    return _Vector2.SUBTRACT(this, _Vector2.SCALE(other, this.dot(other)));
  }
  bounce(other) {
    return _Vector2.NEG(this.reflect(other));
  }
  closestPoint(arr, exclusive = false) {
    if (!arr?.length)
      return null;
    let pt = null;
    let dist = Infinity;
    for (let v of arr) {
      if (exclusive && _Vector2.EQUALS(v, this)) {
        continue;
      }
      let _dist = Math.abs(this.distanceTo(v));
      if (_dist < dist) {
        pt = v;
        dist = _dist;
      }
    }
    return pt;
  }
  sortPointsByClosest(points) {
    if (!points?.length)
      return null;
    let arr = points.slice();
    let len = arr.length;
    let newArr = [];
    for (let i = 0; i < len; i++) {
      let pt = this.closestPoint(arr);
      if (!pt)
        continue;
      newArr.push(pt);
      let index = arr.indexOf(pt);
      arr.splice(index, 1);
      i--;
    }
    return newArr;
  }
  toString() {
    let out = "( " + String(this.x) + " , " + String(this.y) + " )";
    return out;
  }
  asObject() {
    return { x: this.x, y: this.y };
  }
  asArray() {
    return [this.x, this.y];
  }
  toJSON() {
    return this.asObject();
  }
  isGreaterThan(other) {
    return this.lengthSquared() > other.lengthSquared();
  }
  isLesserThan(other) {
    return this.lengthSquared() < other.lengthSquared();
  }
  static NEG(v1) {
    return new _Vector2(-v1.x, -v1.y);
  }
  neg() {
    return new _Vector2(-this.x, -this.y);
  }
  static quadraticBezier(points, t) {
    let qPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
      let pA = new _Vector2(points[i]);
      let pB = new _Vector2(points[i + 1]);
      let pt = pA.lerp(pB, t);
      qPoints.push(pt);
    }
    if (qPoints.length < 2) {
      return qPoints[0];
    }
    return _Vector2.quadraticBezier(qPoints, t);
  }
  static quadraticBezierPoints(points, inc) {
    let qPoints = [];
    if (points instanceof Array && typeof inc === "number" && inc > 0) {
      let t = 0;
      let last = false;
      while (t <= 1) {
        qPoints.push(_Vector2.quadraticBezier(points, t));
        t += inc;
        if (t > 1 && !last) {
          t = 1;
          last = true;
        }
      }
    }
    return qPoints;
  }
  static getSVGAngle(_u, _v) {
    let u = new _Vector2(_u);
    let v = new _Vector2(_v);
    let dot = _Vector2.DOT(u, v);
    let len = u.length() * v.length();
    var clamp = /* @__PURE__ */ __name(function(n, min, max) {
      max = Math.max(min, max);
      min = Math.min(min, max);
      return Math.min(Math.max(n, min), max);
    }, "clamp");
    let ang = Math.acos(clamp(dot / len, -1, 1));
    if (u.x * v.y - u.y * v.x < 0) {
      ang = -ang;
    }
    return ang;
  }
};

// src/Vector2Line.ts
var Vector2Line = class _Vector2Line {
  static {
    __name(this, "Vector2Line");
  }
  a = 1;
  b = -1;
  c = 0;
  // f //x intercept
  // e //y intercept
  // m //gradient
  static get Y_AXIS() {
    return new _Vector2Line(1, 0, 0);
  }
  static get X_AXIS() {
    return new _Vector2Line(0, -1, 0);
  }
  static get ONE() {
    return new _Vector2Line(1, -1, 0);
  }
  static get NEG_ONE() {
    return new _Vector2Line(1, 1, 0);
  }
  get gradient() {
    return safeDivide(-this.a, this.b);
  }
  get m() {
    return this.gradient;
  }
  get xIntercept() {
    return safeDivide(-this.c, this.a);
  }
  get f() {
    return this.xIntercept;
  }
  get yIntercept() {
    return safeDivide(-this.c, this.b);
  }
  get e() {
    return this.yIntercept;
  }
  constructor(...args) {
    if (args[0] instanceof _Vector2Line) {
      let obj = args[0];
      this.a = obj.a;
      this.b = obj.b;
      this.c = obj.c;
    } else if (args[0] instanceof Object && args[1] instanceof Object) {
      let x = args[0], y = args[1];
      let a, b, c;
      let v1 = new Vector2(
        x.x || x[0] || 0,
        x.y || x[1] || 0
      );
      let v2 = new Vector2(
        y.x || y[0] || 0,
        y.y || y[1] || 0
      );
      let m = Vector2.SUBTRACT(v2, v1).gradient();
      let e, f;
      if (isInfinity(m)) {
        c = -(v1.x || v2.x);
        b = 0;
        a = 1;
      } else if (m == 0) {
        a = 0;
        b = -1;
        c = v1.y || v2.y;
      } else {
        e = v1.y - m * v1.x;
        f = safeDivide(-e, m);
        c = -(f * m);
        b = safeDivide(-c, e) || 1;
        a = -(b * m);
      }
      this.a = a;
      this.b = b;
      this.c = c;
    } else if (args[0] instanceof Object) {
      let x = args[0];
      if ("a" in x && "b" in x && "c" in x) {
        let obj = x;
        this.a = obj.a;
        this.b = obj.b;
        this.c = obj.c;
      } else if (("gradient" in x || "m" in x) && ("e" in x || "c" in x || "yIntercept" in x)) {
        let obj = x;
        let a, b, c;
        let m = obj.gradient || obj.m || 0;
        let e = obj.e || obj.c || obj.yIntercept || 0;
        let f;
        if ("f" in obj || "xIntercept" in obj) {
          f = obj.f || obj.xIntercept || 0;
          c = -(f * m);
        } else {
          c = 1;
          f = safeDivide(-c, m);
        }
        b = safeDivide(-c, e);
        a = -(b * m);
        this.a = a;
        this.b = b;
        this.c = c;
      } else if (("f" in x || "x" in x || "c" in x || "xIntercept" in x) && ("e" in x || "y" in x || "yIntercept" in x)) {
        let obj = x;
        let a, b, c;
        let e = obj.e || obj.c || obj.y || obj.yIntercept || 0;
        let f = obj.f || obj.x || obj.xIntercept || 0;
        let m = new Vector2(0 - e, f - 0).gradient();
        c = -(f * m);
        b = safeDivide(-c, e);
        a = -(b * m);
        this.a = a;
        this.b = b;
        this.c = c;
      }
    } else if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number") {
      let x = args[0], y = args[1], z = args[2];
      let a, b, c;
      a = x;
      b = y;
      c = z;
      this.a = a;
      this.b = b;
      this.c = c;
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      let x = args[0], y = args[1];
      let a, b, c;
      let e = y;
      let f = x;
      let m = new Vector2(0 - e, f - 0).gradient();
      c = -(f * m);
      b = safeDivide(-c, e);
      a = -(b * m);
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
      x = safeDivide(y - e, m);
    } else {
      let c = this.c;
      let a = this.a;
      x = safeDivide(-c, a);
    }
    return x;
  }
  getY(x) {
    let y;
    if (this.a != 0) {
      let m = this.gradient;
      let e = this.yIntercept;
      y = m * x + e;
    } else {
      let c = this.c;
      let b = this.b;
      y = safeDivide(-c, b);
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
    let v = new Vector2(point);
    let res;
    if (isInfinity(this.a) && isInfinity(this.b)) {
      if (this.a == this.b) {
        res = Infinity + this.c;
      } else {
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
    if (xInt == Infinity)
      return 0;
    if (xInt == -Infinity)
      return Math.PI;
    if (yInt == Infinity)
      return Math.PI / 2;
    if (yInt == -Infinity)
      return -(Math.PI / 2);
    let vx = new Vector2(xInt, 0);
    let vy = new Vector2(0, yInt);
    return vx.angleToPoint(vy);
  }
  static INTERSECT(l1, l2) {
    return l1.intersect(l2);
  }
  static INTERSECTS(arr) {
    if (!arr?.length) {
      return [];
    }
    let pts = [];
    for (let lineA of arr) {
      for (let lineB of arr) {
        if (lineA == lineB)
          continue;
        let ab = _Vector2Line.INTERSECT(lineA, lineB);
        if (ab)
          pts.push(ab);
      }
    }
    return pts;
  }
  intersect(other) {
    if (other.gradient == this.gradient) {
      return null;
    }
    let a1 = this.a, a2 = other.a;
    let b1 = this.b, b2 = other.b;
    let c1 = this.c, c2 = other.c;
    let b1c2 = b1 * c2;
    let b2c1 = b2 * c1;
    let a1b2 = a1 * b2;
    let a2b1 = a2 * b1;
    let a2c1 = a2 * c1;
    let a1c2 = a1 * c2;
    let BC, AB, AC;
    if (isInfinity(b1c2) && isInfinity(b2c1) && b1c2 == b2c1) {
      BC = b1c2;
    } else {
      BC = b1c2 - b2c1;
    }
    if (isInfinity(a1b2) && isInfinity(a2b1) && a1b2 == a2b1) {
      AB = a1b2;
    } else {
      AB = a1b2 - a2b1;
    }
    if (isInfinity(a2c1) && isInfinity(a1c2) && a2c1 == a1c2) {
      AC = a2c1;
    } else {
      AC = a2c1 - a1c2;
    }
    let x = safeDivide(BC, AB);
    let y = safeDivide(AC, AB);
    return new Vector2(x, y);
  }
  perpendicular(point) {
    point = new Vector2(point);
    if (this.a == 0) {
      let a = this.b, b = this.a, c = point.x;
      return new _Vector2Line({ a, b, c });
    } else if (this.b == 0) {
      let a = this.b, b = this.a, c = point.y;
      return new _Vector2Line({ a, b, c });
    } else {
      let m = safeDivide(-1, this.gradient);
      let e = point.y + 1 / m * point.x;
      let f = safeDivide(-e, m);
      return new _Vector2Line({
        gradient: m,
        xIntercept: f,
        yIntercept: f
      });
    }
  }
  normal() {
    return new Vector2(this.a, this.b);
  }
  mirror(point) {
    point = new Vector2(point);
    if (this.hasPoint(point)) {
      return new Vector2(point);
    }
    let _normal = this.normal();
    let unitNormal = _normal.normalized();
    let unitC = safeDivide(this.c, _normal.length());
    let signedDist = unitNormal.x * point.x + unitNormal.y * point.y + unitC;
    let mx = point.x - 2 * unitNormal.x * signedDist;
    let my = point.y - 2 * unitNormal.y * signedDist;
    return new Vector2(mx, my);
  }
  asObject() {
    return { a: this.a, b: this.b, c: this.c };
  }
  toString() {
    return `(${this.a}x + ${this.b}y + ${this.c})`;
  }
  toJSON() {
    return this.asObject();
  }
};

// src/Rect2.ts
var Rect2 = class _Rect2 {
  static {
    __name(this, "Rect2");
  }
  position;
  size;
  static get ORIGIN() {
    return new _Rect2(0, 0, 1, 1);
  }
  static EQUALS(r1, r2, p = 0) {
    if (r1 === r2)
      return true;
    if (!r1 || !r2)
      return false;
    let a = new _Rect2(r1);
    let b = new _Rect2(r2);
    if (Vector2.EQUALS(a.position, b.position, p) && Vector2.EQUALS(a.size, b.size, p))
      return true;
    return false;
  }
  static COMBINE(rects) {
    let pts = [];
    for (let r of rects) {
      if (r instanceof _Rect2) {
        pts = pts.concat(r.getCorners());
      }
    }
    return _Rect2.from(pts);
  }
  static from(pts) {
    return _Rect2.getFromPoints(pts);
  }
  static getFromPoints(points) {
    if (points instanceof Array == false)
      return null;
    let xMin, xMax, yMin, yMax;
    xMax = yMax = -Infinity;
    xMin = yMin = Infinity;
    for (let pt of points) {
      pt = new Vector2(pt);
      if (xMin == null || xMin > pt.x)
        xMin = pt.x;
      if (yMin == null || yMin > pt.y)
        yMin = pt.y;
      if (xMax == null || xMax < pt.x)
        xMax = pt.x;
      if (yMax == null || yMax < pt.y)
        yMax = pt.y;
    }
    let w = xMax - xMin;
    let h = yMax - yMin;
    return new _Rect2(xMin, yMin, w, h);
  }
  get start() {
    return new Vector2(this.left, this.top);
  }
  get end() {
    return new Vector2(this.right, this.bottom);
  }
  get center() {
    return Vector2.MIDPOINT([this.start, this.end]);
  }
  get extents() {
    return Vector2.SUBTRACT(this.center, this.start);
  }
  get topLeft() {
    return new Vector2(this.left, this.top);
  }
  get topRight() {
    return new Vector2(this.right, this.top);
  }
  get bottomLeft() {
    return new Vector2(this.left, this.bottom);
  }
  get bottomRight() {
    return new Vector2(this.right, this.bottom);
  }
  get x() {
    return this.position.x;
  }
  set x(n) {
    this.position.x = n;
  }
  get y() {
    return this.position.y;
  }
  set y(n) {
    this.position.y = n;
  }
  get w() {
    return this.size.x;
  }
  set w(n) {
    this.size.x = n;
  }
  get h() {
    return this.size.y;
  }
  set h(n) {
    this.size.y = n;
  }
  get width() {
    return this.w;
  }
  set width(n) {
    this.w = n;
  }
  get height() {
    return this.h;
  }
  set height(n) {
    this.h = n;
  }
  get left() {
    return this.x;
  }
  set left(n) {
    this.w = this.right - n;
    this.x = n;
  }
  get top() {
    return this.y;
  }
  set top(n) {
    this.h = this.bottom - n;
    this.y = n;
  }
  get right() {
    return this.x + this.w;
  }
  set right(n) {
    this.w = n - this.left;
  }
  get bottom() {
    return this.y + this.h;
  }
  set bottom(n) {
    this.h = n - this.top;
  }
  constructor(...args) {
    let [p, s, w, h] = args;
    if (p instanceof Object) {
      if ("position" in p && "size" in p) {
        this.position = new Vector2(p.position);
        this.size = new Vector2(p.size);
      } else if ("x" in p && "y" in p && "w" in p && "h" in p) {
        this.position = new Vector2(p.x, p.y);
        this.size = new Vector2(p.w, p.h);
      } else if ("x" in p && "y" in p && "x" in s && "y" in s) {
        this.position = new Vector2(p);
        this.size = new Vector2(s);
      } else if ("top" in p && "left" in p && "right" in p && "bottom" in p) {
        this.position = new Vector2(p.left, p.top);
        this.size = new Vector2(p.right - p.left, p.bottom - p.top);
      } else if ("t" in p && "l" in p && "r" in p && "b" in p) {
        this.position = new Vector2(p.l, p.t);
        this.size = new Vector2(p.r - p.l, p.b - p.t);
      }
    } else if (typeof p === "number" && typeof s === "number" && typeof w === "number" && typeof h === "number") {
      this.position = new Vector2(p, s);
      this.size = new Vector2(w, h);
    } else {
      this.position = new Vector2();
      this.size = new Vector2();
    }
  }
  equals(other, p = 0) {
    return _Rect2.EQUALS(this, other, p);
  }
  abs() {
    return new _Rect2(this.position, this.size.abs());
  }
  containsPoint(v) {
    v = new Vector2(v);
    if (v.x < this.left || v.x > this.right || v.y < this.top || v.y > this.bottom)
      return false;
    return true;
  }
  getIntersectWith(rect, threshold = 0) {
    let other = new _Rect2(rect);
    if (!this.intersectsWith(other, threshold))
      return null;
    let yMin = this.top > other.top ? this.top : other.top;
    let yMax = this.bottom < other.bottom ? this.bottom : other.bottom;
    let xMin = this.left > other.left ? this.left : other.left;
    let xMax = this.right < other.right ? this.right : other.right;
    return new _Rect2(
      new Vector2(xMin, yMin),
      new Vector2(xMax - xMin, yMax - yMin)
    );
  }
  intersectsWith(rect, threshold = 0) {
    let other = new _Rect2(rect);
    if (this.right + threshold < other.left || this.left - threshold > other.right || this.bottom + threshold < other.top || this.top - threshold > other.bottom)
      return false;
    return true;
  }
  isTouching(other, threshold = 0) {
    return this.touches(other, threshold);
  }
  touches(rect, threshold = 0) {
    let other = new _Rect2(rect);
    if (this.right + threshold == other.left || this.left - threshold == other.right || this.bottom + threshold == other.top || this.top - threshold == other.bottom)
      return true;
    return false;
  }
  combine(other) {
    return _Rect2.COMBINE([this, other]);
  }
  getCorners() {
    return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
  }
  clampPoints(pts) {
    let rect = this;
    let newPts = pts.map((pt) => {
      pt = new Vector2(pt);
      if (pt.y > rect.bottom)
        pt.y = rect.bottom;
      if (pt.x > rect.right)
        pt.x = rect.right;
      if (pt.y < rect.top)
        pt.y = rect.top;
      if (pt.x < rect.left)
        pt.x = rect.left;
      return pt;
    });
    return newPts;
  }
  asObject() {
    let rect = {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h
    };
    rect = Object.assign(rect, {
      get top() {
        return rect.y;
      },
      get bottom() {
        return rect.y + rect.h;
      },
      get left() {
        return rect.x;
      },
      get right() {
        return rect.x + rect.w;
      }
    });
    return rect;
  }
  asArray() {
    return [this.x, this.y, this.w, this.h];
  }
  toString() {
    var out = `Rect2( ${this.position} ${this.size})`;
    return out;
  }
  toJSON() {
    return {
      position: this.position?.toJSON() || null,
      size: this.size?.toJSON() || null
    };
  }
};

// src/Transform2.ts
var Transform2 = class _Transform2 {
  static {
    __name(this, "Transform2");
  }
  _position;
  _rotation;
  _scale;
  _skew;
  _anchor;
  _parent = null;
  _childs = [];
  static get ORIGIN() {
    return new _Transform2(Vector2.ZERO, 0, Vector2.ONE, Vector2.ZERO, Vector2.ZERO);
  }
  static EQUALS(t1, t2, p = 0) {
    if (t1 === t2)
      return true;
    if (!t2 || !t2)
      return false;
    if (Vector2.EQUALS(t1.position, t2.position, p) && Vector2.EQUALS(t1.scale, t2.scale, p) && Vector2.EQUALS(t1.skew, t2.skew, p) && Vector2.EQUALS(t1.anchor, t2.anchor, p))
      return true;
    return false;
  }
  static SIMILAR(t1, t2, p = 0) {
    if (t1 === t2)
      return true;
    if (!t2 || !t2)
      return false;
    if (Vector2.EQUALS(t1.position, t2.position, p) && Vector2.EQUALS(t1.scale, t2.scale, p) && Vector2.EQUALS(t1.skew, t2.skew, p))
      return true;
    return false;
  }
  static INVERSE(t) {
    let p = Vector2.NEG(t.position);
    let s = Vector2.INVERSE(t.scale);
    let r = -t.rotation;
    let k = Vector2.NEG(t.skew);
    let a = t.anchor;
    return new _Transform2(p, r, s, k, a);
  }
  get parent() {
    return this._parent;
  }
  set parent(x) {
    if (x instanceof _Transform2)
      this._parent = x;
  }
  get position() {
    return this._position;
  }
  set position(x) {
    if (x instanceof Vector2)
      this._position = new Vector2(x);
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(x) {
    this._rotation = Number(x);
  }
  get scale() {
    return this._scale;
  }
  set scale(x) {
    if (x instanceof Vector2)
      this._scale = new Vector2(x);
  }
  get skew() {
    return this._skew;
  }
  set skew(x) {
    if (x instanceof Vector2)
      this._skew = new Vector2(x);
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(x) {
    if (x instanceof Vector2)
      this._anchor = new Vector2(x);
  }
  get children() {
    return this._childs;
  }
  get childs() {
    return this.children;
  }
  get a() {
    return this.scale.x * (Math.cos(this.rotation) - Math.sin(this.rotation) * Math.tan(this.skew.x));
  }
  get b() {
    return this.scale.y * (Math.sin(this.rotation) + Math.cos(this.rotation) * Math.tan(this.skew.y));
  }
  get c() {
    return this.scale.x * (Math.cos(this.rotation) * Math.tan(this.skew.x) - Math.sin(this.rotation));
  }
  get d() {
    return this.scale.y * (Math.sin(this.rotation) * Math.tan(this.skew.y) + Math.cos(this.rotation));
  }
  get tx() {
    return this.position.x;
  }
  get ty() {
    return this.position.y;
  }
  get matrix() {
    return [
      [this.a, this.c, this.tx],
      [this.b, this.d, this.ty],
      [0, 0, 1]
    ];
  }
  constructor(...args) {
    if (args[0] instanceof _Transform2) {
      let p = args[0];
      this.position = new Vector2(p.position);
      this.rotation = p.rotation;
      this.scale = new Vector2(p.scale);
      this.skew = new Vector2(p.skew);
      this.anchor = new Vector2(p.anchor);
    } else {
      let [p, r, s, k, a] = args;
      this.position = new Vector2(p);
      this.rotation = r;
      this.scale = new Vector2(s);
      this.skew = new Vector2(k);
      this.anchor = new Vector2(a);
    }
  }
  inverted() {
    return _Transform2.INVERSE(this);
  }
  setParent(x) {
    if (!(x instanceof _Transform2))
      return;
    if (x == this)
      return;
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = x;
  }
  addChild(x) {
    if (!(x instanceof _Transform2))
      return;
    if (x == this)
      return;
    x.setParent(this);
    this._childs.push(x);
  }
  removeChild(x) {
    if (x == this)
      return null;
    let ind;
    let out = null;
    if (x instanceof _Transform2) {
      ind = this._childs.indexOf(x);
    } else if (typeof x === "number") {
      ind = x;
    }
    if (ind >= 0 && ind < this._childs.length) {
      out = this._childs[ind];
      this._childs.splice(ind, 1);
      out._parent = null;
    }
    return out;
  }
  getGlobalTransform() {
    let parentTransform = this.parent?.getGlobalTransform() || new _Transform2();
    let pt = parentTransform;
    let p = Vector2.ADD(pt.position, this.position);
    let r = pt.rotation + this.rotation;
    let s = Vector2.MULTIPLY(pt.scale, this.scale);
    let k = new Vector2(
      Math.tan(Math.atan(this.skew.x) + Math.atan(pt.skew.x)),
      Math.tan(Math.atan(this.skew.y) + Math.atan(pt.skew.y))
    );
    let a = pt.applyTransform(this.anchor, pt.anchor);
    return new _Transform2(p, r, s, k, a);
  }
  applyGlobalTransform(pt, anchor = this.anchor, order = ["S", "K", "R", "T"]) {
    let globalTrans = this.getGlobalTransform();
    let newPt = new Vector2(pt);
    newPt = globalTrans.applyTransform(pt, anchor, order);
    return newPt;
  }
  applyTranslate(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = Vector2.ADD(newPt, this.position);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyRotate(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = newPt.rotated(Vector2.ZERO, this.rotation);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applySkew(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = newPt.skewed(Vector2.ZERO, this.skew);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyScale(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = Vector2.MULTIPLY(newPt, this.scale);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyInverseTransform(pt, anchor = this._anchor, order = ["T", "R", "K", "S"]) {
    let inv = this.inverted();
    return inv.applyTransform(pt, anchor, order.slice());
  }
  applyTransform(pt, anchor = this.anchor, order = ["S", "K", "R", "T"]) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    for (let trans of order) {
      if (!trans)
        continue;
      switch (trans?.toUpperCase()) {
        case "T":
        case "TRANSLATE":
        case "POSITION":
          newPt = this.applyTranslate(newPt, Vector2.ZERO);
          break;
        case "R":
        case "ROTATE":
        case "ROTATION":
          newPt = this.applyRotate(newPt, Vector2.ZERO);
          break;
        case "K":
        case "SKEW":
          newPt = this.applySkew(newPt, Vector2.ZERO);
          break;
        case "S":
        case "SCALE":
        case "SIZE":
          newPt = this.applyScale(newPt, Vector2.ZERO);
          break;
        default:
          newPt = newPt;
          break;
      }
    }
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  asMatrix() {
    return this.matrix;
  }
  asArray() {
    return [this.a, this.b, this.c, this.d, this.tx, this.ty];
  }
  asObject() {
    return {
      position: this.position?.toJSON() || null,
      rotation: typeof this.rotation === "number" ? this.rotation : null,
      scale: this.scale?.toJSON() || null,
      skew: this.skew?.toJSON() || null,
      anchor: this.anchor?.toJSON() || null
    };
  }
  toString() {
    return `( Translate: ${this.position} Rotate: (${this.rotation}) Scale: ${this.scale} Skew: ${this.skew} Anchor: ${this.anchor} )`;
  }
  toJSON() {
    return this.asObject();
  }
};

// src/index.ts
var src_default = {
  Vector2,
  Vector2Line,
  Rect2,
  Transform2
};
if (typeof module.exports == "object" && typeof exports == "object") {
  var __cp = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of Object.getOwnPropertyNames(from)) {
        if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
        Object.defineProperty(to, key, {
          get: () => from[key],
          enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
        });
      }
    }
    return to;
  };
  module.exports = __cp(module.exports, exports);
}
return module.exports;
}))
