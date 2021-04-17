import { DeriveExpression } from '../DeriveExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { DefExpression } from '../DefExpression';
import { ContextExpression } from './ContextExpression';
/**
 * A PropertyContextDefinition allows to initialize or derive a value for the targeted property.
 *
 * @oclExpression context Person::age (init|derive)
 */
export declare class PropertyContextExpression extends ContextExpression {
    private readonly derived;
    private readonly inits;
    private readonly propertyName;
    constructor(targetType: any, rules: any);
    getInits(): Array<DefExpression>;
    getDerived(): Array<DeriveExpression>;
    getPropertyName(): string;
    accept(visitor: OclExecutionContext): boolean;
    evaluate(visitor: OclExecutionContext): any;
}
