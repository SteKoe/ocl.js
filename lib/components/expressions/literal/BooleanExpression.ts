import {LiteralExpression} from './LiteralExpression';

/**
 */
export class BooleanExpression extends LiteralExpression<boolean> {
    parseValue(value): boolean {
        return JSON.parse(value);
    }
}
