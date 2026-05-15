import { LiteralExpression } from './LiteralExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { LocalVariables } from '../../types';

/**
 */
export class BooleanExpression extends LiteralExpression<boolean> {
    parseValue(value: any): boolean {
        return JSON.parse(value);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        return visitor.setEvaluatedValue(this, this.getValue()) as boolean;
    }
}
