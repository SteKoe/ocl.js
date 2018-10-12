import * as pkg from '../../package.json';
import { OclParser } from './parser/OclParser';
import { Utils } from './Utils';
import { OclExecutionContext } from './OclExecutionContext';
import { Expression, PackageDeclaration } from './expressions';
import { OclResult } from './OclResult';

/**
 * The OclEngine class is the main entry point to the OCL.js library.
 *
 * This class allows to add new OCL expressions as well as evaluating given objects agains the saved OCL expressions.
 */
export class OclEngine {

    static version = (pkg as any).version;

    static Utils = Utils;
    static Parser = OclParser;

    private packageDeclarations: Array<PackageDeclaration> = [];
    private typeDeterminerFn: Function;
    private registeredTypes: object = OclParser.registeredTypes;
    private registeredEnums: object = OclParser.registeredEnums;

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
     *
     * @param fn A callback function that is used to determine the type if the object that is passed into the callback function
     */
    setTypeDeterminer(fn: Function): void {
        if (typeof fn === 'function') {
            OclEngine.Utils.typeDeterminerFn = fn;
        }
    }

    /**
     * Register additional object types in the engine which than can be used for instanceof checking.
     *
     * The following build-in JavaScript types are already registered:
     *  - Array
     *  - Boolean
     *  - Function
     *  - Number
     *  - Object
     *  - String
     *
     * @param types A list of types to register
     */
    registerTypes(types): void {
        this.registeredTypes = {...this.registeredTypes, ...types};
        OclParser.registeredTypes = this.registeredTypes;
    }

    registerEnum(name: string, values: object): void {
        this.registeredEnums = {...this.registeredEnums, [name]: values};
        OclParser.registeredEnums = this.registeredEnums;
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
            const parsedExpression = OclEngine.Parser.parse(oclExpression, labels, this.registeredTypes);
            this.packageDeclarations.push(parsedExpression);
        } catch (e) {
            e.oclExpression = oclExpression;
            throw e;
        }

        return this;
    }

    /**
     * Removes the given oclExpression if it has been registered to the OclEngine instance.
     *
     * @param oclExpression
     */
    removeOclExpression(oclExpression: string): OclEngine {
        const parsedExpression = OclEngine.Parser.parse(oclExpression, [], this.registeredTypes);
        this.packageDeclarations = this.packageDeclarations.filter(packageDeclaration => {
            return Utils.hashCode(packageDeclaration.getRawOclExpression()) !== Utils.hashCode(oclExpression);
        });

        return this;
    }

    /**
     * Clears all registered OclExpressions from the current OclEngine instance.
     */
    clearAllOclExpressions(): OclEngine {
        this.packageDeclarations.length = 0;

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
        visitor.setRegisteredEnumerations(this.registeredEnums);

        this.packageDeclarations.forEach(e => e.evaluate(visitor));

        return new OclResult(visitor.getFailedInvariants()
            .map(inv => inv.getName()), visitor.getEvaluatedContexts());
    }

    _inferType(obj: any): string {
        return Utils.getClassName(obj);
    }

    /**
     * Specify a OCL query that can be used to extract information from an object.
     *
     * @example oclEngine.createQuery('self.children.name') // Returns an array of the children's names
     * @param oclExpression An OCL expression that is used to create a query of
     * @returns Expression The AST of the parsed oclExpresion
     */
    createQuery(oclExpression: string): Expression {
        return OclEngine.Parser.parseQuery(oclExpression, this.registeredTypes);
    }

    /**
     * Execute a given OCL query on a given object.
     *
     * @param obj The object to query
     * @param oclExpression The query to run on the given object
     * @returns the result of the provided query.
     */
    evaluateQuery(obj: object, oclExpression: Expression): any {
        const visitor = new OclExecutionContext(obj);
        visitor.registerTypes(this.registeredTypes);

        return oclExpression.evaluate(visitor);
    }
}
