"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transform2 = exports.Rect2 = exports.Vector2Line = exports.Vector2 = void 0;
var Vector2_1 = require("./Vector2");
Object.defineProperty(exports, "Vector2", { enumerable: true, get: function () { return Vector2_1.Vector2; } });
var Vector2Line_1 = require("./Vector2Line");
Object.defineProperty(exports, "Vector2Line", { enumerable: true, get: function () { return Vector2Line_1.Vector2Line; } });
var Rect2_1 = require("./Rect2");
Object.defineProperty(exports, "Rect2", { enumerable: true, get: function () { return Rect2_1.Rect2; } });
var Transform2_1 = require("./Transform2");
Object.defineProperty(exports, "Transform2", { enumerable: true, get: function () { return Transform2_1.Transform2; } });
const Vector2_2 = require("./Vector2");
const Vector2Line_2 = require("./Vector2Line");
const Rect2_2 = require("./Rect2");
const Transform2_2 = require("./Transform2");
exports.default = {
    Vector2: Vector2_2.Vector2,
    Vector2Line: Vector2Line_2.Vector2Line,
    Rect2: Rect2_2.Rect2,
    Transform2: Transform2_2.Transform2
};
