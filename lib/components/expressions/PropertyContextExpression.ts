import { ContextExpression } from './ContextExpression';
import { InitExpression } from './InitExpression';
import { DeriveExpression } from './DeriveExpression';
import { Utils } from '../Utils';
import { OclVisitor } from '../OclVisitor';

/**
 */
export class PropertyContextExpression extends ContextExpression {
    propertyName: any;
    inits: any;
    derived: any;

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

    accept(visitor: OclVisitor): boolean {
        return Utils.getClassName(visitor.getObjectToEvaluate()) === this.targetType;
    }

    visit(visitor: OclVisitor): any {
        return visitor.visitPropertyContextExpression(this);
    }
}
