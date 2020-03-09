import { InitExpression } from '../InitExpression';
import { DeriveExpression } from '../DeriveExpression';
import { Utils } from '../../Utils';
import { OclExecutionContext } from '../../OclExecutionContext';
import { DefExpression } from '../DefExpression';

import { ContextExpression } from './ContextExpression';

/**
 * A PropertyContextDefinition allows to initialize or derive a value for the targeted property.
 *
 * @oclExpression context Person::age (init|derive)
 */
export class PropertyContextExpression extends ContextExpression {
    private derived: any;
    private inits: any;
    private propertyName: any;

    constructor(targetType, rules) {
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

    evaluate(visitor: OclExecutionContext): any {
        super.evaluate(visitor);

        this.getInits().forEach(init => {
            visitor.getObjectToEvaluate()[this.getPropertyName()] = init.evaluate(visitor);
        });

        this.getDerived().forEach(derive => {
            visitor.getObjectToEvaluate()[this.getPropertyName()] = derive.evaluate(visitor);
        });

        return true;
    }

}
