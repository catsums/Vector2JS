
import {
	mod, safeDivide, roundTo, isInfinity
} from './MY'
import { Vector2 } from './Vector2';

export class Vector2Line{
	a = 1;
	b = -1;
	c = 0;
	// f //x intercept
	// e //y intercept
	// m //gradient
	static get Y_AXIS(){
		return new Vector2Line(1,0,0);
	}
	static get X_AXIS(){
		return new Vector2Line(0,-1,0);
	}
	static get ONE(){
		return new Vector2Line(1,-1,0);
	}
	static get NEG_ONE(){
		return new Vector2Line(1,1,0);
	}

	get gradient(){
		return safeDivide( -(this.a), this.b );
	}get m(){
		return this.gradient;
	}

	get xIntercept(){
		return safeDivide( -(this.c), this.a );
	}get f(){
		return this.xIntercept;
	}

	get yIntercept(){
		return safeDivide( -(this.c), this.b );
	}get e(){
		return this.yIntercept;
	}

	public constructor(x: IVector2, y:IVector2);
	public constructor(a: number, b: number, c: number);
	public constructor(x: number, y: number);
	public constructor({a,b,c}:{a: number, b: number, c: number});
	public constructor({m,c}:{m: number, c: number});
	public constructor({gradient,yIntercept,xIntercept}:{gradient: number, yIntercept: number, xIntercept?:number});
	public constructor({xIntercept,yIntercept}:{xIntercept: number, yIntercept: number});
	public constructor({x,y}:{x: number, y: number});
	public constructor({f,e}:{f: number, e: number});
	public constructor(line:Vector2Line);

	constructor(...args){
		if(args[0] instanceof Vector2Line){
			let obj = args[0];

			this.a = obj.a;
			this.b = obj.b;
			this.c = obj.c;
			
		}else if((args[0] instanceof Object && args[1] instanceof Object)){
			let x = args[0], y = args[1];
			//make line that passes through these points
			let a, b, c;

			let v1 = new Vector2(
				(x.x||x[0]||0), (x.y||x[1]||0)
			);
			let v2 = new Vector2(
				(y.x||y[0]||0), (y.y||y[1]||0)
			);

			let m = Vector2.SUBTRACT(v2,v1).gradient();

			//y=mx+e
			//e = y - mx

			let e, f;

			if(isInfinity(m)){
				//vertical line
				c = -(v1.x || v2.x);
				b = 0;
				a = 1;
			}else if(m == 0){
				//horizontal line
				a = 0;
				b = -1;
				c = (v1.y || v2.y);
			}else{
				e = (v1.y) - (m * (v1.x));
				f = safeDivide(-e, m);

				c = -(f * m);
				b = safeDivide(-c, e) || 1;
				a = -(b*m);

				//
			}
			
			//finish and account for vertical and horizontal lines

			this.a = a; this.b = b; this.c = c;
		}else if(args[0] instanceof Object){
			let x = args[0];
			if( 'a' in x && 'b' in x && 'c' in x ){
				//use standard form
				let obj = x;

				this.a = obj.a;
				this.b = obj.b;
				this.c = obj.c;
			}else if(
				('gradient' in x || 'm' in x) && ('e' in x || 'c' in x || 'yIntercept' in x)
			){
				//use intercept form
				let obj = x;
				let a, b, c;

				let m = (obj.gradient)||(obj.m)||0;
				let e = (obj.e)||(obj.c)||(obj.yIntercept)||0;
				let f;

				if('f' in obj || 'xIntercept' in obj){
					f = (obj.f)||(obj.xIntercept)||0;
					c = -(f * m);
				}else{
					c = 1;
					f = safeDivide(-c,m);
				}

				b = safeDivide(-c, e);
				a = -(b*m);

				this.a = a; this.b = b; this.c = c;

			}else if(
				('f' in x || 'x' in x || 'c' in x || 'xIntercept' in x) && ('e' in x || 'y' in x || 'yIntercept' in x)
			){
				//use intercept form but with actual intercepts
				let obj = x;
				let a, b, c;

				let e = (obj.e)||(obj.c)||(obj.y)||(obj.yIntercept)||0;
				let f = (obj.f)||(obj.x)||(obj.xIntercept)||0;

				let m = new Vector2(0 - e, f - 0).gradient();

				c = -(f * m);
				b = safeDivide(-c, e);
				a = -(b*m);

				this.a = a; this.b = b; this.c = c;
			}
		}else if(typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number'){
			//treat as x and y intercepts
			let x = args[0], y = args[1], z = args[2];

			let a, b, c;

			a = x; b = y; c = z;

			this.a = a; this.b = b; this.c = c;

		}else if(typeof args[0] === 'number' && typeof args[1] === 'number'){
			//treat as x and y intercepts
			let x = args[0], y = args[1];

			let a, b, c;

			let e = y;
			let f = x;

			let m = new Vector2(0 - e, f - 0).gradient();

			c = -(f * m);
			b = safeDivide(-c, e);
			a = -(b*m);

			this.a = a; this.b = b; this.c = c;
		}

	}

