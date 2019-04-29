import { SourceBasedExpression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';

/**
 * Resolve variables. Simple values are returned as is (e.g. self.age: number), collections are aggregated.
 */
export class VariableExpression extends SourceBasedExpression {
    private variable: string;

    constructor(source) {
        super(source);
        this.variable = source;
    }

    getVariable(): string {
        return this.variable;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        let obj;
        const _variables = localVariables;
        const source = this.getVariable();
        const parts = source.split('.');

        if (parts[0] === 'self') {
            parts.shift();
            obj = (_variables && _variables['self']) || visitor.getObjectToEvaluate();
        } else if (_variables === undefined) {
            const type = visitor.getRegisteredType(source);
            if (type) {
                return type;
            } else {
                obj = visitor.getObjectToEvaluate();
            }
        } else {
            obj = _variables;
        }

        return visitor.getRegisteredType(obj) || _resolvePath(obj, parts.join('.'));

        function _resolvePath(object, reference): any {
            return reference.split('.')
                .reduce(dot_deref, object);

            function dot_deref(o, ref): any {
                if (!o) return;

                o = isIterable(o) ? Array.from(o) : o;

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

        function isIterable(iterableObject: any): boolean {
            if (!iterableObject) {
                return false;
            }

            return iterableObject instanceof Array || iterableObject instanceof Set;
        }
    }
}
