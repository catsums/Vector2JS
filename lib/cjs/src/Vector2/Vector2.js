"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector2 = void 0;
var MY = _interopRequireWildcard(require("@catsums/my"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Vector2 {
  x;
  y;
  static get ZERO() {
    return new Vector2(0, 0);
  }
  static get ONE() {
    return new Vector2(1, 1);
  }
  static get NEG_ONE() {
    return new Vector2(-1, -1);
  }
  static get INF() {
    return new Vector2(Infinity, Infinity);
  }
  static get NEG_INF() {
    return new Vector2(-Infinity, -Infinity);
  }
  static get EPSILON() {
    return new Vector2(Number.MIN_VALUE, Number.MIN_VALUE);
  }
  static get UP() {
    return new Vector2(0, -1);
  }
  static get DOWN() {
    return new Vector2(0, 1);
  }
  static get LEFT() {
    return new Vector2(-1, 0);
  }
  static get RIGHT() {
    return new Vector2(1, 0);
  }
  static ADD(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }
  add(other) {
    this.x += other.x;
    this.y += other.y;
  }
  static SUBTRACT(v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
  }
  subtract(other) {
    this.x -= other.x;
    this.y -= other.y;
  }
  static MULTIPLY(v1, v2) {
    if (MY.isNumber(v2)) v2 = new Vector2(v2, v2);
    return new Vector2(v1.x * v2.x, v1.y * v2.y);
  }
  multiply(other) {
    if (MY.isNumber(other)) {
      return this.scale(other);
    }
    this.x *= other.x;
    this.y *= other.y;
  }
  static DIVIDE(v1, v2) {
    return new Vector2(v1.x / v2.x, v1.y / v2.y);
  }
  divide(other) {
    this.x /= other.x;
    this.y /= other.y;
  }
  static SCALE(v1, n) {
    return new Vector2(v1.x * n, v1.y * n);
  }
  scaleBy(n) {
    this.x *= n;
    this.y *= n;
  }
  scaled(n) {
    return new Vector2(this.x * n, this.y * n);
  }
  static MOD(v1, v2) {
    return new Vector2(mod(v1.x, v2.x), mod(v1.y, v2.y));
  }
  mod(other) {
    this.x = mod(this.x, other.x);
    this.y = mod(this.y, other.y);
  }
  static MODBY(v1, n) {
    return new Vector2(mod(v1.x, n), mod(v1.y, n));
  }
  modBy(n) {
    this.x = mod(this.x, n);
    this.y = mod(this.y, n);
  }
  static DOT(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  static EQUALS(v1, v2) {
    if (!v1 && !v2) return true;
    if (v1?.x === v2?.x && v1?.y === v2?.y) return true;
    if (Math.abs(v1?.x - v2?.x) < Number.EPSILON && Math.abs(v1?.y - v2?.y) < Number.EPSILON) {
      return true;
    }
    return false;
  }
  equals(other) {
    return Vector2.EQUALS(this, other);
  }
  static SortAlgo(a, b) {
    if (a.isGreaterThan(b)) return 1;else if (a.isLesserThan(b)) return -1;
    return 0;
  }
  static SortAlgoX(a, b) {
    if (a.x > b.x) return 1;else if (a.x < b.x) return -1;
    return 0;
  }
  static SortAlgoY(a, b) {
    if (a.y > b.y) return 1;else if (a.y < b.y) return -1;
    return 0;
  }
  static SortAlgoXY(a, b) {
    if (a.x > b.x) return 1;else if (a.x < b.x) return -1;
    if (a.y > b.y) return 1;else if (a.y < b.y) return -1;
    return 0;
  }
  static SortAlgoXY(a, b) {
    if (a.y > b.y) return 1;else if (a.y < b.y) return -1;
    if (a.x > b.x) return 1;else if (a.x < b.x) return -1;
    return 0;
  }
  static SortAlgoAvg(a, b) {
    let x, y;
    if (a.x > b.x) x = 1;else if (a.x < b.x) x = -1;else x = 0;
    if (a.y > b.y) y = 1;else if (a.y < b.y) y = -1;else y = 0;
    let avg = x + y / 2;
    return Math.trunc(avg);
  }
  constructor(x = 0, y = 0) {
    if (x instanceof Vector2 || MY.isObject(x) && 'x' in x && 'y' in x) {
      this.x = x.x;
      this.y = x.y;
    } else if (MY.isArray(x) && MY.isNumber(x[0]) && MY.isNumber(x[1])) {
      this.x = x[0];
      this.y = x[1];
    } else if (MY.isNumber(x) && MY.isNumber(y)) {
      this.x = x;
      this.y = y;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }
  abs() {
    var v = new Vector2(Math.abs(this.x), Math.abs(this.y));
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
    return new Vector2(x, y);
  }
  sumOfParts() {
    return this.x + this.y;
  }
  ratioed() {
    var sum = this.sumOfParts();
    return new Vector2(MY.safeDivide(this.x, sum), MY.safeDivide(this.y, sum));
  }
  isNormalised() {
    return Math.abs(this.lengthSquared() - 1) == 0;
  }
  normalized() {
    var llen = this.length();
    return new Vector2(MY.safeDivide(this.x, llen), MY.safeDivide(this.y, llen));
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
    return Vector2.SUBTRACT(other, this);
  }
  gradient() {
    return MY.safeDivide(this.y, this.x);
  }
  angle() {
    let prod = MY.safeDivide(this.y, this.x);
    return Math.atan(prod);
  }
  angleTo(other) {
    return this.angle() - other.angle();
  }
  angleToPoint(other) {
    return this.lineTo(other).angle();
  }
  angleBetween(a, b) {
    //p1 = c, p2 = a, p3 = b
    let c = new Vector2(this);
    let top = a.y * (c.x - b.x) + c.y * (b.x - a.x) + b.y * (a.x - c.x);
    let bot = (a.x - c.x) * (c.x - b.x) + (a.y - c.y) * (c.y - b.y);
    let ratio = MY.safeDivide(top, bot);
    let angle = Math.atan(ratio);
    return angle;
  }
  distanceSquaredTo(other) {
    return Vector2.SUBTRACT(other, this).lengthSquared();
  }
  distanceTo(other) {
    return Vector2.SUBTRACT(other, this).length();
  }
  directionTo(other) {
    return Vector2.SUBTRACT(other, this).normalized();
  }
  rotateAround(pivot, angle) {
    let pt = new Vector2(this);
    let ct = new Vector2(pivot);
    let sinO = Math.sin(angle);
    let cosO = Math.cos(angle);
    pt.x -= ct.x;
    pt.y -= ct.y;
    this.x = pt.x * cosO - pt.y * sinO + ct.x;
    this.y = pt.x * sinO + pt.y * cosO + ct.y;
  }
  rotated(pivot, angle) {
    let pt = new Vector2(this);
    let ct = new Vector2(pivot);
    let sinO = Math.sin(angle);
    let cosO = Math.cos(angle);
    pt.x -= ct.x;
    pt.y -= ct.y;
    let _x = pt.x * cosO - pt.y * sinO + ct.x;
    let _y = pt.x * sinO + pt.y * cosO + ct.y;
    return new Vector2(_x, _y);
  }
  skewed(pivot, skewer) {
    let pt = new Vector2(this);
    let ct = new Vector2(pivot);
    pt.x -= ct.x;
    pt.y -= ct.y;
    let _x = pt.x + pt.y * skewer.x + ct.x;
    let _y = pt.x * skewer.y + pt.y + ct.y;
    return new Vector2(_x, _y);
  }
  skew(pivot, skewer) {
    let pt = new Vector2(this);
    let ct = new Vector2(pivot);
    pt.x -= ct.x;
    pt.y -= ct.y;
    this.x = pt.x + pt.y * skewer.x + ct.x;
    this.y = pt.x * skewer.y + pt.y + ct.y;
  }
  static INVERSE(v1) {
    return v1.inverse();
  }
  inverse() {
    let ix, iy;
    if (this.x === 0) ix = Infinity;else if (this.x === Infinity || this.x === -Infinity) ix = 0;else ix = 1 / this.x;
    if (this.y === 0) iy = Infinity;else if (this.y === Infinity || this.y === -Infinity) iy = 0;else iy = 1 / this.y;
    return new Vector2(ix, iy);
  }
  static FLIPPED(v1) {
    return new Vector2(v1.y, v1.x);
  }
  flipped() {
    return new Vector2(this.y, this.x);
  }
  static MIDPOINT(arr) {
    if (!MY.isArray(arr)) {
      arr = [];
    }
    let _x = 0,
      _y = 0;
    for (let v of arr) {
      v = new Vector2(v);
      _x += v.x;
      _y += v.y;
    }
    let x = MY.safeDivide(_x, arr.length);
    let y = MY.safeDivide(_y, arr.length);
    return new Vector2(x, y);
  }
  midPoint(other) {
    let arr = [];
    if (!MY.isArray(other)) {
      arr.push(other);
    } else {
      arr = arr.concat(other);
    }
    let _x = 0,
      _y = 0;
    for (let v of arr) {
      v = new Vector2(v);
      _x += v.x;
      _y += v.y;
    }
    _x += this.x;
    _y += this.y;
    let x = MY.safeDivide(_x, arr.length + 1);
    let y = MY.safeDivide(_y, arr.length + 1);
    return new Vector2(x, y);
  }
  floor() {
    return new Vector2(Math.floor(this.x), Math.floor(this.y));
  }
  ceil() {
    return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
  }
  reflect(other) {
    return Vector2.SUBTRACT(this, Vector2.SCALE(other, 2 * Vector2.DOT(this, other)));
  }
  project(norm) {
    return Vector2.SCALE(norm, this.dot(norm) / norm.lengthSquared());
  }
  slide(other) {
    return Vector2.SUBTRACT(this, Vector2.SCALE(other, this.dot(other)));
  }
  bounce(other) {
    return Vector2.NEG(this.reflect(other));
  }
  closestPoint(arr, exclusive = false) {
    if (!MY.isArray(arr) || !arr.length) return null;
    let pt = null;
    let dist = Infinity;
    for (let v of arr) {
      if (exclusive && v.equals(this)) {
        continue;
      }
      let _dist = Math.abs(v.distanceTo(this));
      if (_dist < dist) {
        pt = v;
        dist = _dist;
      }
    }
    return pt;
  }
  sortPointsByClosest(points) {
    if (!MY.isArray(points)) return null;
    let arr = points.slice();
    let len = arr.length;
    let newArr = [];
    // console.log({arr,len,points,newArr})
    for (let i = 0; i < len; i++) {
      let pt = this.closestPoint(arr);
      // console.log({pt})
      if (!pt) continue;
      newArr.push(pt);
      let index = arr.indexOf(pt);
      arr.splice(index, 1);
      // MY.arrayRemove(arr, pt);
      i--;
    }
    return newArr;
  }
  toString() {
    var out = "( " + String(this.x) + " , " + String(this.y) + " )";
    return out;
  }
  asObject() {
    return {
      x: this.x,
      y: this.y
    };
  }
  asArray() {
    return [this.x, this.y];
  }
  isGreaterThan(other) {
    return this.lengthSquared() > other.lengthSquared();
  }
  isLesserThan(other) {
    return this.lengthSquared() < other.lengthSquared();
  }
  static NEG(v1) {
    return new Vector2(-v1.x, -v1.y);
  }
  neg() {
    return Vector2.NEG(this);
  }
  static quadraticBezier(points, t) {
    let qPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
      let pA = new Vector2(points[i]);
      let pB = new Vector2(points[i + 1]);
      let pt = pA.lerp(pB, t);
      qPoints.push(pt);
    }
    if (qPoints.length < 2) {
      return qPoints[0];
    }
    return Vector2.quadraticBezier(qPoints, t);
  }
  static quadraticBezierPoints(points, inc) {
    let qPoints = [];
    if (MY.isArray(points) && MY.isNumber(inc) && inc > 0) {
      let t = 0;
      let last = false;
      while (t <= 1) {
        qPoints.push(Vector2.quadraticBezier(points, t));
        t += inc;
        if (t > 1 && !last) {
          t = 1;
          last = true;
        }
      }
    }
    return qPoints;
  }
}
exports.Vector2 = Vector2;