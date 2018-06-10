import { LiteralExpression } from './LiteralExpression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 */
export class StringExpression extends LiteralExpression<string> {
    parseValue(value): string {
        return value.replace(/^\"|"$/g, '');
    }
}
