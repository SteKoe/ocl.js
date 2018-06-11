import { OclParser } from './parser/OclParser';
import { Utils } from './Utils';
import { OclExecutionContext } from './OclExecutionContext';
import { PackageDeclaration } from './expressions';
import { OclResult } from './OclResult';

/**
 * The OclEngine class is the main entry point to the OCL.js library.
 *
 * This class allows to add new OCL expressions as well as evaluating given objects agains the saved OCL expressions.
 */
export class OclEngine {

    static Utils = Utils;

    private packageDeclarations: Array<PackageDeclaration> = [];
    private typeDeterminerFn: Function;
    private registeredTypes: object = OclParser.registeredTypes;

    /**
     * Static create method.
     *
     * @returns a fresh new instance of the OclEngine
     */
    static create(): OclEngine {
        return new OclEngine();
    }

    /**
     * Set a TypeDeterminer function that receives an object and returns the type of the object.
     */
    setTypeDeterminer(fn: Function): void {
        if (typeof fn === 'function') {
            OclEngine.Utils.typeDeterminerFn = fn;
        }
    }

    registerTypes(types): void {
        this.registeredTypes = {...this.registeredTypes, ...types};
        OclParser.registeredTypes = this.registeredTypes;
    }

    /**
     * Register a list of OCL expressions.
     *
     * @param oclExpressions The OCL expressions as string list. It will be parsed and added to the list of existing OCL expressions.
     * @returns the current OclEngine object for chaining
     * @throws ParserError
     */
    addOclExpressions(oclExpressions): OclEngine {
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
     * @param oclExpression The OCL expression as string. It will be parsed and added to the list of existing OCL expressions.
     * @returns the current OclEngine object for chaining
     * @throws ParserError
     */
    addOclExpression(oclExpression, labels: Array<string> = []): OclEngine {
        try {
            const parsedExpression = OclParser.parse(oclExpression, labels, this.registeredTypes);
            this.packageDeclarations.push(parsedExpression);
        } catch (e) {
            e.oclExpression = oclExpression;
            throw e;
        }

        return this;
    }

    /**
     * This function actually evaluates the given object against the registered OCL expressions.
     *
     * @param obj The object which is going to be evaluated against registered OCL expressions.
     * @param labels An array of labels that address expressions that should be evaluated.
     * @returns a result object, which contains the actual result and other info @see OclResult
     */
    evaluate(obj: any, labels: Array<string> = []): OclResult {
        const visitor = new OclExecutionContext(obj, Array.isArray(labels) ? labels : [labels]);
        visitor.registerTypes(this.registeredTypes);

        this.packageDeclarations.forEach(e => e.evaluate(visitor));

        return new OclResult(visitor.getFailedInvariants()
            .map(inv => inv.getName()), visitor.getEvaluatedContexts());
    }

    _inferType(obj: any): string {
        return Utils.getClassName(obj);
    }
}
