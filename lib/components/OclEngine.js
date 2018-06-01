import { OclParser } from "./parser/OclParser";
import { Utils } from "./Utils";

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
        this.typeDeterminerFn = undefined;
    }

    /**
     * Set a TypeDeterminer function that receives an object and returns the type of the object.
     *
     * @param {function} fn
     */
    setTypeDeterminer(fn) {
        if (typeof fn === 'function') {
            OclEngine.Utils.typeDeterminerFn = fn;
        }
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
     * @throws ParserError
     */
    addOclExpression(oclExpression) {
        try {
            const parsedExpression = OclParser.parse(oclExpression);
            this._addOclExpressionForType(parsedExpression.targetType, parsedExpression);
        } catch (e) {
            e.oclExpression = oclExpression;
            throw e;
        }

        return this;
    }

    /**
     * Register a list of OCL expressions.
     *
     * @param {Array<String>} oclExpressions The OCL expressions as string list. It will be parsed and added to the list of existing OCL expressions.
     * @returns {OclEngine} the current OclEngine object for chaining
     * @throws ParserError
     */
    addOclExpressions(oclExpressions) {
        oclExpressions.forEach(this.addOclExpression.bind(this));
        return this;
    }

    _addOclExpressionForType(type, oclExpression) {
        const oclExpressions = this.getOclExpressionsForType(type);
        oclExpressions.push(oclExpression);
        this.oclExpressionsPerType[type] = oclExpressions;
    }

    /**
     * For a given type returns all registered OCL expressions.
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
        const type = this._inferType(obj);
        const oclExpressionsForType = this.getOclExpressionsForType(type);

        oclExpressionsForType.forEach(e => e.evaluate(obj));

        const namesOfFailedInvs = oclExpressionsForType
            .filter(e => e.evaluationResult === false)
            .map(e => e.invs)
            .reduce((p, c) => p.concat(c), [])
            .filter(i => i.evaluationResult === false)
            .map(i => i.name || 'anonymous');

        return new OclResult(namesOfFailedInvs);
    }

    /**
     * Tries to infer a type for the given object.
     *
     * @param obj
     * @return {String} type of the object
     * @private
     */
    _inferType(obj) {
        return Utils.getClassName(obj)
    }
}

OclEngine.Utils = Utils;

/**
 * This class is a data class that is returned by OclEngine.evaluate method.
 *
 * It contains useful information about the evaluation result like the actual result (true / false) and in addition a list
 * of all names of invariants that have failed.
 */
class OclResult {
    constructor(namesOfFailedInvs) {
        this.setResult(namesOfFailedInvs.length === 0);
        this.setNamesOfFailedInvs(namesOfFailedInvs);
    }

    setResult(result) {
        this.result = result;
    }

    getResult() {
        return this.result;
    }

    setNamesOfFailedInvs(names) {
        this.namesOfFailedInvs = Array.isArray(names) ? names : [];
    }

    getNamesOfFailedInvs() {
        return this.namesOfFailedInvs;
    }
}