import { Vector2 } from "./Vector2";

export class Transform2{
	_position : Vector2;
	_rotation : number;
	_scale : Vector2;
	_skew : Vector2;
	_anchor : Vector2;
	
	_parent : Transform2 = null;

	_childs : Transform2[] = [];

	static get ORIGIN(){
		return new Transform2(Vector2.ZERO, 0, Vector2.ONE, Vector2.ZERO, Vector2.ZERO);
	}

	static EQUALS(t1 : Transform2, t2 : Transform2, p=0){
		if(t1 === t2) return true;
		if(!t2 || !t2) return false;

		if(
			Vector2.EQUALS(t1.position, t2.position, p) &&
			Vector2.EQUALS(t1.scale, t2.scale, p) &&
			Vector2.EQUALS(t1.skew, t2.skew, p) &&
			Vector2.EQUALS(t1.anchor, t2.anchor, p)
		) return true;

		return false;
	}
	static SIMILAR(t1 : Transform2, t2 : Transform2, p=0){
		if(t1 === t2) return true;
		if(!t2 || !t2) return false;

		if(
			Vector2.EQUALS(t1.position, t2.position, p) &&
			Vector2.EQUALS(t1.scale, t2.scale, p) &&
			Vector2.EQUALS(t1.skew, t2.skew, p)
		) return true;

		return false;
	}

	static INVERSE(t:Transform2){
		let p = Vector2.NEG(t.position);
		let s = Vector2.INVERSE(t.scale);
		let r = -(t.rotation);
		let k = Vector2.NEG(t.skew);
		let a = t.anchor;

		return new Transform2(p,r,s,k,a); 
	}

	get parent(){return this._parent;}
	set parent(x){
		if(x instanceof Transform2) this._parent = x;
	}

	get position(){return this._position;}
	set position(x){
		if(x instanceof Vector2) this._position = new Vector2(x);
	}

	get rotation(){return this._rotation;}
	set rotation(x){
		this._rotation = Number(x);
	}

	get scale(){return this._scale;}
	set scale(x){
		if(x instanceof Vector2) this._scale = new Vector2(x);
	}

	get skew(){return this._skew;}
	set skew(x){
		if(x instanceof Vector2) this._skew = new Vector2(x);
	}

	get anchor(){return this._anchor;}
	set anchor(x){
		if(x instanceof Vector2) this._anchor = new Vector2(x);
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

	public constructor(position?:IVector2, rotation?:number, scale?:IVector2, skew?:IVector2, anchor?:IVector2);
	public constructor(t:Transform2);
	public constructor();

	constructor(...args){
		if(args[0] instanceof Transform2){
			let p = args[0];

			this.position = new Vector2(p.position);
			this.rotation = (p.rotation);
			this.scale = new Vector2(p.scale);
			this.skew = new Vector2(p.skew);
			this.anchor = new Vector2(p.anchor);
		}else{
			let [p,r,s,k,a] = args;
			
			this.position = new Vector2(p);
			this.rotation = (r);
			this.scale = new Vector2(s);
			this.skew = new Vector2(k);
			this.anchor = new Vector2(a);
		}
		
	}

	inverted(){
		return Transform2.INVERSE(this);
	}

	setParent(x:Transform2){
		if(!(x instanceof Transform2)) return;
		if(x == this) return;

		if(this.parent){
			this.parent.removeChild(this);
		}
		this.parent = x;
	}

	addChild(x:Transform2){
		if(!(x instanceof Transform2)) return;
		if(x == this) return;
		
		x.setParent(this);
		this._childs.push(x);
	}
	removeChild(x:Transform2|number){
		if(x == this) return null;

		let ind:number;
		let out:Transform2 = null;
		if(x instanceof Transform2){
			ind = this._childs.indexOf(x);
		}else if(typeof x === 'number'){
			ind = x;
		}
		if(ind>=0 && ind<this._childs.length){
			out = this._childs[ind];
			this._childs.splice(ind, 1);
			out._parent = null;
		}
		return out;
	}

	getGlobalTransform() : Transform2{
		let parentTransform = this.parent?.getGlobalTransform() || new Transform2();
		let pt = parentTransform;
		

		let p = Vector2.ADD(pt.position, this.position);
		let r = pt.rotation + this.rotation;
		let s = Vector2.MULTIPLY(pt.scale, this.scale);
		let k = new Vector2(
			Math.tan( Math.atan(this.skew.x) + Math.atan(pt.skew.x) ) ,
			Math.tan( Math.atan(this.skew.y) + Math.atan(pt.skew.y) )
		);
		let a = pt.applyTransform(this.anchor, pt.anchor);
		// let a = Vector2.ADD(pt.anchor, this.anchor);

		return new Transform2(p,r,s,k,a);
	}

	applyGlobalTransform(pt:IVector2,anchor:IVector2=this.anchor,order=['S','K','R','T'] ){
		let globalTrans = this.getGlobalTransform();
		let newPt = new Vector2(pt);

		// newPt = Vector2.SUBTRACT(newPt, this.anchor);
		newPt = globalTrans.applyTransform(pt, anchor, order);
		// newPt = Vector2.ADD(newPt, this.anchor);

		return newPt;
	}

	applyTranslate(pt:IVector2,anchor:IVector2=this.anchor){
		let newPt = new Vector2(pt);
		newPt = Vector2.SUBTRACT(newPt, anchor);
		newPt = Vector2.ADD(newPt, this.position);
		newPt = Vector2.ADD(newPt, anchor);
		return newPt;
	}
	applyRotate(pt:IVector2,anchor:IVector2=this.anchor){
		let newPt = new Vector2(pt);
		newPt = Vector2.SUBTRACT(newPt, anchor);
		newPt = newPt.rotated(Vector2.ZERO, this.rotation);
		newPt = Vector2.ADD(newPt, anchor);
		return newPt;
	}
	applySkew(pt:IVector2,anchor:IVector2=this.anchor){
		let newPt = new Vector2(pt);
		newPt = Vector2.SUBTRACT(newPt, anchor);
		newPt = newPt.skewed(Vector2.ZERO, this.skew);
		newPt = Vector2.ADD(newPt, anchor);
		return newPt;
	}
	applyScale(pt:IVector2,anchor:IVector2=this.anchor){
		let newPt = new Vector2(pt);
		newPt = Vector2.SUBTRACT(newPt, anchor);
		newPt = Vector2.MULTIPLY(newPt, this.scale);
		newPt = Vector2.ADD(newPt, anchor);
		return newPt;
	}

	applyInverseTransform(pt:IVector2, anchor:IVector2=this._anchor,order=['T','R','K','S']){
		let inv = this.inverted();

		return inv.applyTransform(pt, anchor, order.slice())
	}

	applyTransform(pt:IVector2, anchor:IVector2=this.anchor,order=['S','K','R','T']){
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

	asMatrix(){
		return this.matrix;
	}

	asArray(){
		return [this.a, this.b, this.c, this.d, this.tx, this.ty];
	}

	asObject() : Object{
		return {
			position: this.position?.toJSON() || null,
			rotation: (typeof this.rotation === 'number') ? this.rotation : null,
			scale: this.scale?.toJSON() || null,
			skew: this.skew?.toJSON() || null,
			anchor: this.anchor?.toJSON() || null,
		}
	}

	toString(){
		return `( Translate: ${this.position} Rotate: (${this.rotation}) Scale: ${this.scale} Skew: ${this.skew} Anchor: ${this.anchor} )`;
	}
	toJSON(){
		return this.asObject();
	}

}