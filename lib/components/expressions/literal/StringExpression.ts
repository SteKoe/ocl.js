import { LiteralExpression } from './LiteralExpression';

/**
 */
export class StringExpression extends LiteralExpression<string> {
    parseValue(value: any): string {
        return value.replaceAll(/["']/g, '');
    }
}
