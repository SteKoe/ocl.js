import {expectOclRuleValidatesToTrue} from '../../matcher'

describe('String->concat', () => {
    it('should concat string with string', () => {
        let obj = {name: "Stephan"}
        const oclExpression = `context Object inv: self.name->concat(" Köninger") = "Stephan Köninger"`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should concat string with number', () => {
        let obj = {name: "ABC"}
        const oclExpression = `context Object inv: self.name->concat(123) = "ABC123"`;
        expectOclRuleValidatesToTrue(oclExpression, obj);

    });

    it('should concat number with string', () => {
        let obj = {name: 123};
        const oclExpression = `context Object inv: self.name->concat("456") = "123456"`;
        expectOclRuleValidatesToTrue(oclExpression, obj);

    });

    it('should concat number with number', () => {
        let obj = {name: 123};
        const oclExpression = `context Object inv: self.name->concat(456) = "123456"`;
        expectOclRuleValidatesToTrue(oclExpression, obj);

    });

    it('should concat string with string using PLUS operator', () => {
        let obj = {name: "Stephan"}
        const oclExpression = `context Object inv: self.name + " Köninger" = "Stephan Köninger"`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});