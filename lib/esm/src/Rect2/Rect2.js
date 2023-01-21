
import * as MY from "@catsums/my";
import { Vector2 } from "../Vector2/Vector2";

export class Rect2{
	position; size;

	static getFromPoints(points){
		let xMin, xMax, yMin, yMax;
		xMax = yMax = -Infinity;
		xMin = yMin = Infinity;

		for(let pt of points){
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
		return new Vector2(this.top, this.left);
	}get topRight(){
		return new Vector2(this.top, this.right);
	}get bottomLeft(){
		return new Vector2(this.bottom, this.left);
	}get bottomRight(){
		return new Vector2(this.bottom, this.right);
	}

	get x(){
		return this.position.x;
	}set x(n){
		if(MY.isNumber(n)) this.position.x = n;
	}
	get y(){
		return this.position.y;
	}set y(n){
		if(MY.isNumber(n)) this.position.y = n;
	}
	get w(){
		return this.size.x;
	}set w(n){
		if(MY.isNumber(n)) this.size.x = (n);
	}
	get h(){
		return this.size.y;
	}set h(n){
		if(MY.isNumber(n)) this.size.y = (n);
	}

	get left(){
		return this.x;
	}set left(n){
		if(MY.isNumber(n)){
			this.w = (this.right - n);
			this.x = n;
		}
	}
	get top(){
		return this.y;
	}set top(n){
		if(MY.isNumber(n)){
			this.h = (this.bottom - n);
			this.y = n;
		}
	}
	get right(){
		return this.x + this.w;
	}set right(n){
		if(MY.isNumber(n)){
			this.w = (n - this.left);
		}
	}
	get bottom(){
		return this.y + this.h;
	}set bottom(n){
		if(MY.isNumber(n)){
			this.h = (n - this.top);
		}
	}

	constructor(p,s,w,h){
		if(p instanceof Rect2){
			this.position = new Vector2(p.position);
			this.size = new Vector2(p.size);
		}else if(MY.isObject(p) && 'x' in p && 'y' in p && 'w' in p && 'h' in p){
			this.position = new Vector2(p.x,p.y);
			this.size = new Vector2(p.w,p.h);
		}else if(MY.isObject(p) && 'top' in p && 'left' in p && 'right' in p && 'bottom' in p){
			this.position = new Vector2(p.left,p.top);
			this.size = new Vector2(p.right - p.left, p.bottom - p.top);
		}else if(MY.isObject(p) && 't' in p && 'l' in p && 'r' in p && 'b' in p){
			this.position = new Vector2(p.l,p.t);
			this.size = new Vector2(p.r - p.l, p.b - p.t);
		}else if(MY.isNumber(p) && MY.isNumber(s) && MY.isNumber(w) && MY.isNumber(h)){
			this.position = new Vector2(p,s);
			this.size = new Vector2(w,h);
		}else if(p instanceof Vector2 && s instanceof Vector2){
			this.position = new Vector2(p);
			this.size = new Vector2(s);
		}else{
			this.position = new Vector2();
			this.size = new Vector2();
		}
	}

	abs(){
		return new Rect2(this.position, this.size.abs());
	}

	containsPoint(v){
		if(
			(v.x < this.left) ||
		    (v.x > this.right) ||
		    (v.y < this.top) ||
		    (v.y > this.bottom)
		)
			return false;
		return true;
		
	}

	getIntersectWith(other, threshold=0){
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

	intersectsWith(other, threshold=0){
		if(
			(this.right + threshold) < (other.left) ||
			(this.left - threshold) > (other.right) ||
			(this.bottom + threshold) < (other.top) ||
			(this.top - threshold) > (other.bottom)
		)
			return false;
		return true;
	}
	touches(other, threshold=0){
		if(
			(this.right + threshold) == (other.left) ||
			(this.left - threshold) == (other.right) ||
			(this.bottom + threshold) == (other.top) ||
			(this.top - threshold) == (other.bottom)
		)
			return true;
		return false;
	}

	

	combine(other){
		let pts = this.getCorners().concat(other.getCorners());

		return Rect2.getFromPoints(pts);
	}

	getCorners(){
		return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
	}

	asObject(){
		let rect = {};
		rect = {
			x:this.x, y:this.y, w:this.w, h:this.h,
			get top(){ return rect.y; }, 
			get bottom(){ return rect.y + rect.h; }, 
			get left(){ return rect.x; }, 
			get right(){ return rect.x + rect.w; },
		};

		return rect;
	}

	asArray(){
		return [this.x,this.y,this.w,this.h];
	}

	toString(){
		var out = `Rect2( ${this.position} ${this.size})`;
		return out;
	}

}