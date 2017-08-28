import {OclParser} from "./parser/oclParser";
import {Utils} from "./utils";

/**
 * The OclEngine class is the main entry point to the OCL.js library.
 *
 * This class allows to add new OCL expressions as well as evaluating given objects agains the saved OCL expressions.
 */
export class OclEngine {
    /**
     * Static create method.
     *
     * @returns {OclEngine} a fresh new instance of the OclEngine
     */
    static create() {
        return new OclEngine();
    }

    constructor() {
        this.oclExpressionsPerType = {};
    }

    /**
     * Register a new OCL expression.
     *
     * Each OCL expression is added to a map of OCL expressions where the context is the key:
     * <pre>
     *     context Person inv: ...
     * </pre>
     *
     * Will be sorted into the map using "Person" as key. This allows faster lookup of OCL rules that should be applied
     * when running OclEngine.evaluate.
     *
     * @param {String} oclExpression The OCL expression as string. It will be parsed and added to the list of existing OCL expressions.
     * @returns {OclEngine} the current OclEngine object for chaining
     */
    addOclExpression(oclExpression) {
        const parsedExpression = OclParser.parse(oclExpression);
        this._addOclExpressionForType(parsedExpression.targetType, parsedExpression);
        return this;
    }

    _addOclExpressionForType(type, oclExpression) {
        const oclExpressions = this.getOclExpressionsForType(type);
        oclExpressions.push(oclExpression);
        this.oclExpressionsPerType[type] = oclExpressions;
    }

    /**
     * For a fiven type returns all registered OCL expressions.
     *
     * @param {String} type The type to lookup OCL expressions for.
     * @returns {Array} an array of {Expression}s.s
     */
    getOclExpressionsForType(type) {
        return this.oclExpressionsPerType[type] || [];
    }

    /**
     * This function actually evaluates the given object against the registered OCL expressions.
     *
     * @param {Object} obj The object which is going to be evaluated against registered OCL expressions.
     * @returns {OclResult} a result object, which contains the actual result and other info @see OclResult
     */
    evaluate(obj) {
        const type = Utils.getClassName(obj);
        const oclExpressionsForType = this.getOclExpressionsForType(type);
        oclExpressionsForType.forEach(e => e.evaluate(obj));

        const namesOfFailedInvs = oclExpressionsForType
            .filter(e => e.evaluationResult === false)
            .map(e => e.invs)
            .reduce((p, c) => p.concat(c), [])
            .filter(i => i.evaluationResult === false)
            .map(i => i.name || 'anonymous');

        const oclResult = new OclResult();
        oclResult.setResult(namesOfFailedInvs.length === 0);
        oclResult.setNamesOfFailedInvs(namesOfFailedInvs);
        return oclResult;
    }
}

/**
 * This class is a data class that is returned by OclEngine.evaluate method.
 *
 * It contains useful information about the evaluation result like the actual result (true / false) and in addition a list
 * of all names of invariants that have failed.
 */
class OclResult {
    setResult(result) {
        this.result = result;
    }

    getResult() {
        return this.result;
    }

    setNamesOfFailedInvs(names) {
        this.namesOfFailedInvs = names;
    }

    getNamesOfFailedInvs() {
        return this.namesOfFailedInvs;
    }
}