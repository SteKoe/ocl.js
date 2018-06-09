import {expectOclRuleValidatesToTrue} from '../../matcher'

describe('String->indexOf', () => {
    it('should find index positions according to the ocl specification', () => {
        let obj = {name: "Stephan"};

        let oclExpression = `context Object inv: self.name->indexOf("S") = 1`;
        expectOclRuleValidatesToTrue(oclExpression, obj);

        oclExpression = `context Object inv: self.name->indexOf("K") = 0`;
        expectOclRuleValidatesToTrue(oclExpression, obj);

        oclExpression = `context Object inv: self.name->indexOf("") = 0`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});