import { OclParser } from './parser/OclParser';
import { Utils } from './Utils';
import { Expression } from './expressions';
import { OclResult } from './OclResult';
/**
 * The OclEngine class is the main entry point to the OCL.js library.
 *
 * This class allows to add new OCL expressions as well as evaluating given objects agains the saved OCL expressions.
 */
export declare class OclEngine {
    static version: any;
    static Utils: typeof Utils;
    static Parser: typeof OclParser;
    private packageDeclarations;
    private typeDeterminerFn;
    private registeredTypes;
    private registeredEnums;
    /**
     * Static create method.
     *
     * @returns a fresh new instance of the OclEngine
     */
    static create(): OclEngine;
    /**
     * Set a TypeDeterminer function that receives an object and returns the type of the object.
     *
     * @param fn A callback function that is used to determine the type if the object that is passed into the callback function
     */
    setTypeDeterminer(fn: Function): void;
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
    registerTypes(types: any): void;
    registerEnum(name: string, values: object): void;
    /**
     * Register a list of OCL expressions.
     *
     * @param oclExpressions The OCL expressions as string list. It will be parsed and added to the list of existing OCL expressions.
     * @returns the current OclEngine object for chaining
     * @throws ParserError
     */
    addOclExpressions(oclExpressions: Array<string>, labels?: Array<string>): OclEngine;
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
    addOclExpression(oclExpression: any, labels?: Array<string>): OclEngine;
    /**
     * Removes the given oclExpression if it has been registered to the OclEngine instance.
     *
     * @param oclExpression
     */
    removeOclExpression(oclExpression: string): OclEngine;
    /**
     * Clears all registered OclExpressions from the current OclEngine instance.
     */
    clearAllOclExpressions(): OclEngine;
    /**
     * This function actually evaluates the given object against the registered OCL expressions.
     *
     * @param obj The object which is going to be evaluated against registered OCL expressions.
     * @param labels An array of labels that address expressions that should be evaluated.
     * @returns a result object, which contains the actual result and other info @see OclResult
     */
    evaluate(obj: any, labels?: Array<string>): OclResult;
    _inferType(obj: any): string;
    /**
     * Specify a OCL query that can be used to extract information from an object.
     *
     * @example oclEngine.createQuery('self.children.name') // Returns an array of the children's names
     * @param oclExpression An OCL expression that is used to create a query of
     * @returns Expression The AST of the parsed oclExpresion
     */
    createQuery(oclExpression: string): Expression;
    /**
     * Execute a given OCL query on a given object.
     *
     * @param obj The object to query
     * @param oclExpression The query to run on the given object
     * @returns the result of the provided query.
     */
    evaluateQuery(obj: object, oclExpression: Expression): any;
}
