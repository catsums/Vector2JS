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
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// src/Rect2.ts
var Rect2_exports = {};
__export(Rect2_exports, {
  Rect2: () => Rect2
});
module.exports = __toCommonJS(Rect2_exports);

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
