import { expectOclRuleValidatesToTrue } from '../../matcher';

describe('String.toUpperCase', () => {
    it('should return string in upper case', () => {
        const obj = {name: 'Stephan'};
        const oclExpression = 'context Object inv: self.name.toUpperCase() = "STEPHAN"';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
