import {expectOclRuleValidatesToTrue} from '../../matcher';

describe('String.concat', () => {
    it('should concat string with string', () => {
        const obj = {name: 'Stephan'};
        const oclExpression = 'context Object inv: self.name.concat(" Köninger") = "Stephan Köninger"';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should concat string with number', () => {
        const obj = {name: 'ABC'};
        const oclExpression = 'context Object inv: self.name.concat(123) = "ABC123"';
        expectOclRuleValidatesToTrue(oclExpression, obj);

    });

    it('should concat number with string', () => {
        const obj = {name: 123};
        const oclExpression = 'context Object inv: self.name.concat("456") = "123456"';
        expectOclRuleValidatesToTrue(oclExpression, obj);

    });

    it('should concat number with number', () => {
        const obj = {name: 123};
        const oclExpression = 'context Object inv: self.name.concat(456) = "123456"';
        expectOclRuleValidatesToTrue(oclExpression, obj);

    });

    it('should concat string with string using PLUS operator', () => {
        const obj = {name: 'Stephan'};
        const oclExpression = 'context Object inv: self.name + " Köninger" = "Stephan Köninger"';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
