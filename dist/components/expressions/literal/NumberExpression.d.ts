import { LiteralExpression } from './LiteralExpression';
/**
 */
export declare class NumberExpression extends LiteralExpression<number> {
    parseValue(value: any): number;
}
