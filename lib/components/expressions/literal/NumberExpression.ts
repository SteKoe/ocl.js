import { LiteralExpression } from './LiteralExpression';

/**
 */
export class NumberExpression extends LiteralExpression<number> {
    parseValue(value): number {
        if (!isNaN(+value)) {
            return +value;
        } else {
            throw new SyntaxError(`NumberExpression: '${value}' is not a Number!`);
        }
    }
}