	getX(y:number){
		let x;
		if(this.b != 0){
			let m = this.gradient;
			let e = this.yIntercept;

			//y = mx+e
			//x = (y - e)/m

			x = safeDivide((y - e), m);
		}else{
			let c = this.c;
			let a = this.a;

			x = safeDivide(-c, a);
		}

		return x;

	}
	getY(x:number){
		let y;
		if(this.a != 0){
			let m = this.gradient;
			let e = this.yIntercept;

			//y = mx+e
			//x = (y - e)/m

			y = (m*x) + e;
		}else{
			let c = this.c;
			let b = this.b;

			y = safeDivide(-c, b);
		}

		return y;
	}

	equals(other:Vector2Line){
		return (
			this.gradient == other.gradient &&
			this.yIntercept == other.yIntercept &&
			this.xIntercept == other.xIntercept
		);
	}

	isHorizontal(){
		return (this.a === 0);
	}
	isVertical(){
		return (this.b === 0);
	}

	hasPoint(point:IVector2){
		let v = new Vector2(point);

		//ax+by+c=0

		let res;

		if(isInfinity(this.a) && isInfinity(this.b)){
			if(this.a == this.b){
				// INF + INF
				res = Infinity + this.c;
			}else{
				// INF - INF
				res = 0 + this.c;
			}
		}else{
			let ax = (this.a * v.x);
			let by = (this.b * v.y);
			let c = (this.c);

			res = (ax + by + c);
			res = Number(res);
		}
		
		return (res == 0);

	}

	angle(){
		let xInt = this.xIntercept;
		let yInt = this.yIntercept;

		if(xInt == Infinity) return 0; //or Math.PI
		if(xInt == -Infinity) return (Math.PI); //or Math.PI
		if(yInt == Infinity) return (Math.PI/2);
		if(yInt == -Infinity) return -(Math.PI/2);

		let vx = new Vector2(xInt, 0);
		let vy = new Vector2(0,yInt);

		return vx.angleToPoint(vy);
	}

	static INTERSECT(l1:Vector2Line, l2:Vector2Line){
		return l1.intersect(l2);
	}
	static INTERSECTS(arr:Vector2Line[]){
		if(!arr?.length){
			return [];
		}
		let pts:Vector2[] = [];
		for(let lineA of arr){
			for(let lineB of arr){
				if(lineA == lineB) continue;
				let ab = Vector2Line.INTERSECT(lineA,lineB);
				if(ab) pts.push(ab);
			}
		}

		return pts;
	}

	intersect(other:Vector2Line){
		//x = (b1c2-b2c1)/(a1b2-a2b1) = BC/AB
		//y = (a2c1-a1c2)/(a1b2-a2b1) = AC/AB

		if(other.gradient == this.gradient){
			return null;
		}

		let a1 = this.a, a2 = other.a;
		let b1 = this.b, b2 = other.b;
		let c1 = this.c, c2 = other.c;

		let b1c2 = b1 * c2; let b2c1 = b2 * c1;
		let a1b2 = a1 * b2; let a2b1 = a2 * b1;
		let a2c1 = a2 * c1; let a1c2 = a1 * c2;

		let BC, AB, AC;

		if(isInfinity(b1c2) && isInfinity(b2c1) && b1c2==b2c1){
			BC = b1c2;
		}else{
			BC = (b1c2-b2c1);
		}
		if(isInfinity(a1b2) && isInfinity(a2b1) && a1b2==a2b1){
			AB = a1b2;
		}else{
			AB = (a1b2-a2b1);
		}
		if(isInfinity(a2c1) && isInfinity(a1c2) && a2c1==a1c2){
			AC = a2c1;
		}else{
			AC = (a2c1-a1c2);
		}

		let x = safeDivide((BC),(AB));
		let y = safeDivide((AC),(AB));

		return new Vector2(x,y);

	}

	perpendicular(point:IVector2){

		point = new Vector2(point);

		if(this.a == 0){
			let a = this.b, b = this.a, c = point.x;
			return new Vector2Line({a,b,c});
		}else if(this.b == 0){
			let a = this.b, b = this.a, c = point.y;
			return new Vector2Line({a,b,c});
		}else{

			let m = safeDivide(-1,this.gradient);

			let e = (point.y) + ((1/m) * point.x);

			let f = safeDivide(-e, m);

			return new Vector2Line({
				gradient: m, xIntercept: f, yIntercept: f
			});

		}

	}

	normal(){
		return new Vector2(this.a, this.b);
	}

	mirror(point:IVector2){
		point = new Vector2(point);

		if(this.hasPoint(point)){
			return new Vector2(point);
		}

		let _normal = this.normal();
		let unitNormal = _normal.normalized();

		let unitC = safeDivide(this.c , _normal.length());

		let signedDist = (unitNormal.x * point.x) + (unitNormal.y * point.y) + unitC;

		let mx = point.x - 2 * unitNormal.x * signedDist;
		let my = point.y - 2 * unitNormal.y * signedDist;

		return new Vector2(mx,my);
	}

	asObject(){
		return {a:this.a,b:this.b,c:this.c};
	}
	toString(){
		return `(${this.a}x + ${this.b}y + ${this.c})`;
	}
	toJSON(){
		return this.asObject();
	}

}