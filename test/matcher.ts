import {expect} from "chai";
import {OclParser} from '../lib/components/parser/OclParser'
import {OclVisitorImpl} from '../lib/components/OclVisitorImpl'

export function expectOclRuleValidatesToTrue(oclExpression, obj = undefined) {
    const visitor = _parseAndEvaluate(oclExpression, obj);
    expect(visitor.evaluationResult).to.be.true;
}

export function expectOclRuleValidatesToFalse(oclExpression, obj = undefined) {
    const visitor = _parseAndEvaluate(oclExpression, obj);
    expect(visitor.evaluationResult).to.be.false;
}

// ===
function _parseAndEvaluate(oclExpression, obj = undefined) {
    const visitor = new OclVisitorImpl(obj || {});
    let ast = OclParser.parse(oclExpression);
    ast.visit(visitor);
    return visitor
}