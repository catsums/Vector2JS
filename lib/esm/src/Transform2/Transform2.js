
import * as MY from "@catsums/my";
import { Vector2 } from "../Vector2/Vector2";

export class Transform2{
	_position;
	_rotation;
	_scale;
	_skew;
	_anchor;
	
	_parent;

	_childs = [];

	get parent(){return this._parent;}
	set parent(x){
		if(x instanceof Transform2) this._parent = x;
	}

	get position(){return this._position;}
	set position(x){
		if(x instanceof Vector2) this._position = x;
	}

	get rotation(){return this._rotation;}
	set rotation(x){
		if(MY.isNumber(x)) this._rotation = Number(x);
	}

	get scale(){return this._scale;}
	set scale(x){
		if(x instanceof Vector2) this._scale = x;
	}

	get skew(){return this._skew;}
	set skew(x){
		if(x instanceof Vector2) this._skew = x;
	}

	get anchor(){return this._anchor;}
	set anchor(x){
		if(x instanceof Vector2) this._anchor = x;
	}

	get children(){return this._childs;}
	get childs(){return this.children;}

	get a(){
		return (this.scale.x) * ( Math.cos(this.rotation) - (Math.sin(this.rotation) * Math.tan(this.skew.x)) )
	}get b(){
		return (this.scale.y) * ( Math.sin(this.rotation) + (Math.cos(this.rotation) * Math.tan(this.skew.y)) );
	}get c(){
		return (this.scale.x) * ( (Math.cos(this.rotation) * Math.tan(this.skew.x)) - Math.sin(this.rotation) );
	}get d(){
		return (this.scale.y) * ( (Math.sin(this.rotation) * Math.tan(this.skew.y)) + Math.cos(this.rotation) );
	}get tx(){
		return this.position.x;
	}get ty(){
		return this.position.y;
	}

	get matrix(){
		return [
			[this.a, this.c, this.tx],
			[this.b, this.d, this.ty],
			[0,0,1]
		];
	}

	constructor(p=Vector2.ZERO,r=0,s=Vector2.ONE,k=Vector2.ZERO,a=Vector2.ZERO){
		if(p instanceof Transform2){
			this.position = new Vector2(p.position);
			this.rotation = Number(p.rotation);
			this.scale = new Vector2(p.scale);
			this.skew = new Vector2(p.skew);
			this.anchor = new Vector2(p.anchor);
		}else{
			this.position = new Vector2(p);
			this.rotation = Number(r);
			this.scale = new Vector2(s);
			this.skew = new Vector2(k);
			this.anchor = new Vector2(a);
		}
		
	}

	setParent(x){
		if(!(x instanceof Transform2)) return;
		if(x == this) return;

		if(this.parent){
			this.parent.removeChild(this);
		}
		this.parent = x;
	}

	addChild(x){
		if(!(x instanceof Transform2)) return;
		if(x == this) return;
		
		x.setParent(this);
		this._childs.push(x);
	}
	removeChild(x){
		if(x == this) return null;

		let ind; let out = null;
		if(x instanceof Transform2)
			ind = this._childs.indexOf(x);
		else if(MY.isNumber(x)){
			ind = x;
		}
		if(ind>=0 && ind<this._childs.length){
			out = this._childs[ind];
			this._childs.splice(ind, 1);
		}
		return out;
	}

	getComputedTransform(){
		let parentTransform = this.parent?.getComputedTransform() || new Transform2();
		let pt = parentTransform;
		

		let p = Vector2.ADD(pt.position, this.position);
		let r = pt.rotation + this.rotation;
		let s = Vector2.MULTIPLY(pt.scale, this.scale);
		let k = new Vector2(
			Math.tan( Math.atan(this.skew.x) + Math.atan(pt.skew.x) ) ,
			Math.tan( Math.atan(this.skew.y) + Math.atan(pt.skew.y) )
		);
		let a = Vector2.ADD(pt.anchor, this.anchor);

		return new Transform2(p,r,s,k,a);
	}

	applyComputedTransform(pt){
		let cpt = this.getComputedTransform();
		let newPt = new Vector2(pt);

		// newPt = Vector2.SUBTRACT(newPt, this.anchor);
		newPt = cpt.applyTransform(pt, this.anchor);
		// newPt = Vector2.ADD(newPt, this.anchor);

		return newPt;
	}

	applyTranslate(pt,anchor=this.anchor){
		let newPt = new Vector2(pt);
		newPt = Vector2.SUBTRACT(newPt, anchor);
		newPt = Vector2.ADD(newPt, this.position);
		newPt = Vector2.ADD(newPt, anchor);
		return newPt;
	}
	applyRotate(pt,anchor=this.anchor){
		let newPt = new Vector2(pt);
		newPt = Vector2.SUBTRACT(newPt, anchor);
		newPt = newPt.rotated(Vector2.ZERO, this.rotation);
		newPt = Vector2.ADD(newPt, anchor);
		return newPt;
	}
	applySkew(pt,anchor=this.anchor){
		let newPt = new Vector2(pt);
		newPt = Vector2.SUBTRACT(newPt, anchor);
		newPt = newPt.skewed(Vector2.ZERO, this.skew);
		newPt = Vector2.ADD(newPt, anchor);
		return newPt;
	}
	applyScale(pt,anchor=this.anchor){
		let newPt = new Vector2(pt);
		newPt = Vector2.SUBTRACT(newPt, anchor);
		newPt = Vector2.MULTIPLY(newPt, this.scale);
		newPt = Vector2.ADD(newPt, anchor);
		return newPt;
	}

	applyTransform(pt, anchor=this.anchor,order=['T','R','K','S']){
		let newPt = new Vector2(pt);
		newPt = Vector2.SUBTRACT(newPt, anchor);
		for(let trans of order){
			if(!trans) continue;

			switch(trans?.toUpperCase()){
				case 'T':case 'TRANSLATE':case 'POSITION':
					newPt = this.applyTranslate(newPt, Vector2.ZERO);
					break;
				case 'R':case 'ROTATE':case 'ROTATION':
					newPt = this.applyRotate(newPt, Vector2.ZERO);
					break;
				case 'K':case 'SKEW':
					newPt = this.applySkew(newPt, Vector2.ZERO);
					break;
				case 'S':case 'SCALE':case 'SIZE':
					newPt = this.applyScale(newPt, Vector2.ZERO);
					break;
				default:
					newPt = newPt;
					break;
			}
		}
		newPt = Vector2.ADD(newPt, anchor);

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

}