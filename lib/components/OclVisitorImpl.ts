import {Utils} from './Utils'
import {
    AbsExpression,
    AdditionExpression,
    AndExpression,
    AsSetExpression,
    AtExpression,
    ClassifierContextExpression,
    CollectExpression,
    ConcatExpression,
    DeriveExpression,
    DivideExpression,
    ExistsExpression,
    FirstExpression,
    ForAllExpression,
    IfExpression,
    ImpliesExpression,
    IndexOfExpression,
    InitExpression,
    InvariantExpression,
    IsEmptyExpression,
    LastExpression,
    LeftRightBasedExpression,
    LetExpression,
    LiteralExpression,
    ModuloExpression,
    MultiplyExpression,
    NativeJsFunctionCallExpression,
    NotEmptyExpression,
    NotExpression,
    OclIsKindOfExpression,
    OclIsTypeOfExpression,
    OclIsUndefinedExpression,
    OperationCallExpression,
    OperationContextExpression,
    Operator,
    OrExpression,
    PackageDeclaration,
    PowerExpression,
    PropertyContextExpression,
    RejectExpression,
    SelectExpression,
    SizeExpression,
    SqrtExpression,
    SubstractionExpression,
    SubstringExpression,
    SumExpression,
    ToIntegerExpression,
    ToLowerCaseExpression,
    ToRealExpression,
    ToUpperCaseExpression,
    UnionExpression,
    VariableExpression,
    XorExpression
} from './expressions'
import {OclParser} from './parser/OclParser'
import {OclVisitor} from "./OclVisitor";

export class OclVisitorImpl implements OclVisitor {
    public evaluationResult: any = undefined;
    labelsToExecute: any[] = [];
    evaluatedContexts: number = 0;
    targetType: any | string;
    _targetType: any;
    failedInvariants: any[] = [];
    DEBUG: boolean;
    private obj: any;
    private registeredTypes: any;

    constructor(obj: any) {
        this.obj = obj;
        this.targetType = Utils.getClassName(obj);
        this.registeredTypes = OclParser.registeredTypes;
    }

    setObjectToEvaluate(obj): OclVisitorImpl {
        this.obj = obj;
        return this;
    }

    registerTypes(types): void {
        this.registeredTypes = Object.assign({}, this.registeredTypes, types);
    }

    visitPackageDeclaration(expr: PackageDeclaration): OclVisitorImpl {
        let contextsToVisit = expr.getContexts()
            .filter(ctx => ctx.accept(this));

        this.evaluatedContexts += contextsToVisit.length;

        this.evaluationResult = !contextsToVisit
            .map(ctx => ctx.visit(this))
            .some(inv => inv === false);

        return this;
    }

    visitClassifierContextExpression(expr: ClassifierContextExpression): boolean {
        if (expr.accept(this)) {
            expr.getDefs().forEach(def => def.visit(this));

            const invs = expr.getInvs();

            return !invs
                .map(inv => {
                    let evaluationResult = inv.visit(this);
                    if (evaluationResult === false) {
                        this.failedInvariants.push(inv);
                    }
                    return evaluationResult;
                })
                .some(inv => inv === false);
        }
    }

    visitPropertyContextExpression(expr: PropertyContextExpression): boolean {
        expr.inits.forEach(init => {
            this.obj[expr.propertyName] = init.visit(this);
        });

        expr.derived.forEach(derive => {
            this.obj[expr.propertyName] = derive.visit(this);
        });

        return true;
    }

    visitOperationContextExpression(expr: OperationContextExpression): void {
        if (expr.accept(this)) {
            expr.getExpressions().forEach(expression => {
                expression.visit(this);
            });
        }
    }

    visitIfExpression(expr: IfExpression): boolean {
        return expr.getCondition().visit(this) ? expr.getThenExpression().visit(this) : expr.getElseExpression().visit(this);
    }

    visitDeriveExpression(expr: DeriveExpression): any {
        return expr.getValue().visit(this);
    }

    visitInitExpression(expr: InitExpression): any {
        return expr.getValue().visit(this);
    }

