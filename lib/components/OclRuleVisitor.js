import { Utils } from './Utils'
import { Operator } from './expressions/OperationCallExpression'

export class OclRuleVisitor {
    constructor(obj) {
        this.obj = obj;
        this.evaluationResult = OclRuleVisitor.RESULT_NOT_RUN;
        this.failedInvariants = [];
        this.targetType = Utils.getClassName(obj);
    }

    visitPackageDeclaration(expr) {
        this.evaluationResult = !expr.contexts
            .map(ctx => ctx.accept(this) ? ctx.visit(this) : true)
            .some(inv => inv === false);
    }

    visitContextExpression(expr) {
        if (expr.accept(this)) {
            expr.defs.forEach(def => def.visit(this));

            return !expr.invs
                .map(inv => {
                    let evaluationResult = inv.visit(this)
                    if (evaluationResult === false) {
                        this.failedInvariants.push(inv);
                    }
                    return evaluationResult;
                })
                .some(inv => inv === false);
        }
    }

    visitPropertyContextExpression(expr) {
        expr.inits.forEach(init => {
            this.obj[expr.propertyName] = init.visit(this);
        });

        expr.derived.forEach(derive => {
            this.obj[expr.propertyName] = derive.visit(this);
        });

        return true;
    }

    visitOperationContextExpression(expr) {
        if (expr.accept(this)) {
            expr.expression.forEach(expression => {
                expression.visit(this);
            });
        }
    }

    visitIfExpression(expr) {
        return expr.condition.visit(this) ? expr._then.visit(this) : expr._else.visit(this);
    }

    visitDeriveExpression(expr) {
        return expr.value.visit(this);
    }

    visitInitExpression(expr) {
        return expr.value.visit(this);
    }

    visitInvariantExpression(expr) {
        if (expr.definition.accept(this)) {
            return expr.definition.visit(this);
        }

        return true;
    }

    visitOperationCallExpression(expr) {
        let left, right;

        if (expr.left.accept(this)) {
            expr.left.variables = expr.variables;
            left = expr.left.visit(this);
        }

        if (expr.right.accept(this)) {
            expr.right.variables = expr.variables;
            right = expr.right.visit(this);
        }

        if (expr.operator === Operator.NOT_EQUAL) {
            return left !== right;
        } else if (expr.operator === Operator.LESS_EQUAL_THAN) {
            return left <= right;
        } else if (expr.operator === Operator.GREATER_EQUAL_THAN) {
            return left >= right;
        } else if (expr.operator === Operator.GREATER_THAN) {
            return left > right;
        } else if (expr.operator === Operator.LESS_THAN) {
            return left < right;
        } else if (expr.operator === Operator.EQUAL) {
            return left === right;
        }
    }

    visitOclIsUndefinedExpression(expr) {
        let result = expr.source.visit(this);
        return result === undefined || typeof result === 'undefined';
    }

    visitOclIsTypeOfExpression(expr) {
        return Utils.getClassName(expr.source.visit(this)) === expr.body.visit(this);
    }

    visitNativeJsFunctionCallExpression(expr) {
        let source = expr.source.visit(this);
        const params = expr.params.map(param => param.visit(this));

        if (!source) {
            return false;
        }

        let fn = source[expr.fn];
        let isFunction = typeof fn === 'function';
        return isFunction ? fn.apply(source, params) : false;
    }

    visitLetExpression(expr) {
        this.obj[expr.key] = expr.value.visit(this);
    }

    visitLiteralExpression(expr) {
        return expr.value;
    }

    visitIteratorExpression(expr) {
        const collection = expr.source.visit(this);
        if (collection instanceof Array) {
            if (!expr.iterators || expr.iterators.length === 0) {
                return false;
            } else if (expr.iterators.length === 1) {
                expr.body.variables = {};

                return !collection.some(c => {
                    expr.body.variables[expr.iterators[0]] = c;
                    let result = expr.body.visit(this) === false;
                    expr.body.variables[expr.iterators[0]] = null;
                    return result;
                });
            } else if (expr.iterators.length === 2) {
                const sourceLength = collection.length;
                expr.body.variables = {};
                for (let i = 0; i < sourceLength; i++) {
                    expr.body.variables[expr.iterators[0]] = collection[i];

                    for (let j = i + 1; j < sourceLength; j++) {
                        expr.body.variables[expr.iterators[1]] = collection[j];
                        let items = expr.body.visit(this);

                        expr.body.variables[expr.iterators[1]] = null;

                        if (items === false) {
                            expr.body.variables[expr.iterators[0]] = null;
                            return false;
                        }
                    }
                    expr.body.variables[expr.iterators[0]] = null;
                }

                return true;
            }
        } else {
            return false;
        }
    }

