import { LiteralExpression } from './LiteralExpression';

/**
 */
export class StringExpression extends LiteralExpression<string> {
    parseValue(value): string {
        return value.replace(/"|'/g, '');
    }
}
