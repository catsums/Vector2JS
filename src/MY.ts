//Helper functions

export function mod(n :number, m:number) : number {
	return ((n % m) + m) % m;
}

export function safeDivide(a : number, b :number, useNaN : boolean=false) : number{
	let INF = Infinity;
	let res;
	
	if(a==0 && b == 0){
		if(useNaN)res = NaN;
		else res = 0;
	}else if(a==0 && isInfinity(b)){
		res = 0 * 1;
	}else if(isInfinity(a) && b==0){
		res = a * 1;
	}else if(isInfinity(a) && isInfinity(b)){
		if(useNaN) res = NaN;
		else if(a==b) res = 1;
		else res = -1;
	}else if(b == 0){
		if(useNaN) res = NaN;
		res = INF*a;
	}else if(isInfinity(b)){
		if(useNaN) res = NaN;
		res = 0 * a;
	}else{
		res = (a/b);
	}

	return res;
}

export function isInfinity(x : number) : boolean{
	return ((x === -Infinity)||(x === Infinity));
}

export function roundTo(num, step){
	if(step == 0) return num;
	if(isInfinity(step)) return Infinity;
	let invStep = Math.pow(step,-1);
	let invMiniStep = Math.pow(step/10,-1);

	let initNum = Math.round(num * invMiniStep) / invMiniStep;

	let init = Math.round(initNum  * invStep) / invStep;
	// let res = init;
	let res = Math.round((init + Number.EPSILON)  * invStep) / invStep;

	return res;
}