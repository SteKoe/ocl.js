import { expect } from "chai";
import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../matcher'

describe('not', () => {
    it('not true => false', () => {
        let oclExpression = `context Object inv notExpression: not true`;
        expectOclRuleValidatesToFalse(oclExpression);
    });

    it('not false => true', () => {
        let oclExpression = `context Object inv notExpression: not false`;
        expectOclRuleValidatesToTrue(oclExpression);
    });
});

