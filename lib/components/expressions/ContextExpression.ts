import { Expression } from './Expression';
import { Utils } from '../Utils';

export abstract class ContextExpression extends Expression {
    labels: Array<any> = [];
    targetType: string;

    accept(visitor): boolean {
        if (visitor.labelsToExecute.length === 0 || this.labels.length === 0) {
            return true;
        }

        return Utils.intersect(this.labels, visitor.labelsToExecute).length > 0;
    }
}