    visitInvariantExpression(expr: InvariantExpression): boolean {
        return expr.getDefinition().visit(this);
    }

    visitOperationCallExpression(expr: OperationCallExpression): boolean {
        const {left, right} = this._visitLeftRightExpression(expr);

        if (expr.getOperator() === Operator.NOT_EQUAL) {
            return left !== right;
        } else if (expr.getOperator() === Operator.LESS_EQUAL_THAN) {
            return left <= right;
        } else if (expr.getOperator() === Operator.GREATER_EQUAL_THAN) {
            return left >= right;
        } else if (expr.getOperator() === Operator.GREATER_THAN) {
            return left > right;
        } else if (expr.getOperator() === Operator.LESS_THAN) {
            return left < right;
        } else if (expr.getOperator() === Operator.EQUAL) {
            return left === right;
        }
    }

    visitOclIsUndefinedExpression(expr: OclIsUndefinedExpression): boolean {
        let result = expr.getSource().visit(this);
        return result === undefined || typeof result === 'undefined';
    }

    visitOclIsTypeOfExpression(expr: OclIsTypeOfExpression): boolean {
        let source = expr.getSource().visit(this);
        source = Utils.getClassName(source);

        let body = expr.getBody().visit(this);

        if (typeof body !== "string") {
            body = Utils.getClassName(body);
        }

        return source === body;
    }

    visitOclIsKindOfExpression(expr: OclIsKindOfExpression): boolean {
        let source = expr.getSource().visit(this);
        let body = expr.getBody() ? expr.getBody().visit(this) : undefined;

        if (!body) {
            return false;
        }

        return source instanceof body;
    }

    visitNativeJsFunctionCallExpression(expr: NativeJsFunctionCallExpression): any {
        let source = expr.getSource().visit(this);
        const params = expr.getParams().map(param => param.visit(this));

        if (!source) {
            return false;
        }

        let fn = source[expr.getFn()];
        let isFunction = typeof fn === 'function';
        return isFunction ? fn.apply(source, params) : false;
    }

    visitLetExpression(expr: LetExpression): void {
        this.obj[expr.getKey()] = expr.getValue().visit(this);
    }

    visitLiteralExpression(expr: LiteralExpression<any>): any {
        return expr.getValue();
    }

