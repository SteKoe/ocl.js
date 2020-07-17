import { LiteralExpression } from './LiteralExpression';

/**
 */
export class NumberExpression extends LiteralExpression<number> {
    parseValue(value): number {
        const val = typeof value === 'string' ? value.replace(/_/g, '') : value;
        if (!isNaN(+val)) {
            return +val;
        } else {
            throw new SyntaxError(`NumberExpression: '${value}' could not be parsed as Number!`);
        }
    }
}