    visitImpliesExpression(expr) {
        expr.left.variables = expr.variables;
        let left = expr.left.visit(this);

        expr.right.variables = expr.variables;
        let right = expr.right.visit(this);

        if (left) {
            return right;
        } else {
            return true;
        }
    }

    visitVariableExpression(expr) {
        let o;
        let parts = expr.source.split('.');
        if (parts[0] === 'self') {
            parts.shift();
            o = this.obj;
        } else if (expr.variables === undefined) {
            o = this.obj;
        } else {
            o = expr.variables;
        }

        return _resolvePath(o, parts.join('.'));

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
                    let prop = ref.slice(0, i ? -1 : ref.length)

                    if (Array.isArray(o)) {
                        return o.map(c => c[prop]);
                    }

                    return o[prop];
                }
            }
        }
    }

    visitSizeExpression(expr) {
        let source = expr.source.visit(this);
        if (source && (source instanceof Array || source instanceof Map || source instanceof Set || typeof source === 'string')) {
            return source.length;
        } else {
            return 0;
        }
    }

    visitNotExpression(expr) {
        let source = expr.source.visit(this);
        return source !== true;
    }

    visitIsEmptyExpression(expr) {
        let source = expr.source.visit(this);
        return Array.isArray(source) ? source.length === 0 : true;
    }

    visitNotEmptyExpression(expr) {
        let source = expr.source.visit(this);
        return Array.isArray(source) ? source.length !== 0 : false;
    }

    /**
     * String ====================================
     */
    visitConcatExpression(expr) {
        let source = expr.source.visit(this);
        let body = expr.body.visit(this);
        return String(source).concat(String(body));
    }

    visitIndexOfExpression(expr) {
        let source = expr.source.visit(this);
        let indexOfString = expr.body.visit(this);

        return indexOfString.length === 0 ? 0 : source.indexOf(indexOfString) + 1;
    }

    visitSubstringExpression(expr) {
        let source = expr.source.visit(this);

        if (!expr.body) {
            return source;
        }

        let start, end;
        if (Array.isArray(expr.body)) {
            start = expr.body[0];
            end = expr.body[1];
        } else {
            start = expr.body;
        }

        let startIndex = start.visit(this);
        let endIndex = end ? end.visit(this) : source.length;
        return source.substring(startIndex, endIndex);
    }

    visitToLowerCaseExpression(expr) {
        let source = expr.source.visit(this);
        return String(source).toLowerCase();
    }

    visitToUpperCaseExpression(expr) {
        let source = expr.source.visit(this);
        return String(source).toUpperCase();
    }

    visitToRealExpression(expr) {
        let source = expr.source.visit(this);
        return Number.parseFloat(source);
    }

    visitToIntegerExpression(expr) {
        let source = expr.source.visit(this);
        return Number.parseInt(source);
    }

    /**
     * Collection ================================
     */
    visitLastExpression(expr) {
        const source = expr.source.visit(this);
        if (source instanceof Array) {
            return source[source.length - 1];
        }
    }

    visitFirstExpression(expr) {
        const source = expr.source.visit(this);
        if (source instanceof Array) {
            return source[0];
        }
    }

    visitAsSetExpression(expr) {
        const source = expr.source.visit(this);
        if (source instanceof Array) {
            return Array.from(new Set(source));
        }
    }

    visitAtExpression(expr) {
        const source = expr.source.visit(this);
        const index = expr.body.visit(this);

        if (source instanceof Array && Number.isInteger(index) && index >= 1 && index < source.length) {
            return source[index - 1];
        }
    }

    visitSumExpression(expr) {
        const source = expr.source.visit(this);

        if (source instanceof Array && source instanceof Array) {
            return source.reduce((prev, cur) => prev + cur, 0);
        }

        return 0;
    }

    visitCollectExpression(expr) {
        const collection = expr.source.visit(this)
        if (collection instanceof Array) {
            return collection.map(c => {
                expr.body.variables = {};
                if (expr.iterators) {
                    expr.body.variables[expr.iterators[0]] = c;
                } else {
                    let variableName = Utils.getVariableName(expr);
                    expr.body.variables[variableName.source] = c;
                }

                let visitResult = expr.body.visit(this);
                return visitResult;
            });
        } else {
            return collection;
        }
    }

    visitExistsExpression(expr) {
        const collection = expr.source.visit(this)
        if (collection instanceof Array) {
            return collection.some(c => {
                expr.body.variables = {};
                if (expr.iterators) {
                    expr.body.variables[expr.iterators[0]] = c;
                } else {
                    let variableName = Utils.getVariableName(expr);
                    expr.body.variables[variableName.source] = c[variableName.source];
                }

                let visitResult = expr.body.visit(this);
                return visitResult === true;
            });
        } else {
            return false;
        }
    }

    visitRejectExpression(expr) {
        const collection = expr.source.visit(this)
        if (collection instanceof Array) {
            return collection.filter(c => {
                expr.body.variables = {};
                if (expr.iterators) {
                    expr.body.variables[expr.iterators[0]] = c;
                } else {
                    let variableName = Utils.getVariableName(expr);
                    expr.body.variables[variableName.source] = c;
                }

                let visitResult = expr.body.visit(this)
                return !visitResult;
            });
        } else {
            return [];
        }
    }

    visitSelectExpression(expr) {
        const collection = expr.source.visit(this)
        if (collection instanceof Array) {
            return collection.filter(c => {
                expr.body.variables = {};
                if (expr.iterators) {
                    expr.body.variables[expr.iterators[0]] = c;
                } else {
                    let variableName = Utils.getVariableName(expr)
                    expr.body.variables[variableName.source] = c;
                }

                let visitResult = expr.body.visit(this);
                return visitResult;
            });
        } else {
            return [];
        }
    }


    visitUnionExpression(expr) {
        const source = expr.source.visit(this);

        expr.body.variables = expr.variables;
        const body = expr.body.visit(this);

        if (source instanceof Array && body instanceof Array) {
            return source.concat(body);
        }
        return [];
    }

    /**
     * Boolean Gates =============================
     */
    visitOrExpression(expr) {
        expr.left.variables = expr.variables;
        const left = expr.left.visit(this);

        expr.right.variables = expr.variables;
        const right = expr.right.visit(this);

        return left || right;
    }

    visitXorExpression(expr) {
        expr.left.variables = expr.variables;
        const left = expr.left.visit(this);

        expr.right.variables = expr.variables;
        const right = expr.right.visit(this);

        return ( left || right ) && !( left && right );
    }

    visitAndExpression(expr) {
        expr.left.variables = expr.variables;
        const left = expr.left.visit(this);

        expr.right.variables = expr.variables;
        const right = expr.right.visit(this);

        return left && right;
    }

    /**
     * Math ======================================
     */
    _visitMathExpression(expr) {
        let left, right;

        if (expr.left.accept(this)) {
            expr.left.variables = expr.variables;
            left = expr.left.visit(this);
        }

        if (expr.right.accept(this)) {
            expr.right.variables = expr.variables;
            right = expr.right.visit(this);
        }

        return { left, right }
    }

    visitAdditionExpression(expr) {
        const { left, right } = this._visitMathExpression(expr);
        return left + right;
    }

    visitSubstractionExpression(expr) {
        const { left, right } = this._visitMathExpression(expr);
        return left - right;
    }

    visitMultiplyExpression(expr) {
        const { left, right } = this._visitMathExpression(expr);
        return left * right;
    }

    visitModuloExpression(expr) {
        const { left, right } = this._visitMathExpression(expr);
        return left % right;
    }

    visitPowerExpression(expr) {
        const { left, right } = this._visitMathExpression(expr);
        return Math.pow(left, right);
    }

    visitDivideExpression(expr) {
        const { left, right } = this._visitMathExpression(expr);
        return left / right;
    }

    visitAbsExpression(expr) {
        if (expr.left.accept(this)) {
            expr.left.variables = expr.variables;
            let left = expr.left.visit(this);

            return Math.abs(left);
        }
    }
}

OclRuleVisitor.RESULT_FAIL = false;
OclRuleVisitor.RESULT_NOT_RUN = undefined;
OclRuleVisitor.RESULT_PASS = true;
