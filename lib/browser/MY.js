var Vector2JS = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);
  var MY_exports = {};
  __export(MY_exports, {
    isInfinity: () => isInfinity,
    mod: () => mod,
    roundTo: () => roundTo,
    safeDivide: () => safeDivide
  });
  function mod(n, m) {
    return (n % m + m) % m;
  }
  __name(mod, "mod");
  function safeDivide(a, b, useNaN = false) {
    let INF = Infinity;
    let res;
    if (a == 0 && b == 0) {
      if (useNaN)
        res = NaN;
      else
        res = 0;
    } else if (a == 0 && isInfinity(b)) {
      res = 0 * 1;
    } else if (isInfinity(a) && b == 0) {
      res = a * 1;
    } else if (isInfinity(a) && isInfinity(b)) {
      if (useNaN)
        res = NaN;
      else if (a == b)
        res = 1;
      else
        res = -1;
    } else if (b == 0) {
      if (useNaN)
        res = NaN;
      res = INF * a;
    } else if (isInfinity(b)) {
      if (useNaN)
        res = NaN;
      res = 0 * a;
    } else {
      res = a / b;
    }
    return res;
  }
  __name(safeDivide, "safeDivide");
  function isInfinity(x) {
    return x === -Infinity || x === Infinity;
  }
  __name(isInfinity, "isInfinity");
  function roundTo(num, step) {
    if (step == 0)
      return num;
    if (isInfinity(step))
      return Infinity;
    let invStep = Math.pow(step, -1);
    let invMiniStep = Math.pow(step / 10, -1);
    let initNum = Math.round(num * invMiniStep) / invMiniStep;
    let init = Math.round(initNum * invStep) / invStep;
    let res = Math.round((init + Number.EPSILON) * invStep) / invStep;
    return res;
  }
  __name(roundTo, "roundTo");
  return __toCommonJS(MY_exports);
})();
