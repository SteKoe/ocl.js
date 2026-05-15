import {OclExecutionContext} from '@/OclExecutionContext';
import {LocalVariables} from '@/types';

import {Expression} from "./Expression";

/**
 * Resolve variables. Simple values are returned as is (e.g. self.age: number), collections are aggregated.
 * 
 * Note: VariableExpression extends Expression directly (not SourceBasedExpression) because its
 * "source" is a string path, not a child Expression.
 */
export class VariableExpression extends Expression {
    readonly source: string;
    private readonly variable: string;

    constructor(source: string) {
        super();
        this.source = source;
        this.variable = source;
    }

    getVariable(): string {
        return this.variable;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        let obj: unknown;
        
        const objectToEvaluate = visitor.getObjectToEvaluate() as Record<string, unknown>;
        let _variables: LocalVariables = {
            ...localVariables,
        };
        
        const source = this.getVariable();
        let parts = source.split('.');

        const type = visitor.getRegisteredType(source);
        if (type) {
            visitor.setEvaluatedValue(this, type);
            return type;
        }

        if (parts[0] !== 'self' && Object.prototype.hasOwnProperty.call(objectToEvaluate, parts[0])) {
            _variables = {
                ...localVariables,
                self: (localVariables?.self as unknown) ?? localVariables
            };
            parts = ['self', ...parts]
        }
        
        if (parts[0] === 'self') {
            parts.shift();
            obj = (_variables?.self) ?? objectToEvaluate;
        } else {
            obj = _variables;
        }

        const evaluatedValue = visitor.getRegisteredType(obj as string) ?? _resolvePath(obj, parts.join('.'));
        visitor.setEvaluatedValue(this, evaluatedValue);
        return evaluatedValue;

        function _resolvePath(object: unknown, reference: string): unknown {
            return reference.split('.')
                .reduce(dot_deref, object);

            function dot_deref(o: unknown, ref: string): unknown {
                if (!o) return;

                o = isIterable(o) ? Array.from(o as Iterable<unknown>) : o;

                return !ref ? o : ref.split('[')
                    .reduce(arr_deref, o);
            }

            function arr_deref(o: unknown, ref: string, i: number): unknown {
                if (!o) return;

                if (!ref) {
                    return o;
                } else {
                    const prop = ref.slice(0, i ? -1 : ref.length);

                    if (Array.isArray(o)) {
                        return o
                            .map(c => (c as Record<string, unknown>)[prop])
                            .reduce((prev: unknown[], cur: unknown) => {
                                if (Array.isArray(cur)) {
                                    prev.push(...cur);
                                } else {
                                    prev.push(cur);
                                }

                                return prev;
                            }, []);
                    } else {
                        return (o as Record<string, unknown>)[prop];
                    }
                }
            }
        }

        function isIterable(iterableObject: unknown): boolean {
            if (!iterableObject) {
                return false;
            }

            return iterableObject instanceof Array || iterableObject instanceof Set;
        }
    }
}
