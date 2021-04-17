import { OclExecutionContext } from '../OclExecutionContext';
import { SourceBasedExpression } from './Expression';
/**
 * Resolve variables. Simple values are returned as is (e.g. self.age: number), collections are aggregated.
 */
export declare class VariableExpression extends SourceBasedExpression {
    variable: string;
    constructor(source: any);
    getVariable(): string;
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
