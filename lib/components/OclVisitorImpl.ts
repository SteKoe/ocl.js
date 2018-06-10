import { Utils } from './Utils';
import * as Expr from './expressions';
import { OclParser } from './parser/OclParser';
import { IOclVisitor } from './IOclVisitor';

export class OclVisitorImpl implements IOclVisitor {
    evaluationResult: any = undefined;
    evaluatedContexts = 0;
    private failedInvariants: Array<Expr.InvariantExpression> = [];
    private registeredTypes: any;
    private targetTypeName: string;

    constructor(private obj: any, private labelsToExecute: Array<string> = []) {
        this.targetTypeName = Utils.getClassName(obj);
        this.registeredTypes = OclParser.registeredTypes;
    }

    setObjectToEvaluate(obj): IOclVisitor {
        this.obj = obj;

        return this;
    }

    getObjectToEvaluate(): any {
        return this.obj;
    }

    getRegisteredType(targetTypeName: string): any {
        return this.registeredTypes[targetTypeName];
    }

    setTargetTypeName(name: string): void {
        this.targetTypeName = name;
    }

    getTargetTypeName(): string {
        return this.targetTypeName;
    }

    registerTypes(types): void {
        this.registeredTypes = {...this.registeredTypes, ...types};
    }

    getFailedInvariants(): Array<Expr.InvariantExpression> {
        return this.failedInvariants;
    }

    getLabelsToExecute(): Array<string> {
        return this.labelsToExecute;
    }

    getEvaluationResult(): boolean {
        return this.evaluationResult;
    }

    visitOneExpression(expr: Expr.OneExpression): boolean {
        const result = this.visitSelectExpression(expr as Expr.SelectExpression);

        return result.length === 1;
    }

    visitPackageDeclaration(expr: Expr.PackageDeclaration): IOclVisitor {
        if (expr.accept(this)) {
            const contextsToVisit = expr.getContexts()
                .filter(ctx => ctx.accept(this));

            this.evaluatedContexts += contextsToVisit.length;

            const anies = contextsToVisit
                .map(ctx => ctx.visit(this));

            this.evaluationResult = !anies
                .some(inv => inv === false);
        }

        return this;
    }

    visitClassifierContextExpression(expr: Expr.ClassifierContextExpression): boolean {
        if (expr.accept(this)) {
            expr.getDefs()
                .forEach(def => def.visit(this));

            const invs = expr.getInvs();

            return !invs
                .map(inv => {
                    const evaluationResult = inv.visit(this);
                    if (evaluationResult === false) {
                        this.failedInvariants.push(inv);
                    }

                    return evaluationResult;
                })
                .some(inv => inv === false);
        }
    }

    visitPropertyContextExpression(expr: Expr.PropertyContextExpression): boolean {
        expr.getInits().forEach(init => {
            this.obj[expr.getPropertyName()] = init.visit(this);
        });

        expr.getDerived().forEach(derive => {
            this.obj[expr.getPropertyName()] = derive.visit(this);
        });

        return true;
    }

    visitOperationContextExpression(expr: Expr.OperationContextExpression): void {
        if (expr.accept(this)) {
            expr.getExpressions()
                .forEach(expression => {
                    expression.visit(this);
                });
        }
    }

    visitIfExpression(expr: Expr.IfExpression): boolean {
        return expr.getCondition()
            .visit(this) ? expr.getThenExpression()
            .visit(this) : expr.getElseExpression()
            .visit(this);
    }

    visitDeriveExpression(expr: Expr.DeriveExpression): any {
        return expr.getValue()
            .visit(this);
    }

    visitInitExpression(expr: Expr.InitExpression): any {
        return expr.getValue()
            .visit(this);
    }

    visitInvariantExpression(expr: Expr.InvariantExpression): boolean {
        return expr.getDefinition()
            .visit(this);
    }

    visitOperationCallExpression(expr: Expr.OperationCallExpression): boolean {
        const {left, right} = this._visitLeftRightExpression(expr);

        if (expr.getOperator() === Expr.Operator.NOT_EQUAL) {
            return left !== right;
        } else if (expr.getOperator() === Expr.Operator.LESS_EQUAL_THAN) {
            return left <= right;
        } else if (expr.getOperator() === Expr.Operator.GREATER_EQUAL_THAN) {
            return left >= right;
        } else if (expr.getOperator() === Expr.Operator.GREATER_THAN) {
            return left > right;
        } else if (expr.getOperator() === Expr.Operator.LESS_THAN) {
            return left < right;
        } else if (expr.getOperator() === Expr.Operator.EQUAL) {
            return left === right;
        }
    }

