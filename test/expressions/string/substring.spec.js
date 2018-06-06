import { expect } from "chai";
import { OclParser } from "../../../lib/components/parser/OclParser";
import { expectOclRuleValidatesToTrue } from '../../matcher'

describe('String->substring', () => {
    it('should return substring specifing start and end', () => {
        let obj = { name: "Stephan" }
        const oclExpression = `context Object inv: self.name->substring(0,2) = "St"`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should return substring specifing only start', () => {
        let obj = { name: "Stephan" }
        const oclExpression = `context Object inv: self.name->substring(2) = "ephan"`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });


    it('should return whole string when omitting params', () => {
        let obj = { name: "Stephan" }
        const oclExpression = `context Object inv: self.name->substring() = "Stephan"`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});