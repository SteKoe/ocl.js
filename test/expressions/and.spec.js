import { expect } from "chai";
import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../matcher'

describe('and', () => {
    it('true and true', () => {
        let oclExpression = `context Object inv: true and true`;
        expectOclRuleValidatesToTrue(oclExpression)
    });

    it('true and false', () => {
        let oclExpression = `context Object inv: true and false`;
        expectOclRuleValidatesToFalse(oclExpression)
    });

    it('false and true', () => {
        let oclExpression = `context Object inv: false and true`;
        expectOclRuleValidatesToFalse(oclExpression)
    });

    it('false and false', () => {
        let oclExpression = `context Object inv: false and false`;
        expectOclRuleValidatesToFalse(oclExpression)
    });
});

