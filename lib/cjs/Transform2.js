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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Transform2_exports = {};
__export(Transform2_exports, {
  Transform2: () => Transform2
});
module.exports = __toCommonJS(Transform2_exports);
var import_Vector2 = require("./Vector2");
class Transform2 {
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
    return new Transform2(import_Vector2.Vector2.ZERO, 0, import_Vector2.Vector2.ONE, import_Vector2.Vector2.ZERO, import_Vector2.Vector2.ZERO);
  }
  static EQUALS(t1, t2, p = 0) {
    if (t1 === t2)
      return true;
    if (!t2 || !t2)
      return false;
    if (import_Vector2.Vector2.EQUALS(t1.position, t2.position, p) && import_Vector2.Vector2.EQUALS(t1.scale, t2.scale, p) && import_Vector2.Vector2.EQUALS(t1.skew, t2.skew, p) && import_Vector2.Vector2.EQUALS(t1.anchor, t2.anchor, p))
      return true;
    return false;
  }
  static SIMILAR(t1, t2, p = 0) {
    if (t1 === t2)
      return true;
    if (!t2 || !t2)
      return false;
    if (import_Vector2.Vector2.EQUALS(t1.position, t2.position, p) && import_Vector2.Vector2.EQUALS(t1.scale, t2.scale, p) && import_Vector2.Vector2.EQUALS(t1.skew, t2.skew, p))
      return true;
    return false;
  }
  static INVERSE(t) {
    let p = import_Vector2.Vector2.NEG(t.position);
    let s = import_Vector2.Vector2.INVERSE(t.scale);
    let r = -t.rotation;
    let k = import_Vector2.Vector2.NEG(t.skew);
    let a = t.anchor;
    return new Transform2(p, r, s, k, a);
  }
  get parent() {
    return this._parent;
  }
  set parent(x) {
    if (x instanceof Transform2)
      this._parent = x;
  }
  get position() {
    return this._position;
  }
  set position(x) {
    if (x instanceof import_Vector2.Vector2)
      this._position = new import_Vector2.Vector2(x);
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
    if (x instanceof import_Vector2.Vector2)
      this._scale = new import_Vector2.Vector2(x);
  }
  get skew() {
    return this._skew;
  }
  set skew(x) {
    if (x instanceof import_Vector2.Vector2)
      this._skew = new import_Vector2.Vector2(x);
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(x) {
    if (x instanceof import_Vector2.Vector2)
      this._anchor = new import_Vector2.Vector2(x);
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
    if (args[0] instanceof Transform2) {
      let p = args[0];
      this.position = new import_Vector2.Vector2(p.position);
      this.rotation = p.rotation;
      this.scale = new import_Vector2.Vector2(p.scale);
      this.skew = new import_Vector2.Vector2(p.skew);
      this.anchor = new import_Vector2.Vector2(p.anchor);
    } else {
      let [p, r, s, k, a] = args;
      this.position = new import_Vector2.Vector2(p);
      this.rotation = r;
      this.scale = new import_Vector2.Vector2(s);
      this.skew = new import_Vector2.Vector2(k);
      this.anchor = new import_Vector2.Vector2(a);
    }
  }
  inverted() {
    return Transform2.INVERSE(this);
  }
  setParent(x) {
    if (!(x instanceof Transform2))
      return;
    if (x == this)
      return;
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = x;
  }
  addChild(x) {
    if (!(x instanceof Transform2))
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
    if (x instanceof Transform2) {
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
    let parentTransform = this.parent?.getGlobalTransform() || new Transform2();
    let pt = parentTransform;
    let p = import_Vector2.Vector2.ADD(pt.position, this.position);
    let r = pt.rotation + this.rotation;
    let s = import_Vector2.Vector2.MULTIPLY(pt.scale, this.scale);
    let k = new import_Vector2.Vector2(
      Math.tan(Math.atan(this.skew.x) + Math.atan(pt.skew.x)),
      Math.tan(Math.atan(this.skew.y) + Math.atan(pt.skew.y))
    );
    let a = pt.applyTransform(this.anchor, pt.anchor);
    return new Transform2(p, r, s, k, a);
  }
  applyGlobalTransform(pt, anchor = this.anchor, order = ["S", "K", "R", "T"]) {
    let globalTrans = this.getGlobalTransform();
    let newPt = new import_Vector2.Vector2(pt);
    newPt = globalTrans.applyTransform(pt, anchor, order);
    return newPt;
  }
  applyTranslate(pt, anchor = this.anchor) {
    let newPt = new import_Vector2.Vector2(pt);
    newPt = import_Vector2.Vector2.SUBTRACT(newPt, anchor);
    newPt = import_Vector2.Vector2.ADD(newPt, this.position);
    newPt = import_Vector2.Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyRotate(pt, anchor = this.anchor) {
    let newPt = new import_Vector2.Vector2(pt);
    newPt = import_Vector2.Vector2.SUBTRACT(newPt, anchor);
    newPt = newPt.rotated(import_Vector2.Vector2.ZERO, this.rotation);
    newPt = import_Vector2.Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applySkew(pt, anchor = this.anchor) {
    let newPt = new import_Vector2.Vector2(pt);
    newPt = import_Vector2.Vector2.SUBTRACT(newPt, anchor);
    newPt = newPt.skewed(import_Vector2.Vector2.ZERO, this.skew);
    newPt = import_Vector2.Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyScale(pt, anchor = this.anchor) {
    let newPt = new import_Vector2.Vector2(pt);
    newPt = import_Vector2.Vector2.SUBTRACT(newPt, anchor);
    newPt = import_Vector2.Vector2.MULTIPLY(newPt, this.scale);
    newPt = import_Vector2.Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyInverseTransform(pt, anchor = this._anchor, order = ["T", "R", "K", "S"]) {
    let inv = this.inverted();
    return inv.applyTransform(pt, anchor, order.slice());
  }
  applyTransform(pt, anchor = this.anchor, order = ["S", "K", "R", "T"]) {
    let newPt = new import_Vector2.Vector2(pt);
    newPt = import_Vector2.Vector2.SUBTRACT(newPt, anchor);
    for (let trans of order) {
      if (!trans)
        continue;
      switch (trans?.toUpperCase()) {
        case "T":
        case "TRANSLATE":
        case "POSITION":
          newPt = this.applyTranslate(newPt, import_Vector2.Vector2.ZERO);
          break;
        case "R":
        case "ROTATE":
        case "ROTATION":
          newPt = this.applyRotate(newPt, import_Vector2.Vector2.ZERO);
          break;
        case "K":
        case "SKEW":
          newPt = this.applySkew(newPt, import_Vector2.Vector2.ZERO);
          break;
        case "S":
        case "SCALE":
        case "SIZE":
          newPt = this.applyScale(newPt, import_Vector2.Vector2.ZERO);
          break;
        default:
          newPt = newPt;
          break;
      }
    }
    newPt = import_Vector2.Vector2.ADD(newPt, anchor);
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
}
