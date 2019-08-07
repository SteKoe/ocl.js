import { InvariantExpression } from '../InvariantExpression';
import { DefExpression } from '../DefExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { ContextExpression } from './ContextExpression';
/**
 * Define invariants and definitions on a given types
 *
 * @oclExpression context <Type> (inv|def)
 */
export declare class ClassifierContextExpression extends ContextExpression {
    private invs;
    private defs;
    constructor(targetType: any, rules: Array<any>);
    getInvs(): Array<InvariantExpression>;
    getDefs(): Array<DefExpression>;
    accept(visitor: OclExecutionContext): boolean;
    evaluate(visitor: OclExecutionContext): any;
}
