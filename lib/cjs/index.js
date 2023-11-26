var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  Rect2: () => import_Rect2.Rect2,
  Transform2: () => import_Transform2.Transform2,
  Vector2: () => import_Vector2.Vector2,
  Vector2Line: () => import_Vector2Line.Vector2Line,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_Vector2 = require("./Vector2");
var import_Vector2Line = require("./Vector2Line");
var import_Rect2 = require("./Rect2");
var import_Transform2 = require("./Transform2");
var import_Vector22 = require("./Vector2");
var import_Vector2Line2 = require("./Vector2Line");
var import_Rect22 = require("./Rect2");
var import_Transform22 = require("./Transform2");
var src_default = {
  Vector2: import_Vector22.Vector2,
  Vector2Line: import_Vector2Line2.Vector2Line,
  Rect2: import_Rect22.Rect2,
  Transform2: import_Transform22.Transform2
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Rect2,
  Transform2,
  Vector2,
  Vector2Line
});
