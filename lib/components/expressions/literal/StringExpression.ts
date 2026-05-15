import { LiteralExpression } from './LiteralExpression';
import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';

/**
 */
export class StringExpression extends LiteralExpression<string> {
    parseValue(value: any): string {
        return value.replaceAll(/["']/g, '');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string {
        return visitor.setEvaluatedValue(this, this.getValue()) as string;
    }
}
