# Vector2JS
Vector2 library for Javascript inspired by Godot and Unity, but for handling the DOM and Canvas or just plain Vector Math calculations.

This includes these classes:
- `Vector2`
- `Vector2Line`
- `Rect2`
- `Transform2`

## Installing with NPM

```shell
npm install @catsums/vector2
```

## Installing with CDN

```html
<!-- For Production -->
<script src="unpkg.com/@catsums/vector2@latest/lib/umd/index.min.js"></script>
<!-- For Development -->
<script src="unpkg.com/@catsums/vector2@latest/lib/umd/index.dev.js"></script>
```

You can use ESM imports on these:
```js
import {Vector2, Vector2Line, Rect2, Transform2} from "@catsums/vector2";
```
You can also use CommonJS syntax:
```js
const {Vector2, Vector2Line, Rect2, Transform2} = require("@catsums/vector2");
```

You may also use a CDN for which default library name is `VECTOR2` :
```html
<script src="unpkg.com/@catsums/vector2@latest/lib/umd/index.min.js"></script>
<script>
	//after adding <script> tag with cdn link
	
	const Vector2 = VECTOR2.Vector2;
	const Vector2Line = VECTOR2.Vector2Line;
	const Rect2 = VECTOR2.Rect2;
	const Transform2 = VECTOR2.Transform2;

</script>
```


## Vector2
A class that represents a 2D point in vector/catersian space and can apply vector math on it.

```js
import {Vector2} from "@catsums/vector2";

let v1 = new Vector2(3,4); // ( 3 , 4 )
let v2 = new Vector2([4,5]); // ( 4 , 5 )

let v3 = Vector2.ADD(v1,v2); // ( 7 , 9 )

let v0 = Vector2.ZERO;
v0.add(v1); // ( 3 , 4 )

v0.subtract(v2); // ( -4 , -5 )

let dirV1 = v1.normalised();
let dirV0 = v0.normalised();

let midDir01 = normV1.lerp(normV0, 0.5);
let alsoMidDir01 = normV1.midPoint(normV0);

```

### Static Parameters

##### `Vector2.ZERO`
Returns the point with x = 0 and y = 0.
##### `Vector2.ONE`
Returns the point with x = 1 and y = 1.
##### `Vector2.NEG_ONE`
Returns the point with x = -1 and y = -1.
##### `Vector2.INF`
Returns the point with x = `Infinity` and y = `Infinity`.
##### `Vector2.NEG_INF`
Returns the point with x = `-Infinity` and y = `-Infinity`.
##### `Vector2.EPSILON`
Returns the point with both x and y = `Number.EPSILON`.

##### `Vector2.UP`
Returns the point with x = 0 and y = -1.
##### `Vector2.DOWN`
Returns the point with x = 0 and y = 1.
##### `Vector2.LEFT`
Returns the point with x = -1 and y = 0.
##### `Vector2.RIGHT`
Returns the point with x = 1 and y = 0.

### Static Methods

