import { Expression } from './Expression';
import { Utils } from '../Utils';
import { OclVisitor } from '../OclVisitor';

export abstract class ContextExpression extends Expression {
    labels: Array<any> = [];
    targetType: string;

    accept(visitor: OclVisitor): boolean {
        if (visitor.getLabelsToExecute().length === 0 || this.labels.length === 0) {
            return true;
        }

        return Utils.intersect(this.labels, visitor.getLabelsToExecute()).length > 0;
    }
}
