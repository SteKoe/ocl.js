import { IteratorExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 */
export class ForAllExpression extends IteratorExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitIteratorExpression(this);
    }
}