    visitOclIsUndefinedExpression(expr: Expr.OclIsUndefinedExpression): boolean {
        const result = expr.getSource()
            .visit(this);

        return result === undefined || typeof result === 'undefined';
    }

    visitOclIsTypeOfExpression(expr: Expr.OclIsTypeOfExpression): boolean {
        let source = expr.getSource()
            .visit(this);
        source = Utils.getClassName(source);

        let body = expr.getBody()
            .visit(this);

        if (typeof body !== 'string') {
            body = Utils.getClassName(body);
        }

        return source === body;
    }

    visitOclIsKindOfExpression(expr: Expr.OclIsKindOfExpression): boolean {
        const source = expr.getSource()
            .visit(this);

        const body = expr.getBody() ? expr.getBody()
            .visit(this) : undefined;

        if (!body) {
            return false;
        }

        return source instanceof body;
    }

    visitNativeJsFunctionCallExpression(expr: Expr.NativeJsFunctionCallExpression): any {
        const source = expr.getSource()
            .visit(this);

        const params = expr.getParams()
            .map(param => param.visit(this));

        if (!source) {
            return false;
        }

        const fn = source[expr.getFn()];
        const isFunction = typeof fn === 'function';

        return isFunction ? fn.apply(source, params) : false;
    }

    visitLetExpression(expr: Expr.LetExpression): void {
        this.obj[expr.getKey()] = expr.getValue()
            .visit(this);
    }

    visitLiteralExpression(expr: Expr.LiteralExpression<any>): any {
        return expr.getValue();
    }

    visitIteratorExpression(expr: Expr.ForAllExpression): boolean {
        const collection = expr.getSource()
            .visit(this);

        if (collection instanceof Array) {
            const iterators = expr.getIterators();
            const body = expr.getBody();
            body.variables = {};

            if (!iterators || iterators.length === 0) {
                return false;
            } else if (iterators.length === 1) {
                return !collection.some(c => {
                    body.variables[expr.getIterators()[0]] = c;
                    const result = body.visit(this) === false;
                    body.variables[expr.getIterators()[0]] = undefined;

                    return result;
                });
            } else if (iterators.length === 2) {
                const sourceLength = collection.length;
                for (let i = 0; i < sourceLength; i++) {
                    body.variables[iterators[0]] = collection[i];
                    for (let j = i + 1; j < sourceLength; j++) {
                        body.variables[iterators[1]] = collection[j];
                        const items = body.visit(this);

                        body.variables[iterators[1]] = undefined;

                        if (items === false) {
                            body.variables[iterators[0]] = undefined;

                            return false;
                        }
                    }
                    body.variables[iterators[0]] = undefined;
                }

                return true;
            }
        } else {
            return false;
        }
    }

    visitImpliesExpression(expr: Expr.ImpliesExpression): boolean {
        const {left, right} = this._visitLeftRightExpression(expr);

        if (left) {
            return right;
        } else {
            return true;
        }
    }

    visitVariableExpression(expr: Expr.VariableExpression): any {
        let obj;
        const source = expr.getSource();
        const parts = source.split('.');
        if (parts[0] === 'self') {
            parts.shift();
            obj = this.obj;
        } else if (expr.variables === undefined) {
            const type = this.registeredTypes[source];
            if (type) {
                return type;
            } else {
                obj = this.obj;
            }
        } else {
            obj = expr.variables;
        }

        return this.registeredTypes[obj] || _resolvePath(obj, parts.join('.'));

        function _resolvePath(object, reference): any {
            return reference.split('.')
                .reduce(dot_deref, object);

            function dot_deref(o, ref): any {
                if (!o) return;

                return !ref ? o : ref.split('[')
                    .reduce(arr_deref, o);
            }

            function arr_deref(o, ref, i): any {
                if (!o) return;

                if (!ref) {
                    return o;
                } else {
                    const prop = ref.slice(0, i ? -1 : ref.length);

                    if (Array.isArray(o)) {
                        return o
                            .map(c => c[prop])
                            .reduce((prev, cur) => {
                                if (Array.isArray(cur)) {
                                    prev.push(...cur);
                                } else {
                                    prev.push(cur);
                                }

                                return prev;
                            }, []);
                    } else {
                        return o[prop];
                    }
                }
            }
        }
    }

