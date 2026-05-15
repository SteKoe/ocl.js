import { LiteralExpression } from './LiteralExpression';
import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';

/**
 */
export class NumberExpression extends LiteralExpression<number> {
    parseValue(value: any): number {
        const val = typeof value === 'string' ? value.replaceAll('_', '') : value;
        if (Number.isNaN(+val)) {
            throw new SyntaxError(`NumberExpression: '${value}' could not be parsed as Number!`);
        } else {
            return +val;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): number {
        return visitor.setEvaluatedValue(this, this.getValue()) as number;
    }
}
