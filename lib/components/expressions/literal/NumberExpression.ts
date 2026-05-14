import { LiteralExpression } from './LiteralExpression';

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
}
