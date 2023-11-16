import { Vector2 } from "./Vector2";

declare global{
	type IRect = IRectPS | IRectXYWH | IRectTLBR;

	interface IRectPS{
		position : IVector2;
		size : IVector2;
	}
	interface IRectXYWH{
		x : number;
		y : number;
		w : number;
		h : number;
	}
	interface IRectTLBR{
		top : number;
		left : number;
		right : number;
		bottom : number;
	}
	interface IRectTLBRMini{
		t : number;
		l : number;
		r : number;
		b : number;
	}
}

export class Rect2 implements IRectPS, IRectTLBR, IRectXYWH{
	position; size;

	static get ORIGIN(){
		return new Rect2(0,0,1,1);
	}

	static EQUALS(r1 : IRect, r2 : IRect, p=0){
		if(r1 === r2) return true;
		if(!r1 || !r2) return false;

		let a = new Rect2(r1);
		let b = new Rect2(r2);

		if(Vector2.EQUALS(a.position, b.position, p) && Vector2.EQUALS(a.size, b.size, p))
			return true;

		return false;
	}

	static COMBINE(rects:IRect[]){
		let pts = [];
		for(let r of rects){
			if(r instanceof Rect2){
				pts = pts.concat(r.getCorners());
			}
		}
		
		return Rect2.from(pts);
	}

	static from(pts:IVector2[]){
		return Rect2.getFromPoints(pts);
	}

	static getFromPoints(points:IVector2[]){
		if(points instanceof Array == false) return null;
		let xMin, xMax, yMin, yMax;
		xMax = yMax = -Infinity;
		xMin = yMin = Infinity;

		for(let pt of points){
			pt = new Vector2(pt);
			if(xMin==null || xMin>pt.x) xMin = pt.x;
			if(yMin==null || yMin>pt.y) yMin = pt.y;
			if(xMax==null || xMax<pt.x) xMax = pt.x;
			if(yMax==null || yMax<pt.y) yMax = pt.y;
		}

		let w = xMax - xMin;
		let h = yMax - yMin;

		return new Rect2(xMin,yMin,w,h);
	}

	get start(){
		return new Vector2(this.left,this.top);
	}
	get end(){
		return new Vector2(this.right, this.bottom);
	}
	get center(){
		return Vector2.MIDPOINT([this.start, this.end]);
	}
	get extents(){
		return Vector2.SUBTRACT(this.center, this.start);
	}

	get topLeft(){
		return new Vector2(this.left, this.top);
	}get topRight(){
		return new Vector2(this.right, this.top);
	}get bottomLeft(){
		return new Vector2(this.left, this.bottom);
	}get bottomRight(){
		return new Vector2(this.right, this.bottom);
	}

	get x(){
		return this.position.x;
	}set x(n:number){
		this.position.x = n;
	}
	get y(){
		return this.position.y;
	}set y(n:number){
		this.position.y = n;
	}
	get w(){
		return this.size.x;
	}set w(n:number){
		this.size.x = (n);
	}
	get h(){
		return this.size.y;
	}set h(n:number){
		this.size.y = (n);
	}

	get width(){ return this.w } set width(n:number){ this.w = n; }
	get height(){ return this.h } set height(n:number){ this.h = n; }

	get left(){
		return this.x;
	}set left(n:number){
		this.w = (this.right - n);
		this.x = n;
	}
	get top(){
		return this.y;
	}set top(n:number){
		this.h = (this.bottom - n);
		this.y = n;
	}
	get right(){
		return this.x + this.w;
	}set right(n:number){
		this.w = (n - this.left);
	}
	get bottom(){
		return this.y + this.h;
	}set bottom(n:number){
		this.h = (n - this.top);
	}

	public constructor(rect:IRect);
	public constructor(x:number, y:number, w:number, h:number);
	public constructor(p:IVector2, s:IVector2);
	public constructor();

