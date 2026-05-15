import * as pkg from '../../package.json';

import { OclParser } from './parser/OclParser';
import { Utils } from './Utils';
import { OclExecutionContext } from './OclExecutionContext';
import { Expression, PackageDeclaration } from './expressions';
import { OclResult } from './OclResult';
import { IMetamodelProvider } from './IMetamodelProvider';
import { TypeRegistry, EnumRegistry } from './types';

/**
 * Default built-in types that are always available for instanceof checking.
 */
const DEFAULT_TYPES: TypeRegistry = {
    Array,
    Boolean,
    Function,
    Number,
    Object,
    String
};

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
    private registeredTypes: TypeRegistry = { ...DEFAULT_TYPES };
    private registeredEnums: EnumRegistry = {};
    private metamodelProvider: IMetamodelProvider | undefined;
    private typeDeterminerFn: ((obj: unknown) => string) | undefined;

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
     * This is a convenience method for simple type name resolution. For more advanced
     * metamodel integration (including type hierarchy support), use {@link setMetamodelProvider}.
     *
     * @param fn A callback function that is used to determine the type of the object that is passed into the callback function
     * @returns the current OclEngine object for chaining
     */
    setTypeDeterminer(fn: (obj: unknown) => string): OclEngine {
        if (typeof fn === 'function') {
            this.typeDeterminerFn = fn;
        }
        return this;
    }

    /**
     * Set a metamodel provider for advanced type resolution and hierarchy support.
     *
     * Use this method to integrate ocl.js with runtime metamodels where type hierarchies
     * are not based on JavaScript prototype chains. The provider enables proper support
     * for `oclIsKindOf`, `oclIsTypeOf`, and context type matching against external
     * metamodel definitions.
     *
     * @param provider An implementation of IMetamodelProvider that handles type resolution
     * @returns the current OclEngine object for chaining
     *
     * @example
     * ```typescript
     * const provider: IMetamodelProvider = {
     *   getTypeName(obj) { return obj._type; },
     *   isKindOf(obj, typeName) { return metamodel.isSubtypeOf(this.getTypeName(obj), typeName); },
     *   isTypeOf(obj, typeName) { return this.getTypeName(obj) === typeName; }
     * };
     *
     * engine.setMetamodelProvider(provider)
     *   .addOclExpression('context Entity inv: self.oclIsKindOf(NamedElement)');
     * ```
     */
    setMetamodelProvider(provider: IMetamodelProvider): OclEngine {
        this.metamodelProvider = provider;
        return this;
    }

    /**
     * Get the currently configured metamodel provider, if any.
     *
     * @returns The current IMetamodelProvider or undefined if not set
     */
    getMetamodelProvider(): IMetamodelProvider | undefined {
        return this.metamodelProvider;
    }

    /**
     * Register additional object types in the engine which can be used for instanceof checking.
     *
     * The following built-in JavaScript types are already registered:
     *  - Array
     *  - Boolean
     *  - Function
     *  - Number
     *  - Object
     *  - String
     *
     * @param types A map of type names to constructor functions
     * @returns the current OclEngine object for chaining
     */
    registerTypes(types: TypeRegistry): OclEngine {
        this.registeredTypes = { ...this.registeredTypes, ...types };
        return this;
    }

    /**
     * Register an enumeration that can be used in OCL expressions.
     *
     * @param name The name of the enumeration (e.g., 'Color')
     * @param values An object mapping enum member names to values (e.g., { RED: 0, GREEN: 1 })
     * @returns the current OclEngine object for chaining
     */
    registerEnum(name: string, values: Record<string, unknown>): OclEngine {
        this.registeredEnums = { ...this.registeredEnums, [name]: values };
        return this;
    }

    /**
     * Register a list of OCL expressions.
     *
     * @param oclExpressions The OCL expressions as string list. It will be parsed and added to the list of existing OCL expressions.
     * @returns the current OclEngine object for chaining
     * @param labels Add one or multiple lables to an OCL expression. Labels can be used to address particular expressions
     *               for evaluation.
     * @throws ParserError
     */
    addOclExpressions(oclExpressions: Array<string>, labels: Array<string> = []): OclEngine {
        oclExpressions.forEach(oclExpression => this.addOclExpression(oclExpression, labels));

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
     * @param labels Add one or multiple lables to an OCL expression. Labels can be used to address particular expressions
     *               for evaluation.
     * @returns the current OclEngine object for chaining
     * @throws ParserError
     */
    addOclExpression(oclExpression: string, labels: Array<string> = []): OclEngine {
        try {
            const parsedExpression = OclEngine.Parser.parse(oclExpression, labels, this.registeredTypes);
            this.packageDeclarations.push(parsedExpression);
        } catch (e) {
            (e as Record<string, unknown>).oclExpression = oclExpression;
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
    evaluate(obj: unknown, labels: Array<string> = []): OclResult {
        const visitor = new OclExecutionContext(obj, Array.isArray(labels) ? labels : [labels]);
        visitor.registerTypes(this.registeredTypes);
        visitor.setRegisteredEnumerations(this.registeredEnums);

        if (this.metamodelProvider) {
            visitor.setMetamodelProvider(this.metamodelProvider);
        }
        if (this.typeDeterminerFn) {
            visitor.setTypeDeterminerFn(this.typeDeterminerFn);
        }

        this.packageDeclarations.forEach(e => e.evaluate(visitor));

        return new OclResult(visitor.getFailedInvariants()
            .map(inv => inv.getName()), visitor.getEvaluatedContexts());
    }

    _inferType(obj: unknown): string | undefined {
        if (this.metamodelProvider) {
            return this.metamodelProvider.getTypeName(obj);
        }
        return Utils.getClassName(obj, this.typeDeterminerFn);
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
    evaluateQuery(obj: unknown, oclExpression: Expression): unknown {
        const visitor = new OclExecutionContext(obj);
        visitor.registerTypes(this.registeredTypes);
        visitor.setRegisteredEnumerations(this.registeredEnums);

        if (this.metamodelProvider) {
            visitor.setMetamodelProvider(this.metamodelProvider);
        }
        if (this.typeDeterminerFn) {
            visitor.setTypeDeterminerFn(this.typeDeterminerFn);
        }

        return oclExpression.evaluate(visitor);
    }
}
