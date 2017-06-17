import {OclParser} from './parser/oclParser';
import {Utils} from './utils';

export class OclEngine {
    static create() {
        return new OclEngine();
    }

    constructor() {
        this.oclExpressionsPerType = {};
    }

    addOclExpression(oclExpression) {
        const parsedExpression = OclParser.parse(oclExpression);
        this._addOclExpressionForType(parsedExpression.targetType, parsedExpression);
        return this;
    }

    getOclExpressionsForType(type) {
        return this.oclExpressionsPerType[type] || [];
    }

    _addOclExpressionForType(type, oclExpression) {
        const oclExpressions = this.getOclExpressionsForType(type);
        oclExpressions.push(oclExpression);
        this.oclExpressionsPerType[type] = oclExpressions;
    }

    evaluate(obj) {
        const type = Utils.getClassName(obj);
        const oclExpressionsForType = this.getOclExpressionsForType(type);
        oclExpressionsForType.forEach(e => e.evaluate(obj));

        var namesOfFailedInvs = oclExpressionsForType
            .filter(e => e.evaluationResult === false)
            .map(e => e.invs)
            .reduce((p, c) => p.concat(c), [])
            .filter(i => i.evaluationResult === false)
            .map(i => i.name || 'anonymous');

        const oclResult = new OclResult();
        oclResult.setResult(namesOfFailedInvs.length === 0);
        oclResult.setNamesOfFailedInvs(namesOfFailedInvs);
        return oclResult;
    }
}

class OclResult {
    setResult(result) {
        this.result = result;
    }

    getResult() {
        return this.result;
    }

    setNamesOfFailedInvs(names) {
        this.setNamesOfFailedInvs = names;
    }

    getNamesOfFailedInvs() {
        return this.setNamesOfFailedInvs;
    }
}