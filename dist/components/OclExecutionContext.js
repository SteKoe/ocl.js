"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OclExecutionContext = void 0;
var Utils_1 = require("./Utils");
var OclParser_1 = require("./parser/OclParser");
var a = {
    s: /** @class */ (function () {
        function P() {
        }
        return P;
    }())
};
var OclExecutionContext = /** @class */ (function () {
    function OclExecutionContext(obj, labelsToExecute) {
        if (labelsToExecute === void 0) { labelsToExecute = []; }
        this.obj = obj;
        this.labelsToExecute = labelsToExecute;
        this.evaluationResult = undefined;
        this.failedInvariants = [];
        this.evaluatedContexts = [];
        this.targetTypeName = Utils_1.Utils.getClassName(obj);
        this.registeredTypes = OclParser_1.OclParser.registeredTypes;
    }
    OclExecutionContext.prototype.addFailedInvariant = function (inv) {
        this.failedInvariants.push(inv);
    };
    OclExecutionContext.prototype.setObjectToEvaluate = function (obj) {
        this.obj = obj;
        return this;
    };
    OclExecutionContext.prototype.getObjectToEvaluate = function () {
        return this.obj;
    };
    OclExecutionContext.prototype.getRegisteredType = function (targetTypeName) {
        return this.registeredTypes[targetTypeName];
    };
    OclExecutionContext.prototype.setTargetTypeName = function (name) {
        this.targetTypeName = name;
    };
    OclExecutionContext.prototype.getTargetTypeName = function () {
        return this.targetTypeName;
    };
    OclExecutionContext.prototype.registerTypes = function (types) {
        this.registeredTypes = __assign(__assign({}, this.registeredTypes), types);
    };
    OclExecutionContext.prototype.setRegisteredEnumerations = function (enumerations) {
        this.registeredEnumerations = __assign(__assign({}, this.registeredEnumerations), enumerations);
    };
    OclExecutionContext.prototype.getRegisteredEnumeration = function (key) {
        return this.registeredEnumerations[key] || [];
    };
    OclExecutionContext.prototype.getFailedInvariants = function () {
        return this.failedInvariants;
    };
    OclExecutionContext.prototype.getLabelsToExecute = function () {
        return this.labelsToExecute;
    };
    OclExecutionContext.prototype.getEvaluationResult = function () {
        return this.evaluationResult;
    };
    OclExecutionContext.prototype.setEvaluationResult = function (evaluationResult) {
        this.evaluationResult = evaluationResult;
    };
    OclExecutionContext.prototype.addEvaluatedContext = function (context) {
        this.evaluatedContexts.push(context);
    };
    OclExecutionContext.prototype.getEvaluatedContexts = function () {
        return this.evaluatedContexts;
    };
    return OclExecutionContext;
}());
exports.OclExecutionContext = OclExecutionContext;
//# sourceMappingURL=OclExecutionContext.js.map