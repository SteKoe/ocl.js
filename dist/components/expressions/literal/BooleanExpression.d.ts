import { LiteralExpression } from './LiteralExpression';
/**
 */
export declare class BooleanExpression extends LiteralExpression<boolean> {
    parseValue(value: any): boolean;
}
