import { LiteralExpression } from './LiteralExpression';

/**
 */
export class BooleanExpression extends LiteralExpression<boolean> {
    parseValue(value: any): boolean {
        return JSON.parse(value);
    }
}
