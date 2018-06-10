import { ContextExpression } from './ContextExpression';
import { InitExpression } from '../InitExpression';
import { DeriveExpression } from '../DeriveExpression';
import { Utils } from '../../Utils';
import { IOclVisitor } from '../../IOclVisitor';

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

    accept(visitor: IOclVisitor): boolean {
        return Utils.getClassName(visitor.getObjectToEvaluate()) === this.targetType;
    }

    visit(visitor: IOclVisitor): any {
        return visitor.visitPropertyContextExpression(this);
    }
}
