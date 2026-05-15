import { InitExpression } from '../InitExpression';
import { DeriveExpression } from '../DeriveExpression';
import { Utils } from '../../Utils';
import { OclExecutionContext } from '../../OclExecutionContext';
import { DefExpression } from '../DefExpression';
import { LocalVariables } from '../../types';

import { ContextExpression } from './ContextExpression';

/**
 * A PropertyContextDefinition allows to initialize or derive a value for the targeted property.
 *
 * @oclExpression context Person::age (init|derive)
 */
export class PropertyContextExpression extends ContextExpression {
    private readonly derived: any;
    private readonly inits: any;
    private readonly propertyName: any;

    constructor(targetType: string, rules: Array<InitExpression | DeriveExpression> | InitExpression | DeriveExpression) {
        super();

        const split = targetType.split('::');
        this.targetType = split[0];
        this.propertyName = split[1];

        if (!(rules instanceof Array)) {
            rules = [rules];
        }

        this.inits = rules.filter(i => i instanceof InitExpression);
        this.derived = rules.filter(i => i instanceof DeriveExpression);
    }

    getInits(): Array<DefExpression> {
        return this.inits;
    }

    getDerived(): Array<DeriveExpression> {
        return this.derived;
    }

    getPropertyName(): string {
        return this.propertyName;
    }

    accept(visitor: OclExecutionContext): boolean {
        return Utils.getClassName(visitor.getObjectToEvaluate()) === this.targetType;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): any {
        super.evaluate(visitor);

        const obj = visitor.getObjectToEvaluate() as Record<string, unknown>;
        this.getInits().forEach(init => {
            obj[this.getPropertyName()] = init.evaluate(visitor);
        });

        this.getDerived().forEach(derive => {
            obj[this.getPropertyName()] = derive.evaluate(visitor);
        });

        return true;
    }

}
