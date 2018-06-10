import { expect } from 'chai';
import { OclParser } from '../lib/components/parser/OclParser';
import { OclVisitorImpl } from '../lib/components/OclVisitorImpl';
import { IOclVisitor } from '../lib/components/IOclVisitor';

export function expectOclRuleValidatesToTrue(oclExpression, obj?): void {
    const visitor = _parseAndEvaluate(oclExpression, obj);
    expect(visitor.getEvaluationResult()).to.be.true;
}

export function expectOclRuleValidatesToFalse(oclExpression, obj?): void {
    const visitor = _parseAndEvaluate(oclExpression, obj);
    expect(visitor.getEvaluationResult()).to.be.false;
}

// ===
function _parseAndEvaluate(oclExpression, obj?): IOclVisitor {
    const visitor = new OclVisitorImpl(obj || {});
    const ast = OclParser.parse(oclExpression);
    ast.visit(visitor);

    return visitor;
}