    visitSizeExpression(expr: Expr.SizeExpression): number {
        const source = expr.getSource()
            .visit(this);

        if (source && (source instanceof Array || typeof source === 'string')) {
            return source.length;
        } else {
            return 0;
        }
    }

    visitNotExpression(expr: Expr.NotExpression): boolean {
        const source = expr.getSource()
            .visit(this);

        return source !== true;
    }

    visitIsEmptyExpression(expr: Expr.IsEmptyExpression): boolean {
        const source = expr.getSource()
            .visit(this);

        return Array.isArray(source) ? source.length === 0 : true;
    }

    visitNotEmptyExpression(expr: Expr.NotEmptyExpression): boolean {
        const source = expr.getSource()
            .visit(this);

        return Array.isArray(source) ? source.length !== 0 : false;
    }

    /**
     * String ====================================
     */
    visitConcatExpression(expr: Expr.ConcatExpression): string {
        const source = expr.getSource()
            .visit(this);
        const body = expr.getBody()
            .visit(this);

        return String(source)
            .concat(String(body));
    }

    visitIndexOfExpression(expr: Expr.IndexOfExpression): number {
        const source = expr.getSource()
            .visit(this);
        const indexOfString = expr.getBody()
            .visit(this);

        return indexOfString.length === 0 ? 0 : source.indexOf(indexOfString) + 1;
    }

    visitSubstringExpression(expr: Expr.SubstringExpression): string {
        const source = expr.getSource()
            .visit(this);

        if (!expr.getBody()) {
            return source;
        }

        let start;
        let end;
        if (Array.isArray(expr.getBody())) {
            start = expr.getBody()[0];
            end = expr.getBody()[1];
        } else {
            start = expr.getBody();
        }

        const startIndex = start.visit(this);
        const endIndex = end ? end.visit(this) : source.length;

        return source.substring(startIndex, endIndex);
    }

    visitToLowerCaseExpression(expr: Expr.ToLowerCaseExpression): string {
        const source = expr.getSource()
            .visit(this);

        return String(source)
            .toLowerCase();
    }

    visitToUpperCaseExpression(expr: Expr.ToUpperCaseExpression): string {
        const source = expr.getSource()
            .visit(this);

        return String(source)
            .toUpperCase();
    }

    visitToRealExpression(expr: Expr.ToRealExpression): number {
        const source = expr.getSource()
            .visit(this);

        return Number.parseFloat(source);
    }

    visitToIntegerExpression(expr: Expr.ToIntegerExpression): number {
        const source = expr.getSource()
            .visit(this);

        return Number.parseInt(source);
    }

    /**
     * Collection ================================
     */
    visitLastExpression(expr: Expr.LastExpression): any {
        const source = expr.getSource()
            .visit(this);

        if (source instanceof Array) {
            return source[source.length - 1];
        }
    }

    visitFirstExpression(expr: Expr.FirstExpression): any {
        const source = expr.getSource()
            .visit(this);

        if (source instanceof Array) {
            return source[0];
        }
    }

    visitAsSetExpression(expr: Expr.AsSetExpression): Array<any> {
        const source = expr.getSource()
            .visit(this);

        if (source instanceof Array) {
            return Array.from(new Set(source));
        }
    }

    visitAtExpression(expr: Expr.AtExpression): any {
        const source = expr.getSource()
            .visit(this);
        const index = expr.getBody()
            .visit(this);

        if (source instanceof Array && Number.isInteger(index) && index >= 1 && index < source.length) {
            return source[index - 1];
        }
    }

    visitSumExpression(expr: Expr.SumExpression): number {
        const source = expr.getSource()
            .visit(this);

        if (source instanceof Array && source instanceof Array) {
            return source.reduce((prev, cur) => prev + cur, 0);
        }

        return 0;
    }

