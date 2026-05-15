import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';

import { Expression } from './Expression';

/**
 * Represents a variable declaration with an optional type and value expression.
 */
export class VariableDeclarationExpression extends Expression {
    constructor(
        private variableName: string,
        private optionalDataType: string | undefined,
        private oclExpressionAsValue: Expression
    ) {
        super();
    }

    getVariableName(): string {
        return this.variableName;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        return this.oclExpressionAsValue.evaluate(visitor, localVariables);
    }
}
