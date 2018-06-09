import {OclParser} from "./parser/OclParser";
import {Utils} from "./Utils";
import {OclVisitorImpl} from './OclVisitorImpl'

/**
 * The OclEngine class is the main entry point to the OCL.js library.
 *
 * This class allows to add new OCL expressions as well as evaluating given objects agains the saved OCL expressions.
 */
export class OclEngine {

    static DEBUG = false;
    static Utils = Utils;

    private oclExpressions: Array<any> = [];
    private typeDeterminerFn: Function;
    private registeredTypes: object;

    constructor() {
        this.registeredTypes = OclParser.registeredTypes;
    }

    /**
     * Static create method.
     *
     * @returns {OclEngine} a fresh new instance of the OclEngine
     */
    static create() {
        return new OclEngine();
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

    registerTypes(types) {
        this.registeredTypes = Object.assign({}, this.registeredTypes, types);
        OclParser.registeredTypes = this.registeredTypes;
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
     * @param {Array<String>} labels
     * @returns {OclEngine} the current OclEngine object for chaining
     * @throws ParserError
     */
    addOclExpression(oclExpression, labels: string[] = []) {
        try {
            OclParser.DEBUG = OclEngine.DEBUG;
            const parsedExpression = OclParser.parse(oclExpression, labels);
            this.oclExpressions.push(parsedExpression);
        } catch (e) {
            e.oclExpression = oclExpression;
            throw e;
        }

        return this;
    }

    /**
     * This function actually evaluates the given object against the registered OCL expressions.
     *
     * @param {Object} obj The object which is going to be evaluated against registered OCL expressions.
     * @param {Array<String>} labels An array of labels that address expressions that should be evaluated.
     * @returns {OclResult} a result object, which contains the actual result and other info @see OclResult
     */
    evaluate(obj, labels = []) {
        let visitor = new OclVisitorImpl(obj);
        visitor.DEBUG = OclEngine.DEBUG;
        visitor.targetType = this._inferType(obj);
        visitor._targetType = obj;
        visitor.labelsToExecute = Array.isArray(labels) ? labels : [labels];
        visitor.registerTypes(this.registeredTypes);

        this.oclExpressions.forEach(e => e.visit(visitor));

        return new OclResult(visitor.failedInvariants.map(inv => inv.name), visitor.evaluatedContexts);
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

/**
 * This class is a data class that is returned by OclEngine.evaluate method.
 *
 * It contains useful information about the evaluation result like the actual result (true / false) and in addition a list
 * of all names of invariants that have failed.
 */
class OclResult {
    private evaluatedContexts: any;
    private result: any;
    private namesOfFailedInvs: Array<any>;

    constructor(namesOfFailedInvs, evaluatedContexts) {
        this.setResult(namesOfFailedInvs.length === 0);
        this.setNamesOfFailedInvs(namesOfFailedInvs);
        this.evaluatedContexts = evaluatedContexts;
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

    getEvaluatedContextsCount() {
        return this.evaluatedContexts;
    }
}