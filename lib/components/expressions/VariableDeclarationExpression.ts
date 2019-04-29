import { OclExecutionContext } from '../OclExecutionContext';
import { Expression } from './Expression';

/**
 * Resolve variables. Simple values are returned as is (e.g. self.age: number), collections are aggregated.
 */
export class VariableDeclarationExpression extends Expression {
    constructor(private variableName, private optionalDataType, private oclExpressionAsValue) {
        super();
    }

    getVariableName(): string {
        return this.variableName;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        return this.oclExpressionAsValue.evaluate(visitor, localVariables);
    }
}