##### `Vector2.ADD(v1:Vector2, v2:Vector2) : Vector2`
Returns a point made of v1 + v2 i.e. the components are added together.
##### `Vector2.SUBTRACT(v1:Vector2, v2:Vector2) : Vector2`
Returns a point made of v1 - v2 i.e. v2's components are subtracted from the components of v1.
##### `Vector2.MULTIPLY(v1:Vector2, v2:Vector2) : Vector2`
Returns a point made of v1 * v2 i.e. the components are multiplied together.
##### `Vector2.DIVIDE(v1:Vector2, v2:Vector2) : Vector2`
Returns a point made of v1 - v2 i.e. v2's components are divide from the components of v1.
##### `Vector2.SCALE(v1:Vector2, n:number) : Vector2`
Returns a point made of v1 * n i.e. the components are scaled by a value.
##### `Vector2.MOD(v1:Vector2, v2:Vector2) : Vector2`
Returns a point made of v1 mod v2 i.e. the components of v1 are modded by the components of v2.
##### `Vector2.MODBY(v1:Vector2, n:number) : Vector2`
Returns a point made of v1 mod n i.e. the components of v1 are modded by the value n
##### `Vector2.DOT(v1:Vector2, v2:Vector2) : number
Returns the dot product of v1 and v2.
##### `Vector2.EQUALS(v1:Vector2, v2:Vector2, precision:number=0) : boolean`
Returns a true if these points have their components are the same by a certain precision.
##### `Vector2.MIDPOINT(arr:Vector2[]) : Vector2`
Returns the midpoint of an array of points.
##### `Vector2.INVERSE(v1:Vector2) : Vector2`
Returns the inverse of that vector point i.e. the components are inverted via 1/x.
##### `Vector2.FLIPPED(v1:Vector2) : Vector2`
Returns a point but the components are flipped.
##### `Vector2.NEG(v1:Vector2) : Vector2`
Returns a point but the components are multiplied by negative one.
##### `Vector2.SortAlgo(v1:Vector2, v2:Vector2) : boolean`
Sorting algorithm to compare vector points by their lengths.
##### `Vector2.SortAlgoX(v1:Vector2, v2:Vector2) : boolean`
Sorting algorithm to compare vector points by their x components.
##### `Vector2.SortAlgoY(v1:Vector2, v2:Vector2) : boolean`
Sorting algorithm to compare vector points by their y components.
##### `Vector2.SortAlgoXY(v1:Vector2, v2:Vector2) : boolean`
Sorting algorithm to compare vector points by their x components, then their y components.
##### `Vector2.SortAlgoYX(v1:Vector2, v2:Vector2) : boolean`
Sorting algorithm to compare vector points by their y components, then their x components.
##### `Vector2.SortAlgoAvg(v1:Vector2, v2:Vector2) : boolean`
Sorting algorithm to compare vector points by their the average of the two components.

##### `Vector2.quadraticBezier(points:Vector2[], t:number) : Vector2`
Uses the bezier algorithm to interpolate certain points by a certain t value. The points, excluding the start and end, are control points that determine if it is quadratic, cubic or anything beyond.

##### `Vector2.quadraticBezierPoints(points:Vector2[], inc:number) : Vector2[]`
Uses the bezier algorithm to interpolate certain points and returns the result points determined by the increment in the t value. This lets you have points to render from a curve algorithm by a certain degree.

### Instance Parameters

##### `v.x : number`
The x component of the point
##### `v.y : number`
The y component of the point

### Instance Methods

##### `new Vector2()`
Constructor that creates a vector representing the origin (0,0).
##### `new Vector2(x:number, y:number)`
Constructor that takes in two values being x and y of the point respectively
##### `new Vector2(arr:number[])`
Constructor that takes in an array and uses the first two values to create the point
##### `new Vector2(obj:Object)`
Constructor that takes in an object that has the keys x and y
##### `new Vector2(v:Vector2)`
Copy Constructor that copies the x and y values of the passed vector point.

##### `v.abs() : Vector2`
Returns the vector with the absolute values of x and y (both are positive).

##### `v.lengthSquared() : number`
Returns the magnitude of the point but squared. This is normally much quicker of a calculation that getting the actual magnitude of the point, which can be used for comparing lengths faster. ~~Although the processing speed can be negligable depending on what you want to do.

##### `v.length()` or `v.magnitude() : number`
Returns the magnitude of the point.

##### `v.lerp(other:Vector2, t:number) : Vector2`
Linearly interpolates a point by a certain value `t` between 0 and 1 (inclusively). This can be used for calculating bezier curves.

##### `v.sumOfParts() : number`
Returns the sum of the components x and y, in case youre lazy to type `v.x + v.y` everywhere in your code.

##### `v.isNormalised() : boolean`
Returns true if the point is normalised :. the point's magnitude is 1.

##### `v.normalised() : Vector2`
Returns the point but in its normalised state.

##### `v.dot(other:Vector2) : number`
Returns the dot product of the vector and the other vector

##### `v.gradient() : number`
Returns the division result of y and x :. `y/x`.

##### `v.lineTo(other:Vector2) : Vector2`
Gets the vector of the line that joins to the other point from this point. This is also calculated as `other - v`

##### `v.angle() : number`
Returns the angle between the vector and the positive X axis.

##### `v.angleTo(other:Vector2) : number`
Returns the angle between the two vectors :. `v.angle() - other.angle()`.

