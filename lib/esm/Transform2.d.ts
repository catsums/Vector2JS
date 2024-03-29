import { Vector2 } from "./Vector2";
export declare class Transform2 {
    _position: Vector2;
    _rotation: number;
    _scale: Vector2;
    _skew: Vector2;
    _anchor: Vector2;
    _parent: Transform2;
    _childs: Transform2[];
    static get ORIGIN(): Transform2;
    static EQUALS(t1: Transform2, t2: Transform2, p?: number): boolean;
    static SIMILAR(t1: Transform2, t2: Transform2, p?: number): boolean;
    static INVERSE(t: Transform2): Transform2;
    get parent(): Transform2;
    set parent(x: Transform2);
    get position(): Vector2;
    set position(x: Vector2);
    get rotation(): number;
    set rotation(x: number);
    get scale(): Vector2;
    set scale(x: Vector2);
    get skew(): Vector2;
    set skew(x: Vector2);
    get anchor(): Vector2;
    set anchor(x: Vector2);
    get children(): Transform2[];
    get childs(): Transform2[];
    get a(): number;
    get b(): number;
    get c(): number;
    get d(): number;
    get tx(): number;
    get ty(): number;
    get matrix(): number[][];
    constructor(position?: IVector2, rotation?: number, scale?: IVector2, skew?: IVector2, anchor?: IVector2);
    constructor(t: Transform2);
    constructor();
    inverted(): Transform2;
    setParent(x: Transform2): void;
    addChild(x: Transform2): void;
    removeChild(x: Transform2 | number): Transform2;
    getGlobalTransform(): Transform2;
    applyGlobalTransform(pt: IVector2, anchor?: IVector2, order?: string[]): Vector2;
    applyTranslate(pt: IVector2, anchor?: IVector2): Vector2;
    applyRotate(pt: IVector2, anchor?: IVector2): Vector2;
    applySkew(pt: IVector2, anchor?: IVector2): Vector2;
    applyScale(pt: IVector2, anchor?: IVector2): Vector2;
    applyInverseTransform(pt: IVector2, anchor?: IVector2, order?: string[]): Vector2;
    applyTransform(pt: IVector2, anchor?: IVector2, order?: string[]): Vector2;
    asMatrix(): number[][];
    asArray(): number[];
    asObject(): Object;
    toString(): string;
    toJSON(): Object;
}
