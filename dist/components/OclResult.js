"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OclResult = void 0;
/**
 * This class is a data class that is returned by OclEngine.evaluate method.
 *
 * It contains useful information about the evaluation result like the actual result (true / false) and in addition a list
 * of all names of invariants that have failed.
 */
var OclResult = /** @class */ (function () {
    function OclResult(namesOfFailedInvs, evaluatedContexts) {
        this.namesOfFailedInvs = namesOfFailedInvs;
        this.evaluatedContexts = evaluatedContexts;
        this.result = namesOfFailedInvs.length === 0;
    }
    /**
     * @returns true if the OCL constraint did pass, false otherwise.
     */
    OclResult.prototype.getResult = function () {
        return this.result;
    };
    /**
     * @returns An array of names of all failed invariants.
     */
    OclResult.prototype.getNamesOfFailedInvs = function () {
        return this.namesOfFailedInvs;
    };
    /**
     * @returns An array of contexts that have been executed during evaluation.
     */
    OclResult.prototype.getEvaluatedContexts = function () {
        return this.evaluatedContexts;
    };
    return OclResult;
}());
exports.OclResult = OclResult;
//# sourceMappingURL=OclResult.js.map