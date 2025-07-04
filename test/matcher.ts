import {expect} from 'chai';
import {OclParser} from '../lib/components/parser/OclParser';
import {OclExecutionContext} from '../lib/components/OclExecutionContext';

export function expectOclRuleValidatesToTrue(oclExpression: string, obj?: any): void {
    const visitor = _parseAndEvaluate(oclExpression, obj);
    expect(visitor.getEvaluationResult(), oclExpression).to.be.true;
}

export function expectOclRuleValidatesToFalse(oclExpression: string, obj?: any): void {
    const visitor = _parseAndEvaluate(oclExpression, obj);
    expect(visitor.getEvaluationResult()).to.be.false;
}

// ===
function _parseAndEvaluate(oclExpression: string, obj?): OclExecutionContext {
    const visitor = new OclExecutionContext(obj || {});
    const ast = OclParser.parse(oclExpression);
    ast.evaluate(visitor);

    return visitor;
}
