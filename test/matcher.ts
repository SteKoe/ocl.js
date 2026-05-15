import {expect} from 'vitest';
import {OclParser} from '../lib/components/parser/OclParser';
import {OclExecutionContext} from '../lib/components/OclExecutionContext';

export function expectOclRuleValidatesToTrue(oclExpression: string, obj?: any): void {
    const visitor = _parseAndEvaluate(oclExpression, obj);
    expect(visitor.getEvaluationResult(), oclExpression).toBe(true);
}

export function expectOclRuleValidatesToFalse(oclExpression: string, obj?: any): void {
    const oclExecutionContext = _parseAndEvaluate(oclExpression, obj);
    expect(oclExecutionContext.getEvaluationResult()).toBe(false);
}

// ===
function _parseAndEvaluate(oclExpression: string, obj?): OclExecutionContext {
    const visitor = new OclExecutionContext(obj || {});
    const ast = OclParser.parse(oclExpression);
    ast.evaluate(visitor);

    return visitor;
}