##### `v.angleToPoint(other:Vector2) : number`
Returns the angle to the point based on the line formed by these points :. `(other - v).angle()`

##### `v.angleBetween(a:Vector2, b:Vector2) : number`
Gets the angle between these three points, with point `v` as the vertex.

##### `v.distanceSquaredTo(other:Vector2) : number`
Returns the square distance of the line to the other vector.

##### `v.distanceTo(other:Vector2) : number`
Returns the exact distance of the line to the other vector.

##### `v.directionTo(other:Vector2) : Vector2`
Returns the normalised vector of the line to the other vector which represents the direction.

##### `v.rotateAround(pivot:Vector2, angle:number) : void`
Mutates the vector to rotate around a certain pivot point by a certain angle.

##### `v.rotated(pivot:Vector2, angle:number) : Vector2`
Returns the vector point but rotated around a certain pivot by a certain angle. This does not mutate the original point.

##### `v.skewed(pivot:Vector2, skewer:Vector2) : Vector2`
Returns the vector but skewed by a pivot by a certain degree of x and y represented by a skewer vector. Does not mutate the original vector.

##### `v.skew(pivot:Vector2, skewer:Vector2) : void`
Mutates the point to skew it by a pivot by a certain degree of x and y represented by a skewer vector.

##### `v.inverse() : Vector2`
Returns the vector point but the x and y are set to their inverse :. `v.x = 1/v.x`.

##### `v.flipped() : Vector2`
Returns the point but the x and y are flipped.

##### `v.midPoint(other:Vector2) : Vector2`
Returns the point between this point and another point.

##### `v.floor() : Vector2`
Returns the point but the x and y values are floored.

##### `v.ceil() : Vector2`
Returns the point but the x and y values are ceiled.

##### `v.reflect(norm:Vector2) : Vector2`
Reflects the vector by a certain normal.

##### `v.project(norm:Vector2) : Vector2`
Projects the point by a certain normal.

##### `v.slide(other:Vector) : Vector2`
Slides the point onto another point.

##### `v.bounce(other:Vector2) : Vector2`
Bounces the point by another.

##### `v.closestPoint(arr:Vector[], exclusive:boolean=false) : Vector2`
Returns the closest point out of the array. The `exclusive` flag compares to see if the function should exclude points that are equal to the same point being compared to.

##### `v.equals(other:Vector2, precision:number=0) : boolean`
Checks if the points are equal (i.e. x and y components are equal). The precision parameter allows for comparing by a certain precision (rounding off by a certain decimal).

##### `v.add(other:Vector2) : void`
Adds the components of the other vector to the current vector.

##### `v.subtract(other:Vector2) : void`
Subtracts the current vector's components from the other vector.

##### `v.multiply(other:Vector2) : void`
Multiplies the components of the current vector by another vector.

##### `v.divide(other:Vector2) : void`
Divides the current vector's components from the other vector.

##### `v.scaleBy(n:number) : void`
Scales the current vector by a certain value. e.g. scaling by 2 makes the components double the size.

##### `v.scaled(n:number) : Vector2`
Returns the vector but scaled by that value without mutating it.

