import OclParser from './oclParser';
import Utils from './utils';

export default class OclEngine {
    constructor() {
        this.oclExpressionsPerType = {};
    }

    addOclExpression(oclExpression) {
        const parsedExpression = OclParser.parse(oclExpression);
        this.addOclExpressionForType(parsedExpression.targetType, parsedExpression);
    }

    getOclExpressionsForType(type) {
        return this.oclExpressionsPerType[type] || [];
    }

    addOclExpressionForType(type, oclExpression) {
        const oclExpressions = this.getOclExpressionsForType(type);
        oclExpressions.push(oclExpression);
        this.oclExpressionsPerType[type] = oclExpressions;
    }

    evaluate(obj) {
        const type = Utils.getClassName(obj);
        const oclExpressionsForType = this.getOclExpressionsForType(type);
        return oclExpressionsForType.every(e => e.evaluate(obj))
    }
}