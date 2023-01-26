"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transform2 = void 0;
var MY = _interopRequireWildcard(require("@catsums/my"));
var _Vector = require("../Vector2/Vector2");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Transform2 {
  _position;
  _rotation;
  _scale;
  _skew;
  _anchor;
  _parent;
  _childs = [];
  static EQUALS(t1, t2, p) {
    if (t1 === t2) return true;
    if (!t2 || !t2) return false;
    if (_Vector.Vector2.EQUALS(t1.position, t2.position, p) && _Vector.Vector2.EQUALS(t1.scale, t2.scale, p) && _Vector.Vector2.EQUALS(t1.skew, t2.skew, p) && _Vector.Vector2.EQUALS(t1.anchor, t2.anchor, p) && MY.roundTo(r, p) === MY.roundTo(r, p)) return true;
    return false;
  }
  static INVERSE(t) {
    let p = _Vector.Vector2.NEG(t.position);
    let s = _Vector.Vector2.INVERSE(t.scale);
    let r = -t.rotation;
    let k = _Vector.Vector2.NEG(t.skew);
    let a = t.anchor;
    return new Transform2(p, r, s, k, a);
  }
  get parent() {
    return this._parent;
  }
  set parent(x) {
    if (x instanceof Transform2) this._parent = x;
  }
  get position() {
    return this._position;
  }
  set position(x) {
    if (x instanceof _Vector.Vector2) this._position = new _Vector.Vector2(x);
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(x) {
    if (MY.isNumber(x)) this._rotation = Number(x);
  }
  get scale() {
    return this._scale;
  }
  set scale(x) {
    if (x instanceof _Vector.Vector2) this._scale = new _Vector.Vector2(x);
  }
  get skew() {
    return this._skew;
  }
  set skew(x) {
    if (x instanceof _Vector.Vector2) this._skew = new _Vector.Vector2(x);
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(x) {
    if (x instanceof _Vector.Vector2) this._anchor = new _Vector.Vector2(x);
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
    return [[this.a, this.c, this.tx], [this.b, this.d, this.ty], [0, 0, 1]];
  }
  constructor(p = _Vector.Vector2.ZERO, r = 0, s = _Vector.Vector2.ONE, k = _Vector.Vector2.ZERO, a = _Vector.Vector2.ZERO) {
    if (p instanceof Transform2) {
      this.position = p.position;
      this.rotation = p.rotation;
      this.scale = p.scale;
      this.skew = p.skew;
      this.anchor = p.anchor;
    } else {
      this.position = p;
      this.rotation = r;
      this.scale = s;
      this.skew = k;
      this.anchor = a;
    }
  }
  inverted() {
    return Transform2.INVERSE(this);
  }
  setParent(x) {
    if (!(x instanceof Transform2)) return;
    if (x == this) return;
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = x;
  }
  addChild(x) {
    if (!(x instanceof Transform2)) return;
    if (x == this) return;
    x.setParent(this);
    this._childs.push(x);
  }
  removeChild(x) {
    if (x == this) return null;
    let ind;
    let out = null;
    if (x instanceof Transform2) {
      ind = this._childs.indexOf(x);
    } else if (MY.isNumber(x)) {
      ind = x;
    }
    if (ind >= 0 && ind < this._childs.length) {
      out = this._childs[ind];
      this._childs.splice(ind, 1);
    }
    return out;
  }
  getGlobalTransform() {
    let parentTransform = this.parent?.getGlobalTransform() || new Transform2();
    let pt = parentTransform;
    let p = _Vector.Vector2.ADD(pt.position, this.position);
    let r = pt.rotation + this.rotation;
    let s = _Vector.Vector2.MULTIPLY(pt.scale, this.scale);
    let k = new _Vector.Vector2(Math.tan(Math.atan(this.skew.x) + Math.atan(pt.skew.x)), Math.tan(Math.atan(this.skew.y) + Math.atan(pt.skew.y)));
    let a = pt.applyTransform(this.anchor, pt.anchor);
    // let a = Vector2.ADD(pt.anchor, this.anchor);

    return new Transform2(p, r, s, k, a);
  }
  applyGlobalTransform(pt, anchor = this.anchor, order = ['S', 'K', 'R', 'T']) {
    let globalTrans = this.getGlobalTransform();
    let newPt = new _Vector.Vector2(pt);

    // newPt = Vector2.SUBTRACT(newPt, this.anchor);
    newPt = globalTrans.applyTransform(pt, anchor, order);
    // newPt = Vector2.ADD(newPt, this.anchor);

    return newPt;
  }
  applyTranslate(pt, anchor = this.anchor) {
    let newPt = new _Vector.Vector2(pt);
    newPt = _Vector.Vector2.SUBTRACT(newPt, anchor);
    newPt = _Vector.Vector2.ADD(newPt, this.position);
    newPt = _Vector.Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyRotate(pt, anchor = this.anchor) {
    let newPt = new _Vector.Vector2(pt);
    newPt = _Vector.Vector2.SUBTRACT(newPt, anchor);
    newPt = newPt.rotated(_Vector.Vector2.ZERO, this.rotation);
    newPt = _Vector.Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applySkew(pt, anchor = this.anchor) {
    let newPt = new _Vector.Vector2(pt);
    newPt = _Vector.Vector2.SUBTRACT(newPt, anchor);
    newPt = newPt.skewed(_Vector.Vector2.ZERO, this.skew);
    newPt = _Vector.Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyScale(pt, anchor = this.anchor) {
    let newPt = new _Vector.Vector2(pt);
    newPt = _Vector.Vector2.SUBTRACT(newPt, anchor);
    newPt = _Vector.Vector2.MULTIPLY(newPt, this.scale);
    newPt = _Vector.Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyInverseTransform(pt, anchor = this._anchor, order = ['T', 'R', 'K', 'S']) {
    let inv = this.inverted();
    return inv.applyTransform(pt, anchor, order.slice().reverse());
  }
  applyTransform(pt, anchor = this.anchor, order = ['S', 'K', 'R', 'T']) {
    let newPt = new _Vector.Vector2(pt);
    newPt = _Vector.Vector2.SUBTRACT(newPt, anchor);
    for (let trans of order) {
      if (!trans) continue;
      switch (trans?.toUpperCase()) {
        case 'T':
        case 'TRANSLATE':
        case 'POSITION':
          newPt = this.applyTranslate(newPt, _Vector.Vector2.ZERO);
          break;
        case 'R':
        case 'ROTATE':
        case 'ROTATION':
          newPt = this.applyRotate(newPt, _Vector.Vector2.ZERO);
          break;
        case 'K':
        case 'SKEW':
          newPt = this.applySkew(newPt, _Vector.Vector2.ZERO);
          break;
        case 'S':
        case 'SCALE':
        case 'SIZE':
          newPt = this.applyScale(newPt, _Vector.Vector2.ZERO);
          break;
        default:
          newPt = newPt;
          break;
      }
    }
    newPt = _Vector.Vector2.ADD(newPt, anchor);
    return newPt;

    // let translate = this.position;
    // let scale = this.scale;
    // let rotate = this.rotation;
    // let skew = this.skew;
    // let anchor = this.anchor;

    // let a = (scale.x) * ( Math.cos(rotate) - (Math.sin(rotate) * Math.tan(skew.x)) );
    // let b = (scale.y) * ( Math.sin(rotate) + (Math.cos(rotate) * Math.tan(skew.y)) );
    // let c = (scale.x) * ( (Math.cos(rotate) * Math.tan(skew.x)) - Math.sin(rotate) );
    // let d = (scale.y) * ( (Math.sin(rotate) * Math.tan(skew.y)) + Math.cos(rotate) );

    // let tx = translate.x; let ty = translate.y;

    // let ax = anchor.x; let ay = anchor.y;

    // let vx = pt.x; let vy = pt.y;

    // let Rx = ((a*(vx-ax)) + (c*(vy-ay)) + tx) + ax;
    // let Ry = ((b*(vx-ax)) + (d*(vy-ay)) + ty) + ay;

    // return new Vector2(Rx,Ry);
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
      rotation: typeof this.rotation === 'number' ? this.rotation : null,
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
}
exports.Transform2 = Transform2;