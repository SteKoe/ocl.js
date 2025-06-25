import {OclExecutionContext} from '../OclExecutionContext';


import {SourceBasedExpression} from "./SourceBasedExpression";

/**
 * Resolve variables. Simple values are returned as is (e.g. self.age: number), collections are aggregated.
 */
export class VariableExpression extends SourceBasedExpression {
    private readonly variable: string;

    constructor(source) {
        super(source);
        this.variable = source;
    }

    getVariable(): string {
        return this.variable;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        let obj;
        
        const objectToEvaluate = visitor.getObjectToEvaluate();
        let _variables = {
            ...localVariables,
        };
        
        const source = this.getVariable();
        let parts = source.split('.');

        const type = visitor.getRegisteredType(source);
        if (type) {
            visitor.setEvaluatedValue(this, type);
            return type;
        }

        if (parts[0] !== 'self' && Object.hasOwn(objectToEvaluate, [parts[0]])) {
            _variables = {
                ...localVariables,
                self: localVariables?.self ?? localVariables
            };
            parts = ['self', ...parts]
        }
        
        if (parts[0] === 'self') {
            parts.shift();
            obj = (_variables?.self) ?? objectToEvaluate;
        } else {
            obj = _variables;
        }

        let evaluatedValue = visitor.getRegisteredType(obj) ?? _resolvePath(obj, parts.join('.'));
        visitor.setEvaluatedValue(this, evaluatedValue);
        return evaluatedValue;

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