    visitCollectExpression(expr: Expr.CollectExpression): Array<any> {
        const collection = expr.getSource()
            .visit(this);

        if (collection instanceof Array) {
            return collection.map(c => {
                expr.getBody().variables = {};
                if (expr.getIterators()) {
                    expr.getBody().variables[expr.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(expr);
                    expr.getBody().variables[variableName.getSource()] = c;
                }

                return expr.getBody()
                    .visit(this);
            });
        } else {
            return collection;
        }
    }

    visitExistsExpression(expr: Expr.ExistsExpression): boolean {
        const collection = expr.getSource()
            .visit(this);

        if (collection instanceof Array) {
            return collection.some(c => {
                expr.getBody().variables = {};
                if (expr.getIterators()) {
                    expr.getBody().variables[expr.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(expr);
                    expr.getBody().variables[variableName.getSource()] = c[variableName.getSource()];
                }

                const visitResult = expr.getBody()
                    .visit(this);

                return visitResult === true;
            });
        } else {
            return false;
        }
    }

    visitRejectExpression(expr: Expr.RejectExpression): Array<any> {
        const collection = expr.getSource()
            .visit(this);

        if (collection instanceof Array) {
            return collection.filter(c => {
                expr.getBody().variables = {};
                if (expr.getIterators()) {
                    expr.getBody().variables[expr.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(expr);
                    expr.getBody().variables[variableName.getSource()] = c;
                }

                const visitResult = expr.getBody()
                    .visit(this);

                return !visitResult;
            });
        } else {
            return [];
        }
    }

    visitSelectExpression(expr: Expr.SelectExpression): Array<any> {
        const collection = expr.getSource()
            .visit(this);

        if (collection instanceof Array) {
            return collection.filter(c => {
                expr.getBody().variables = {};
                if (expr.getIterators()) {
                    expr.getBody().variables[expr.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(expr);
                    expr.getBody().variables[variableName.getSource()] = c;
                }

                return expr.getBody()
                    .visit(this);
            });
        } else {
            return [];
        }
    }

    visitUnionExpression(expr: Expr.UnionExpression): Array<any> {
        const source = expr.getSource()
            .visit(this);

        expr.getBody().variables = expr.variables;
        const body = expr.getBody()
            .visit(this);

        if (source instanceof Array && body instanceof Array) {
            return source.concat(body);
        }

        return [];
    }

    /**
     * Boolean Gates =============================
     */
    visitOrExpression(expr: Expr.OrExpression): boolean {
        const {left, right} = this._visitLeftRightExpression(expr);

        return left || right;
    }

    visitXorExpression(expr: Expr.XorExpression): boolean {
        const {left, right} = this._visitLeftRightExpression(expr);

        return (left || right) && !(left && right);
    }

    visitAndExpression(expr: Expr.AndExpression): boolean {
        const {left, right} = this._visitLeftRightExpression(expr);

        return left && right;
    }

    /**
     * Math ======================================
     */
    visitAdditionExpression(expr: Expr.AdditionExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);

        return left + right;
    }

    visitSubstractionExpression(expr: Expr.SubstractionExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);

        return left - right;
    }

    visitMultiplyExpression(expr: Expr.MultiplyExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);

        return left * right;
    }

    visitModuloExpression(expr: Expr.ModuloExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);

        return left % right;
    }

    visitPowerExpression(expr: Expr.PowerExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);

        return Math.pow(left, right);
    }

    visitDivideExpression(expr: Expr.DivideExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);

        return left / right;
    }

    visitAbsExpression(expr: Expr.AbsExpression): number {
        expr.getSource().variables = expr.variables;
        const left = expr.getSource()
            .visit(this);

        return Math.abs(left);
    }

    visitSqrtExpression(expr: Expr.SqrtExpression): number {
        const sqrt = expr.getBody() ? expr.getBody()
            .visit(this) : 2;

        expr.getSource().variables = expr.variables;
        const left = expr.getSource()
            .visit(this);

        return Math.pow(left, 1 / sqrt);
    }

    _visitLeftRightExpression(expr: Expr.LeftRightBasedExpression): { left: any, right: any } {
        expr.getLeft().variables = expr.variables;
        const left = expr.getLeft()
            .visit(this);

        expr.getRight().variables = expr.variables;
        const right = expr.getRight()
            .visit(this);

        return {left, right};
    }

}
