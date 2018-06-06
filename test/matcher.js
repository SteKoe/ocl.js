import { expect } from "chai";
import { OclParser } from '../lib/components/parser/OclParser'
import { OclRuleVisitor } from '../lib/components/OclRuleVisitor'

export function expectOclRuleValidatesToTrue(oclExpression, obj) {
    const visitor = _parseAndEvaluate(oclExpression, obj)
    expect(visitor.evaluationResult).to.be.true;
}

export function expectOclRuleValidatesToFalse(oclExpression, obj) {
    const visitor = _parseAndEvaluate(oclExpression, obj)
    expect(visitor.evaluationResult).to.be.false;
}

// ===
function _parseAndEvaluate(oclExpression, obj) {
    const visitor = new OclRuleVisitor(obj || {});
    let ast = OclParser.parse(oclExpression);
    ast.visit(visitor);
    return visitor
}