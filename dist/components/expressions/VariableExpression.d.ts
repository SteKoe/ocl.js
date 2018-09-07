import { SourceBasedExpression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 * Resolve variables. Simple values are returned as is (e.g. self.age: number), collections are aggregated.
 */
export declare class VariableExpression extends SourceBasedExpression {
    private variable;
    constructor(source: any);
    getVariable(): string;
    evaluate(visitor: OclExecutionContext): any;
}
