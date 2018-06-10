import { LiteralExpression } from './LiteralExpression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 */
export class BooleanExpression extends LiteralExpression<boolean> {
    parseValue(value): boolean {
        return JSON.parse(value);
    }
}