    visitIteratorExpression(expr: ForAllExpression): boolean {
        const collection = expr.getSource().visit(this);
        if (collection instanceof Array) {
            const iterators = expr.getIterators();
            const body = expr.getBody();
            body.variables = {};

            if (!iterators || iterators.length === 0) {
                return false;
            } else if (iterators.length === 1) {
                return !collection.some(c => {
                    body.variables[expr.getIterators()[0]] = c;
                    let result = body.visit(this) === false;
                    body.variables[expr.getIterators()[0]] = undefined;
                    return result;
                });
            } else if (iterators.length === 2) {
                const sourceLength = collection.length;
                for (let i = 0; i < sourceLength; i++) {
                    body.variables[iterators[0]] = collection[i];
                    for (let j = i + 1; j < sourceLength; j++) {
                        body.variables[iterators[1]] = collection[j];
                        let items = body.visit(this);

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

    visitImpliesExpression(expr: ImpliesExpression): boolean {
        const {left, right} = this._visitLeftRightExpression(expr);

        if (left) {
            return right;
        } else {
            return true;
        }
    }

    visitVariableExpression(expr: VariableExpression): any {
        let o;
        const source = expr.getSource();
        let parts = source.split('.');
        if (parts[0] === 'self') {
            parts.shift();
            o = this.obj;
        } else if (expr.variables === undefined) {
            let type = this.registeredTypes[source];
            if (type) {
                return type
            } else {
                o = this.obj;
            }
        } else {
            o = expr.variables;
        }

        return this.registeredTypes[o] || _resolvePath(o, parts.join('.'));

        function _resolvePath(object, reference) {
            return reference.split('.').reduce(dot_deref, object);


            function dot_deref(o, ref) {
                if (!o) return;
                return !ref ? o : ref.split('[').reduce(arr_deref, o);
            }

            function arr_deref(o, ref, i) {
                if (!o) return;

                if (!ref) {
                    return o;
                } else {
                    let prop = ref.slice(0, i ? -1 : ref.length);
                    let result;

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

    visitSizeExpression(expr: SizeExpression): number {
        let source = expr.getSource().visit(this);
        if (source && (source instanceof Array || typeof source === 'string')) {
            return source.length;
        } else {
            return 0;
        }
    }

    visitNotExpression(expr: NotExpression): boolean {
        let source = expr.getSource().visit(this);
        return source !== true;
    }

    visitIsEmptyExpression(expr: IsEmptyExpression): boolean {
        let source = expr.getSource().visit(this);
        return Array.isArray(source) ? source.length === 0 : true;
    }

    visitNotEmptyExpression(expr: NotEmptyExpression): boolean {
        let source = expr.getSource().visit(this);
        return Array.isArray(source) ? source.length !== 0 : false;
    }

    /**
     * String ====================================
     */
    visitConcatExpression(expr: ConcatExpression): string {
        let source = expr.getSource().visit(this);
        let body = expr.getBody().visit(this);
        return String(source).concat(String(body));
    }

    visitIndexOfExpression(expr: IndexOfExpression): number {
        let source = expr.getSource().visit(this);
        let indexOfString = expr.getBody().visit(this);

        return indexOfString.length === 0 ? 0 : source.indexOf(indexOfString) + 1;
    }

    visitSubstringExpression(expr: SubstringExpression): string {
        let source = expr.getSource().visit(this);

        if (!expr.getBody()) {
            return source;
        }

        let start, end;
        if (Array.isArray(expr.getBody())) {
            start = expr.getBody()[0];
            end = expr.getBody()[1];
        } else {
            start = expr.getBody();
        }

        let startIndex = start.visit(this);
        let endIndex = end ? end.visit(this) : source.length;
        return source.substring(startIndex, endIndex);
    }

    visitToLowerCaseExpression(expr: ToLowerCaseExpression): string {
        let source = expr.getSource().visit(this);
        return String(source).toLowerCase();
    }

    visitToUpperCaseExpression(expr: ToUpperCaseExpression): string {
        let source = expr.getSource().visit(this);
        return String(source).toUpperCase();
    }

    visitToRealExpression(expr: ToRealExpression): number {
        let source = expr.getSource().visit(this);
        return Number.parseFloat(source);
    }

    visitToIntegerExpression(expr: ToIntegerExpression): number {
        let source = expr.getSource().visit(this);
        return Number.parseInt(source);
    }

    /**
     * Collection ================================
     */
    visitLastExpression(expr: LastExpression): any {
        const source = expr.getSource().visit(this);
        if (source instanceof Array) {
            return source[source.length - 1];
        }
    }

    visitFirstExpression(expr: FirstExpression): any {
        const source = expr.getSource().visit(this);
        if (source instanceof Array) {
            return source[0];
        }
    }

    visitAsSetExpression(expr: AsSetExpression): any[] {
        const source = expr.getSource().visit(this);
        if (source instanceof Array) {
            return Array.from(new Set(source));
        }
    }

    visitAtExpression(expr: AtExpression): any {
        const source = expr.getSource().visit(this);
        const index = expr.getBody().visit(this);

        if (source instanceof Array && Number.isInteger(index) && index >= 1 && index < source.length) {
            return source[index - 1];
        }
    }

    visitSumExpression(expr: SumExpression): number {
        const source = expr.getSource().visit(this);

        if (source instanceof Array && source instanceof Array) {
            return source.reduce((prev, cur) => prev + cur, 0);
        }

        return 0;
    }

    visitCollectExpression(expr: CollectExpression): any[] {
        const collection = expr.getSource().visit(this);
        if (collection instanceof Array) {
            return collection.map(c => {
                expr.getBody().variables = {};
                if (expr.getIterators()) {
                    expr.getBody().variables[expr.getIterators()[0]] = c;
                } else {
                    let variableName = Utils.getVariableName(expr);
                    expr.getBody().variables[variableName.source] = c;
                }

                let visitResult = expr.getBody().visit(this);
                return visitResult;
            });
        } else {
            return collection;
        }
    }

    visitExistsExpression(expr: ExistsExpression): boolean {
        const collection = expr.getSource().visit(this);
        if (collection instanceof Array) {
            return collection.some(c => {
                expr.getBody().variables = {};
                if (expr.getIterators()) {
                    expr.getBody().variables[expr.getIterators()[0]] = c;
                } else {
                    let variableName = Utils.getVariableName(expr);
                    expr.getBody().variables[variableName.source] = c[variableName.source];
                }

                let visitResult = expr.getBody().visit(this);
                return visitResult === true;
            });
        } else {
            return false;
        }
    }

    visitRejectExpression(expr: RejectExpression): any[] {
        const collection = expr.getSource().visit(this);
        if (collection instanceof Array) {
            return collection.filter(c => {
                expr.getBody().variables = {};
                if (expr.getIterators()) {
                    expr.getBody().variables[expr.getIterators()[0]] = c;
                } else {
                    let variableName = Utils.getVariableName(expr);
                    expr.getBody().variables[variableName.source] = c;
                }

                let visitResult = expr.getBody().visit(this);
                return !visitResult;
            });
        } else {
            return [];
        }
    }

    visitSelectExpression(expr: SelectExpression): any[] {
        const collection = expr.getSource().visit(this);
        if (collection instanceof Array) {
            return collection.filter(c => {
                expr.getBody().variables = {};
                if (expr.getIterators()) {
                    expr.getBody().variables[expr.getIterators()[0]] = c;
                } else {
                    let variableName = Utils.getVariableName(expr);
                    expr.getBody().variables[variableName.source] = c;
                }

                let visitResult = expr.getBody().visit(this);
                return visitResult;
            });
        } else {
            return [];
        }
    }

    visitUnionExpression(expr: UnionExpression): any[] {
        const source = expr.getSource().visit(this);

        expr.getBody().variables = expr.variables;
        const body = expr.getBody().visit(this);

        if (source instanceof Array && body instanceof Array) {
            return source.concat(body);
        }
        return [];
    }

    /**
     * Boolean Gates =============================
     */
    visitOrExpression(expr: OrExpression): boolean {
        const {left, right} = this._visitLeftRightExpression(expr);
        return left || right;
    }

    visitXorExpression(expr: XorExpression): boolean {
        const {left, right} = this._visitLeftRightExpression(expr);
        return (left || right) && !(left && right);
    }

    visitAndExpression(expr: AndExpression): boolean {
        const {left, right} = this._visitLeftRightExpression(expr);
        return left && right;
    }

    /**
     * Math ======================================
     */
    visitAdditionExpression(expr: AdditionExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);
        return left + right;
    }

    visitSubstractionExpression(expr: SubstractionExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);
        return left - right;
    }

    visitMultiplyExpression(expr: MultiplyExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);
        return left * right;
    }

    visitModuloExpression(expr: ModuloExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);
        return left % right;
    }

    visitPowerExpression(expr: PowerExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);
        return Math.pow(left, right);
    }

    visitDivideExpression(expr: DivideExpression): number {
        const {left, right} = this._visitLeftRightExpression(expr);
        return left / right;
    }

    visitAbsExpression(expr: AbsExpression): number {
        expr.getSource().variables = expr.variables;
        let left = expr.getSource().visit(this);

        return Math.abs(left);
    }

    visitSqrtExpression(expr: SqrtExpression): number {
        let sqrt = expr.getBody() ? expr.getBody().visit(this) : 2;

        expr.getSource().variables = expr.variables;
        let left = expr.getSource().visit(this);

        return Math.pow(left, 1 / sqrt);
    }

    _visitLeftRightExpression(expr: LeftRightBasedExpression) {
        expr.getLeft().variables = expr.variables;
        const left = expr.getLeft().visit(this);

        expr.getRight().variables = expr.variables;
        const right = expr.getRight().visit(this);

        return {left, right}
    }

}
