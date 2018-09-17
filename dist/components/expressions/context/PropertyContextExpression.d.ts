import { ContextExpression } from './ContextExpression';
import { DeriveExpression } from '../DeriveExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { DefExpression } from '../DefExpression';
/**
 * A PropertyContextDefinition allows to initialize or derive a value for the targeted property.
 *
 * @oclExpression context Person::age (init|derive)
 */
export declare class PropertyContextExpression extends ContextExpression {
    private derived;
    private inits;
    private propertyName;
    constructor(targetType: any, rules: any);
    getInits(): Array<DefExpression>;
    getDerived(): Array<DeriveExpression>;
    getPropertyName(): string;
    accept(visitor: OclExecutionContext): boolean;
    evaluate(visitor: OclExecutionContext): any;
}
