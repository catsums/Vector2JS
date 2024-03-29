"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect2 = void 0;
const Vector2_1 = require("./Vector2");
class Rect2 {
    position;
    size;
    static get ORIGIN() {
        return new Rect2(0, 0, 1, 1);
    }
    static EQUALS(r1, r2, p = 0) {
        if (r1 === r2)
            return true;
        if (!r1 || !r2)
            return false;
        let a = new Rect2(r1);
        let b = new Rect2(r2);
        if (Vector2_1.Vector2.EQUALS(a.position, b.position, p) && Vector2_1.Vector2.EQUALS(a.size, b.size, p))
            return true;
        return false;
    }
    static COMBINE(rects) {
        let pts = [];
        for (let r of rects) {
            if (r instanceof Rect2) {
                pts = pts.concat(r.getCorners());
            }
        }
        return Rect2.from(pts);
    }
    static from(pts) {
        return Rect2.getFromPoints(pts);
    }
    static getFromPoints(points) {
        if (points instanceof Array == false)
            return null;
        let xMin, xMax, yMin, yMax;
        xMax = yMax = -Infinity;
        xMin = yMin = Infinity;
        for (let pt of points) {
            pt = new Vector2_1.Vector2(pt);
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
        return new Rect2(xMin, yMin, w, h);
    }
    get start() {
        return new Vector2_1.Vector2(this.left, this.top);
    }
    get end() {
        return new Vector2_1.Vector2(this.right, this.bottom);
    }
    get center() {
        return Vector2_1.Vector2.MIDPOINT([this.start, this.end]);
    }
    get extents() {
        return Vector2_1.Vector2.SUBTRACT(this.center, this.start);
    }
    get topLeft() {
        return new Vector2_1.Vector2(this.left, this.top);
    }
    get topRight() {
        return new Vector2_1.Vector2(this.right, this.top);
    }
    get bottomLeft() {
        return new Vector2_1.Vector2(this.left, this.bottom);
    }
    get bottomRight() {
        return new Vector2_1.Vector2(this.right, this.bottom);
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
        this.size.x = (n);
    }
    get h() {
        return this.size.y;
    }
    set h(n) {
        this.size.y = (n);
    }
    get width() { return this.w; }
    set width(n) { this.w = n; }
    get height() { return this.h; }
    set height(n) { this.h = n; }
    get left() {
        return this.x;
    }
    set left(n) {
        this.w = (this.right - n);
        this.x = n;
    }
    get top() {
        return this.y;
    }
    set top(n) {
        this.h = (this.bottom - n);
        this.y = n;
    }
    get right() {
        return this.x + this.w;
    }
    set right(n) {
        this.w = (n - this.left);
    }
    get bottom() {
        return this.y + this.h;
    }
    set bottom(n) {
        this.h = (n - this.top);
    }
    constructor(...args) {
        let [p, s, w, h] = args;
        if (p instanceof Object) {
            if ('position' in p && 'size' in p) {
                this.position = new Vector2_1.Vector2(p.position);
                this.size = new Vector2_1.Vector2(p.size);
            }
            else if ('x' in p && 'y' in p && 'w' in p && 'h' in p) {
                this.position = new Vector2_1.Vector2(p.x, p.y);
                this.size = new Vector2_1.Vector2(p.w, p.h);
            }
            else if ('x' in p && 'y' in p && 'x' in s && 'y' in s) {
                this.position = new Vector2_1.Vector2(p);
                this.size = new Vector2_1.Vector2(s);
            }
            else if ('top' in p && 'left' in p && 'right' in p && 'bottom' in p) {
                this.position = new Vector2_1.Vector2(p.left, p.top);
                this.size = new Vector2_1.Vector2(p.right - p.left, p.bottom - p.top);
            }
            else if ('t' in p && 'l' in p && 'r' in p && 'b' in p) {
                this.position = new Vector2_1.Vector2(p.l, p.t);
                this.size = new Vector2_1.Vector2(p.r - p.l, p.b - p.t);
            }
        }
        else if (typeof p === 'number' &&
            typeof s === 'number' &&
            typeof w === 'number' &&
            typeof h === 'number') {
            this.position = new Vector2_1.Vector2(p, s);
            this.size = new Vector2_1.Vector2(w, h);
        }
        else {
            this.position = new Vector2_1.Vector2();
            this.size = new Vector2_1.Vector2();
        }
    }
    equals(other, p = 0) {
        return Rect2.EQUALS(this, other, p);
    }
    abs() {
        return new Rect2(this.position, this.size.abs());
    }
    containsPoint(v) {
        v = new Vector2_1.Vector2(v);
        if ((v.x < this.left) ||
            (v.x > this.right) ||
            (v.y < this.top) ||
            (v.y > this.bottom))
            return false;
        return true;
    }
    getIntersectWith(rect, threshold = 0) {
        let other = new Rect2(rect);
        if (!this.intersectsWith(other, threshold))
            return null;
        let yMin = (this.top > other.top) ? this.top : other.top;
        let yMax = (this.bottom < other.bottom) ? this.bottom : other.bottom;
        let xMin = (this.left > other.left) ? this.left : other.left;
        let xMax = (this.right < other.right) ? this.right : other.right;
        return new Rect2(new Vector2_1.Vector2(xMin, yMin), new Vector2_1.Vector2(xMax - xMin, yMax - yMin));
    }
    intersectsWith(rect, threshold = 0) {
        let other = new Rect2(rect);
        if ((this.right + threshold) < (other.left) ||
            (this.left - threshold) > (other.right) ||
            (this.bottom + threshold) < (other.top) ||
            (this.top - threshold) > (other.bottom))
            return false;
        return true;
    }
    isTouching(other, threshold = 0) {
        return this.touches(other, threshold);
    }
    touches(rect, threshold = 0) {
        let other = new Rect2(rect);
        if ((this.right + threshold) == (other.left) ||
            (this.left - threshold) == (other.right) ||
            (this.bottom + threshold) == (other.top) ||
            (this.top - threshold) == (other.bottom))
            return true;
        return false;
    }
    combine(other) {
        return Rect2.COMBINE([this, other]);
    }
    getCorners() {
        return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
    }
    clampPoints(pts) {
        let rect = this;
        let newPts = pts.map((pt) => {
            pt = new Vector2_1.Vector2(pt);
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
            x: this.x, y: this.y, w: this.w, h: this.h,
        };
        rect = Object.assign(rect, {
            get top() { return rect.y; },
            get bottom() { return rect.y + rect.h; },
            get left() { return rect.x; },
            get right() { return rect.x + rect.w; },
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
            size: this.size?.toJSON() || null,
        };
    }
}
exports.Rect2 = Rect2;