	constructor(...args){
		let [p,s,w,h] = args;

		if(p instanceof Object){
			if('position' in p && 'size' in p){
				this.position = new Vector2(p.position);
			this.size = new Vector2(p.size);
			}else if('x' in p && 'y' in p && 'w' in p && 'h' in p){
				this.position = new Vector2(p.x,p.y);
				this.size = new Vector2(p.w,p.h);
			}else if('x' in p && 'y' in p && 'x' in s && 'y' in s){
				this.position = new Vector2(p);
				this.size = new Vector2(s);
			}else if('top' in p && 'left' in p && 'right' in p && 'bottom' in p){
				this.position = new Vector2(p.left,p.top);
				this.size = new Vector2(p.right - p.left, p.bottom - p.top);
			}else if('t' in p && 'l' in p && 'r' in p && 'b' in p){
				this.position = new Vector2(p.l,p.t);
				this.size = new Vector2(p.r - p.l, p.b - p.t);
			}
		}else if(
			typeof p === 'number' &&
			typeof s === 'number' &&
			typeof w === 'number' &&
			typeof h === 'number'
		){
			this.position = new Vector2(p,s);
			this.size = new Vector2(w,h);
		}else{
			this.position = new Vector2();
			this.size = new Vector2();
		}
	}

	equals(other:IRect,p=0){
		return Rect2.EQUALS(this,other,p);
	}

	abs(){
		return new Rect2(this.position, this.size.abs());
	}

	containsPoint(v:IVector2){
		v = new Vector2(v);
		if(
			(v.x < this.left) ||
		    (v.x > this.right) ||
		    (v.y < this.top) ||
		    (v.y > this.bottom)
		)
			return false;
		return true;
		
	}

	getIntersectWith(rect:IRect, threshold=0){
		let other = new Rect2(rect);
		if(!this.intersectsWith(other,threshold))
			return null;

		let yMin = (this.top > other.top)?this.top:other.top;
		let yMax = (this.bottom < other.bottom)?this.bottom:other.bottom;

		let xMin = (this.left > other.left)?this.left:other.left;
		let xMax = (this.right < other.right)?this.right:other.right;

		return new Rect2(
			new Vector2(xMin,yMin), new Vector2(xMax-xMin, yMax-yMin)
		);

	}

	intersectsWith(rect:IRect, threshold=0){
		let other = new Rect2(rect);
		if(
			(this.right + threshold) < (other.left) ||
			(this.left - threshold) > (other.right) ||
			(this.bottom + threshold) < (other.top) ||
			(this.top - threshold) > (other.bottom)
		)
			return false;
		return true;
	}
	isTouching(other:IRect, threshold=0){
		return this.touches(other,threshold);
	}
	touches(rect:IRect, threshold=0){
		let other = new Rect2(rect);
		if(
			(this.right + threshold) == (other.left) ||
			(this.left - threshold) == (other.right) ||
			(this.bottom + threshold) == (other.top) ||
			(this.top - threshold) == (other.bottom)
		)
			return true;
		return false;
	}

	combine(other:IRect){
		return Rect2.COMBINE([this, other]);
	}

	getCorners(){
		return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
	}

	clampPoints(pts:IVector2[]){
		let rect = this;
		let newPts = pts.map((pt)=>{
			pt = new Vector2(pt);
			if(pt.y > rect.bottom) pt.y = rect.bottom;
			if(pt.x > rect.right) pt.x = rect.right;
			if(pt.y < rect.top) pt.y = rect.top;
			if(pt.x < rect.left) pt.x = rect.left;
			return pt;
		});
		return newPts;
	}

	asObject(){
		let rect:IRectXYWH = {
			x:this.x, y:this.y, w:this.w, h:this.h,
		};
		rect = Object.assign(rect, {
			get top(){ return rect.y; }, 
			get bottom(){ return rect.y + rect.h; }, 
			get left(){ return rect.x; }, 
			get right(){ return rect.x + rect.w; },
		});

		return rect as IRect;
	}
	asArray(){
		return [this.x,this.y,this.w,this.h];
	}
	toString(){
		var out = `Rect2( ${this.position} ${this.size})`;
		return out;
	}
	toJSON(){
		return {
			position: this.position?.toJSON() || null,
			size: this.size?.toJSON() || null,
		};
	}

}