##### `v.modBy(n:number) : void`
Scales the current vector using the modulus operator (not JS' % operator which is the remainder operator)

##### `v.sortPointsByClosest(points:Vector[]) : Vector2[]`
Sorts an array of points by the closest first to the farthest point first. This returns a new array but with the sorted points.

##### `v.toString() : string`
Returns the vector in the form of a string `( {x} , {y} )` e.g. a vector of (3,4) will  be `( 3 , 4 )`.

##### `v.asObject() : Object{x:number,y:number}`
Returns the vector point as a JS object with the x and y values.

##### `v.asArray() : number[]`
Returns the vector point components as an array, with x and y in that order.

##### `v.toJSON() : Object{x:number,y:number}`
Returns the vector as a JS object that can be parsed as JSON

##### `v.isGreaterThan(other:Vector2) : boolean`
Compares the length of the vectors to see if this vector is greater than the other.

##### `v.isLesserThan(other:Vector2) : boolean`
Compares the length of the vectors to see if this vector is lesser than the other.

##### `v.neg() : Vector2`
Returns the vector point but the components are multiplied by negative one.



## Vector2Line
A class that represents a 2D straight line on a cartesian plane. This is represented in the standard form of `ax+by+c=0`, therefore the components of the class would be `a`, `b` and `c`. This allows for handling lines which have 0 or Infinite gradients.

Vertical lines will be formed with a = 0 and b = 1. Horizontal lines will be formed with a = 1 and b = 0.

The vector line can also be represented in intercept form `y = mx + e` for which `e` is used for the y intercept because of the variable `c` used in standard form. The variable `f` is used to show the x intercept. So you can use `vectorline.m` to get the gradient, `vectorline.e` to get the y intercept and so on.

```js
import {Vector2, Vector2Line} from "@catsums/vector2";

// create line y = 2x + 3
let l1 = new Vector2Line({m:2,e:3});
// create line with points (3,4) and (4,1)
let l2 = new Vector2Line(new Vector2(3,4), new Vector2(4,1));

let intersect = l1.intersect(l2);

let l1XInt = l1.xIntercept; //or l1.f;

let yAxis = Vector2Line.Y_AXIS;

let v1 = new Vector2(4,5);

let mv1 = yAxis.mirror(v1); //mirrors (4,5) about y -axis

```

### Static Parameters
##### `Vector2Line.Y_AXIS : Vector2Line`
Returns the line that represents the Y axis.
##### `Vector2Line.Y_AXIS : Vector2Line`
Returns the line that represents the X axis.
##### `Vector2Line.ONE : Vector2Line`
Returns the line that has a gradient of one and intersects the origin.
##### `Vector2Line.NEG_ONE : Vector2Line`
Returns the line that has a gradient of negative one and intersects the origin.

### Static Methods

##### `Vector2Line.INTERSECT(l1:Vector2Line,l2:Vector2Line) : Vector2`
Returns the intersect point of the two lines.
##### `Vector2Line.INTERSECTS(arr:Vector2Line[]) : Vector2[]`
Returns the intersect points of the given array of points.

### Instance Parameters

##### `line.a : number`
The `a` component of the standard form
##### `line.b : number`
The `b` component of the standard form
##### `line.c : number`
The `c component of the standard form
##### `line.m : number` or `line.gradient : number`
The gradient or `m` component of the intercept form
##### `line.e : number` or `line.yIntercept`
The y intercept or `e` component of the intercept form
##### `line.f : number` or `line.xIntercept`
The x intercept or `f` component of the intercept form

### Instance Methods

##### `new Vector2Line(a:number, b:number, c:number)`
Creates a vector line with each number as each component.
##### `new Vector2Line()`
Creates a vector line that passed through the origin and has a gradient of one. This leaves the line with a = 1, b = -1, c = 0.
##### `new Vector2Line(opts:Object{a:number,b:number,c:number})`
Creates a vector line with an object that has the components
##### `new Vector2Line(line:Vector2Line)`
Copy constructor that copies the line's a, b and c.
##### `new Vector2Line(v1:Vector2, v2:Vector2)` or `new Vector2Line(v1:number[], v2:number[])` or `new Vector2Line(v1:Object{x:number,y:number}, v2:Object{x:number,y:number})`
Creates a vector line based on two Vector2 points.
##### `new Vector2Line(opts:Object{gradient:number, yIntercept:number, xIntercept:number?})`
Creates a vector line with an object that containts the gradient, y intercept and/or x intercept. This lets you create a line using the intercept form `y = mx + e`.
##### `new Vector2Line(xInt:number, yInt:number)`
Creates a vector line with the x intercept and the y intercept.

##### `line.getX(y:number) : number`
Returns the value of X corresponding to the value of Y passed in on that line.

##### `line.getY(x:number) : number`
Returns the value of Y corresponding to the value of X passed in on that line.

##### `line.equals(other:Vector2Line) : boolean`
Returns true if the line passed has the same gradient and same y intercept and same x intercept.

##### `line.isHorizontal() : boolean`
Returns true if the line is horizontal i.e. a == 0.

##### `line.isVertical() : boolean`
Returns true if the line is vertical i.e. b == 0.

##### `line.hasPoint(v:Vector2) : boolean`
Returns true if the vector point exists on that line.

##### `line.angle() : number`
Returns the angle of the line relative to the X axis.

##### `line.intersect(other:Vector2Line) : Vector2`
Returns the point that results from this line and another line intersecting. If the lines do not intersect (i.e. they are parallel and the gradient's are the same), it will return `null`.

##### `line.perpendicular(v:Vector2) : Vector2Line`
Returns the line that is perpentdicular to this line and crosses through the passed point.

##### `line.normal() : number`
Returns the normal of the line in respect to the `a` and `b` components.

##### `line.mirror(v:Vector2) : Vector2`
Returns the point passed in but mirrored by this line. The mirrored point will be equal to the passed point if the passed point is **on** the line.

##### `line.asObject() : Object{a,b,c}`
Returns an object that has the components in JSON form.

##### `line.toString() : string`
Returns a string which contains the standard form of the line i.e. `({a}x + {b}y + {c})`.

##### `line.toJSON() : Object{a,b,c}`
Returns the line `asObject()`  so it can be parsed in for JSON.

## Rect2
A class that represents a Rect that is formed by 4 points representing 2D bounds. This can be used for getting the bounds of the polygon, or getting the specific limits of a 2D line from two points.

```js

import {Vector2, Rect2} from "@catsums/vector2";

let rect = new Rect2( new Vector2(1,2) , new Vector2(-4,4) );

let pos = rect.position; // (1,2)
let size = rect.size; // (-4,4)

let absRect = rect.abs();

size = absRect.size; // (4,4)

```

### Static Parameters

##### `Rect2.ORIGIN`
A rect that represents the origin except has a size of (1,1). This is used to for comparisons for translations.

### Static Methods

##### `Rect2.EQUALS(r1:Rect2,r2:Rect2,precision:Rect2=0) : boolean`
Returns true if the rects have positions and sizes that are the same based on passed precision to round off by.
##### `Rect2.COMBINE(rects:Rect2[]) : Rect2`
Combines a list of passed rects to create a rect that contains all of them.
##### `Rect2.from(points:Vector2[]) : Rect2`
Returns a rect that contains all the points passed in. This can also work with an array of arrays that can possible be used to create Vector2 points.


### Instance Parameters

##### `rect.position : Vector2`
This is a Vector2 component that represents the position of the rect. Note that this is not absolute, so the position can have negative parts.
##### `rect.size : Vector2`
This is a Vector2 component that represents the size of the rect. Note that this is not absolute, so the size can have negative parts.

##### `rect.start : Vector2`
Returns the start point of the rect, which is the Top Left corner point of the rect.
##### `rect.end : Vector2`
Returns the end point of the rect, which is the Bottom Right corner point of the rect.
##### `rect.center : Vector2`
Returns the center point of the rect, between all the for corners.
##### `rect.extents : Vector2`
Returns a Vector2 which represents the extents from the center to the edges of the rect.

##### `rect.topLeft : Vector2`
Returns the top left corner point of the rect.
##### `rect.topRight : Vector2`
Returns the top right corner point of the rect.
##### `rect.bottomLeft : Vector2`
Returns the bottom left corner point of the rect.
##### `rect.bottomRight : Vector2`
Returns the bottom right corner point of the rect.

##### `rect.x : number`
The x position of the rect. This can be mutated, which changes the position.
##### `rect.y : number`
The y position of the rect. This can be mutated, which changes the position.
##### `rect.w : number` or `rect.width : number`
The width of the rect. This can be mutated, which changes the size.
##### `rect.h : number` or `rect.height : number`
The height of the rect. This can be mutated, which changes the size.

##### `rect.left : number`
The left component of the rect, which is the x value of the topLeft corner. Mutating this changes the width and x value.
##### `rect.top : number`
The top component of the rect, which is the y value of the topLeft corner. Mutating this changes the height and y value.
##### `rect.right : number`
The right component of the rect, which is the x value of the bottomRight corner. Mutating this changes the width and x value.
##### `rect.bottom : number`
The bottom component of the rect, which is the y value of the bottomRight corner. Mutating this changes the height and y value.


### Instance Methods

##### `new Rect2()`
Creates a rect at the origin (0,0) with size (0,0).
##### `new Rect2(x:number,y:number,w:number,h:number)`
Creates a rect based on the x and y for the position, and the width and height for the size.
##### `new Rect2(position:Vector2, size:Vector2)`
Creates a rect based on two vectors that represent the position and size respectively.
##### `new Rect2(obj:Object{top,left,bottom,right})`
Creates a rect based on values that represent top, left, bottom and right from the values of an object containing these keys
##### `new Rect2(obj:Object{x,y,w,h})`
Creates a rect based on values that represent x,y,w and h from the values of an object containing these keys
##### `new Rect2(rect:Rect2)`
Copy constructor that copies the position and size of the passed rect.

##### `rect.equals(other:Rect2, precision:number=0) : boolean`
Returns true if the rects have equal position and size based on the passed precision.
##### `rect.abs() : Rect2`
Returns the rect but with the size in its absolute :. the size will be positive in width and height.
##### `rect.containsPoint(v:Vector2) : boolean
Returns true if the point exists in the bounds of the rect.
##### `rect.intersectsWith(other:Rect2, threshold:number=0) : boolean`
Returns true if the other rect and this rect for an intersection based on a certain threshold e.g. if the threshold is one, it returns true if the rects at most 1 measure apart.
##### `rect.touches(other:Rect2, threshold:number=0) : boolean` or `rect.isTouching(other:Rect2, threshold:number=0) : boolean`
Returns true if the other rect and this rect are touching based on a certain threshold e.g. if the threshold is one, it returns true if the rects at most 1 measure apart.
##### `rect.getIntersectWith(other:Rect2, threshold:number=0) : Rect2`
Returns a rect that represents the intersect between the two rects. If they are not intersecting, this returns `null`.
##### `rect.combine(other:Rect2) : Rect2`
Returns a combined rect that contains this rect and the other rect.
##### `rect.getCorners() : Vector2[]`
Returns the four corners of the rect in an array of vector points.
##### `rect.clampPoints(points:Vector2[]) : Vector2[]`
Clamps each point in the array based on this rect and returns an array of the points clamped.

##### `rect.asObject() : Object{x,y,w,h}`
Returns a JS object that has the x, y ,width and height values inside of it.
##### `rect.asArray() : number[]`
Returns an array of four values that represent x,y, w and h in that order.
##### `rect.toString() : string`
Returns a string that has the string of the position and the size. This will be in the form `Rect2( {position} {size} )`.
##### `rect.toJSON() : Object{x,y,w,h}`
Returns the object of the Rect2 which is parsable in JSON.


## Transform2
A class that represents a transformation object used to transform points in 2D vector space. This can transform these properties:

- `position`
- `rotation`
- `scale`
- `skew`
-  and it transforms all these based on an `anchor`. However this can still transform optionally without this defined anchor.

```js
import {Vector2, Rect2, Transform2} from "@catsums/vector2";

let rect = new Rect2(4,4,1,1);
let translate = new Vector2(0,0);
let rotate = 0;
let scale = new Vector2(1,1);
let skew = new Vector2(0,0);

let offset = Vector2.ZERO;
let anchor = Vector2.ADD(rect.start, offset);

let t1 = new Transform2(translate,rotate,scale,skew,anchor);
let t2 = Transform2.ORIGIN;

t2.position = new Vector2(1,2);
t2.scale = new Vector2(2,2);
t2.rotation = (Math.PI/2);
//set t1 as child of t2
t2.addChild(t1);
t2.anchor = anchor;

let t3 = new Transform2(Vector2.ONE);
//set t2 as child of t1 and t1 is now grandchild of t3
t3.addChild(t2);

//transform rect using just t1
let rectA = Rect2.getFromPoints([
	t1.applyTransform(rect.start), t1.applyTransform(rect.end)
]);
//transform rect using t1 in global context
let rectB = Rect2.getFromPoints([
	t1.applyComputedTransform(rect.start),
	t1.applyComputedTransform(rect.end)
]);

```

### Static Parameters

##### `Transform2.ORIGIN`
Represents a transform object that will not change any point it tries to transform.

### Static Methods

##### `Transform2.EQUALS(t1:Transform2,t2:Transform2,precision:number=0) : boolean`
Returns true if the transforms have positions, scales, skews, rotations and anchors that are equal.
##### `Transform2.SIMILAR(t1:Transform2,t2:Transform2,precision:number=0) : boolean`
Returns true if the transforms have positions, scales, skews and rotations that are equal. This ignores the anchor.

##### `Transform2.INVERSE(t1:Transform2) : Transform2`
Returns the inverse transform of the transform object. The anchor remains unchanged here.

### Instance Parameters

##### `t.position : Vector2`
Translation component as a vector.
##### `t.rotation : number`
Rotation component as a value of the angle.
##### `t.scale : Vector2`
Scale component as a vector.
##### `t.skew : Vector2`
Skew component as a vector.
##### `t.anchor : Vector2`
The anchor pivot as a vector of the transform

##### `t.childs : Transform2[]`
The children of the transform in relation to the global context i.e. the transforms are a tree and the children can be influenced by the parent transforms to create a result transform.
##### `t.parent : Transform2`
The parent of the transform in relation to the global context. If the parent is null, this transform is the root transform of its own global context.

##### `t.matrix : number[][]`
Returns the matrix that the transform represents. This is a 3 x 3 matrix as a 2D array (3x3 array).

### Instance Methods

##### `new Transform2(position:Vector2, rotation:number, scale:Vector2, skew:Vector2, anchor:Vector2)`
Creates a transform based on the translation position, rotation angle, scale vector, skew vector and the anchor position.
##### `new Transform2()`
Creates the origin transform, which by default returns the point unchanged if it tries to create something.
##### `new Transform2(transform:Transform2)`
Copy constructor that copies the translation position, rotation, scale, skew, anchor.


##### `t.inverted() : Transform2`
Returns the inverted transform of this transform

##### `t.setParent(p:Transform) : void`
Set the parent of this transform. It is better to use `p.addChild(t)` with the parent since it runs this function.

##### `t.addChild(x:Transform) : void`
Set the parent of the child transform and adds it to the children of this transform.

##### `t.removeChild(p:Transform) : Transform2`
Removes the child from this transform's children and sets the parent of the child to `null`.

##### `t.getGlobalTransform() : Transform2`
Gets the transform where it is relative based on its ancestor transforms.

##### `t.applyTransform(v:Vector2,anchor:Vector2=this.anchor,order:string[]=['S','K','R','T']) : Vector2`
Transforms the point based on this transform and an optional anchor, along with a certain order of for the transform to apply transforms in that order or even repeat them. This returns the transformed point. By default, this uses the anchor of the transform and applies in the order of Scale, Skew, Rotate and Translate.

##### `t.applyGlobalTransform(v:Vector2,anchor:Vector2=this.anchor,order:string[]=['S','K','R','T']) : Vector2`
Transforms the point based on this transform and an optional anchor, order and is relative to the parents of its transform. This is the same as `t.getGlobalTransform().applyTransform(v,anchor,order)`.

##### `t.applyTranslate(v:Vector2,anchor:Vector2=this.anchor) : Vector2`
Translate the point based on an anchor and returns the translated point.

##### `t.applyRotate(v:Vector2,anchor:Vector2=this.anchor) : Vector2`
Rotates the point based on an anchor and returns the rotated point.

##### `t.applySkew(v:Vector2,anchor:Vector2=this.anchor) : Vector2`
Skews the point based on an anchor and returns the skewed point.

##### `t.applyScale(v:Vector2,anchor:Vector2=this.anchor) : Vector2`
Scales the point based on an anchor and returns the scale point.

##### `t.applyInverseTransform(v:Vector2,anchor:Vector2=this.anchor, order=['T','R','K','S']) : Vector2`
Transforms the point based on this objects inverse transform, an optional anchor and order. By default, this uses the same anchor and the order of the transformations are Translate, Rotate, Skew and Scale.

##### `t.asObject() : Object{position,rotation,scale,skew,anchor}`
Returns a JS Object that has the position, rotation, scale, skew and anchor of the transform.

##### `t.toString() : string`
Returns a string that is in the form of `( Translate: {position} Rotate: ({rotation}) Scale: {scale} Skew: {skew} Anchor: {anchor} )`.

##### `t.toJSON() : Object{position,rotation,scale,skew,anchor}`
Returns an object that can be parsed into JSON.


