import { Vector2 } from "./Vector2";
declare global {
    type IRect = IRectPS | IRectXYWH | IRectTLBR;
    interface IRectPS {
        position: IVector2;
        size: IVector2;
    }
    interface IRectXYWH {
        x: number;
        y: number;
        w: number;
        h: number;
    }
    interface IRectTLBR {
        top: number;
        left: number;
        right: number;
        bottom: number;
    }
    interface IRectTLBRMini {
        t: number;
        l: number;
        r: number;
        b: number;
    }
}
export declare class Rect2 implements IRectPS, IRectTLBR, IRectXYWH {
    position: any;
    size: any;
    static get ORIGIN(): Rect2;
    static EQUALS(r1: IRect, r2: IRect, p?: number): boolean;
    static COMBINE(rects: IRect[]): Rect2;
    static from(pts: IVector2[]): Rect2;
    static getFromPoints(points: IVector2[]): Rect2;
    get start(): Vector2;
    get end(): Vector2;
    get center(): Vector2;
    get extents(): Vector2;
    get topLeft(): Vector2;
    get topRight(): Vector2;
    get bottomLeft(): Vector2;
    get bottomRight(): Vector2;
    get x(): number;
    set x(n: number);
    get y(): number;
    set y(n: number);
    get w(): number;
    set w(n: number);
    get h(): number;
    set h(n: number);
    get width(): number;
    set width(n: number);
    get height(): number;
    set height(n: number);
    get left(): number;
    set left(n: number);
    get top(): number;
    set top(n: number);
    get right(): number;
    set right(n: number);
    get bottom(): number;
    set bottom(n: number);
    constructor(rect: IRect);
    constructor(x: number, y: number, w: number, h: number);
    constructor(p: IVector2, s: IVector2);
    constructor();
    equals(other: IRect, p?: number): boolean;
    abs(): Rect2;
    containsPoint(v: IVector2): boolean;
    getIntersectWith(rect: IRect, threshold?: number): Rect2;
    intersectsWith(rect: IRect, threshold?: number): boolean;
    isTouching(other: IRect, threshold?: number): boolean;
    touches(rect: IRect, threshold?: number): boolean;
    combine(other: IRect): Rect2;
    getCorners(): Vector2[];
    clampPoints(pts: IVector2[]): IVector2[];
    asObject(): IRect;
    asArray(): number[];
    toString(): string;
    toJSON(): {
        position: any;
        size: any;
    };
}
