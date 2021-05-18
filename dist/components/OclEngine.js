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
exports.OclEngine = void 0;
var pkg = require("../../package.json");
var OclParser_1 = require("./parser/OclParser");
var Utils_1 = require("./Utils");
var OclExecutionContext_1 = require("./OclExecutionContext");
var OclResult_1 = require("./OclResult");
/**
 * The OclEngine class is the main entry point to the OCL.js library.
 *
 * This class allows to add new OCL expressions as well as evaluating given objects agains the saved OCL expressions.
 */
var OclEngine = /** @class */ (function () {
    function OclEngine() {
        this.packageDeclarations = [];
        this.registeredTypes = OclParser_1.OclParser.registeredTypes;
        this.registeredEnums = OclParser_1.OclParser.registeredEnums;
    }
    /**
     * Static create method.
     *
     * @returns a fresh new instance of the OclEngine
     */
    OclEngine.create = function () {
        return new OclEngine();
    };
    /**
     * Set a TypeDeterminer function that receives an object and returns the type of the object.
     *
     * @param fn A callback function that is used to determine the type if the object that is passed into the callback function
     */
    OclEngine.prototype.setTypeDeterminer = function (fn) {
        if (typeof fn === 'function') {
            OclEngine.Utils.typeDeterminerFn = fn;
        }
    };
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
    OclEngine.prototype.registerTypes = function (types) {
        this.registeredTypes = __assign(__assign({}, this.registeredTypes), types);
        OclParser_1.OclParser.registeredTypes = this.registeredTypes;
    };
    OclEngine.prototype.registerEnum = function (name, values) {
        var _a;
        this.registeredEnums = __assign(__assign({}, this.registeredEnums), (_a = {}, _a[name] = values, _a));
        OclParser_1.OclParser.registeredEnums = this.registeredEnums;
    };
    /**
     * Register a list of OCL expressions.
     *
     * @param oclExpressions The OCL expressions as string list. It will be parsed and added to the list of existing OCL expressions.
     * @returns the current OclEngine object for chaining
     * @param labels Add one or multiple lables to an OCL expression. Labels can be used to address particular expressions
     *               for evaluation.
     * @throws ParserError
     */
    OclEngine.prototype.addOclExpressions = function (oclExpressions, labels) {
        var _this = this;
        if (labels === void 0) { labels = []; }
        oclExpressions.forEach(function (oclExpression) { return _this.addOclExpression(oclExpression, labels); });
        return this;
    };
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
    OclEngine.prototype.addOclExpression = function (oclExpression, labels) {
        if (labels === void 0) { labels = []; }
        try {
            var parsedExpression = OclEngine.Parser.parse(oclExpression, labels, this.registeredTypes);
            this.packageDeclarations.push(parsedExpression);
        }
        catch (e) {
            e.oclExpression = oclExpression;
            throw e;
        }
        return this;
    };
    /**
     * Removes the given oclExpression if it has been registered to the OclEngine instance.
     *
     * @param oclExpression
     */
    OclEngine.prototype.removeOclExpression = function (oclExpression) {
        var parsedExpression = OclEngine.Parser.parse(oclExpression, [], this.registeredTypes);
        this.packageDeclarations = this.packageDeclarations.filter(function (packageDeclaration) {
            return Utils_1.Utils.hashCode(packageDeclaration.getRawOclExpression()) !== Utils_1.Utils.hashCode(oclExpression);
        });
        return this;
    };
    /**
     * Clears all registered OclExpressions from the current OclEngine instance.
     */
    OclEngine.prototype.clearAllOclExpressions = function () {
        this.packageDeclarations.length = 0;
        return this;
    };
    /**
     * This function actually evaluates the given object against the registered OCL expressions.
     *
     * @param obj The object which is going to be evaluated against registered OCL expressions.
     * @param labels An array of labels that address expressions that should be evaluated.
     * @returns a result object, which contains the actual result and other info @see OclResult
     */
    OclEngine.prototype.evaluate = function (obj, labels) {
        if (labels === void 0) { labels = []; }
        var visitor = new OclExecutionContext_1.OclExecutionContext(obj, Array.isArray(labels) ? labels : [labels]);
        visitor.registerTypes(this.registeredTypes);
        visitor.setRegisteredEnumerations(this.registeredEnums);
        this.packageDeclarations.forEach(function (e) { return e.evaluate(visitor); });
        return new OclResult_1.OclResult(visitor.getFailedInvariants()
            .map(function (inv) { return inv.getName(); }), visitor.getEvaluatedContexts());
    };
    OclEngine.prototype._inferType = function (obj) {
        return Utils_1.Utils.getClassName(obj);
    };
    /**
     * Specify a OCL query that can be used to extract information from an object.
     *
     * @example oclEngine.createQuery('self.children.name') // Returns an array of the children's names
     * @param oclExpression An OCL expression that is used to create a query of
     * @returns Expression The AST of the parsed oclExpresion
     */
    OclEngine.prototype.createQuery = function (oclExpression) {
        return OclEngine.Parser.parseQuery(oclExpression, this.registeredTypes);
    };
    /**
     * Execute a given OCL query on a given object.
     *
     * @param obj The object to query
     * @param oclExpression The query to run on the given object
     * @returns the result of the provided query.
     */
    OclEngine.prototype.evaluateQuery = function (obj, oclExpression, localVariables) {
        var visitor = new OclExecutionContext_1.OclExecutionContext(obj);
        visitor.registerTypes(this.registeredTypes);
        return oclExpression.evaluate(visitor, localVariables);
    };
    OclEngine.version = pkg.version;
    OclEngine.Utils = Utils_1.Utils;
    OclEngine.Parser = OclParser_1.OclParser;
    return OclEngine;
}());
exports.OclEngine = OclEngine;
//# sourceMappingURL=OclEngine.js.map