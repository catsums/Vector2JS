import { Vector2 } from './Vector2';
export declare class Vector2Line {
    a: number;
    b: number;
    c: number;
    static get Y_AXIS(): Vector2Line;
    static get X_AXIS(): Vector2Line;
    static get ONE(): Vector2Line;
    static get NEG_ONE(): Vector2Line;
    get gradient(): number;
    get m(): number;
    get xIntercept(): number;
    get f(): number;
    get yIntercept(): number;
    get e(): number;
    constructor(x: IVector2, y: IVector2);
    constructor(a: number, b: number, c: number);
    constructor(x: number, y: number);
    constructor({ a, b, c }: {
        a: number;
        b: number;
        c: number;
    });
    constructor({ m, c }: {
        m: number;
        c: number;
    });
    constructor({ gradient, yIntercept, xIntercept }: {
        gradient: number;
        yIntercept: number;
        xIntercept?: number;
    });
    constructor({ xIntercept, yIntercept }: {
        xIntercept: number;
        yIntercept: number;
    });
    constructor({ x, y }: {
        x: number;
        y: number;
    });
    constructor({ f, e }: {
        f: number;
        e: number;
    });
    constructor(line: Vector2Line);
    getX(y: number): any;
    getY(x: number): any;
    equals(other: Vector2Line): boolean;
    isHorizontal(): boolean;
    isVertical(): boolean;
    hasPoint(point: IVector2): boolean;
    angle(): number;
    static INTERSECT(l1: Vector2Line, l2: Vector2Line): Vector2;
    static INTERSECTS(arr: Vector2Line[]): Vector2[];
    intersect(other: Vector2Line): Vector2;
    perpendicular(point: IVector2): Vector2Line;
    normal(): Vector2;
    mirror(point: IVector2): Vector2;
    asObject(): {
        a: number;
        b: number;
        c: number;
    };
    toString(): string;
    toJSON(): {
        a: number;
        b: number;
        c: number;
    };
}
