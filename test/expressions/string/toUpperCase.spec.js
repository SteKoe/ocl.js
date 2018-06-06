import { expect } from "chai";
import { expectOclRuleValidatesToTrue } from '../../matcher'

describe('String->toUpperCase', () => {
    it('should return string in upper case', () => {
        let obj = { name: "Stephan" };
        const oclExpression = `context Object inv: self.name->toUpperCase() = "STEPHAN"`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});