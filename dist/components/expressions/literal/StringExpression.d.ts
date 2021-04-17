import { LiteralExpression } from './LiteralExpression';
/**
 */
export declare class StringExpression extends LiteralExpression<string> {
    parseValue(value: any): string;
}
