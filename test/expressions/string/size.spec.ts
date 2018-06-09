import {expectOclRuleValidatesToTrue} from '../../matcher'

describe('String->size', () => {
    it('should return the correct length of a given string', () => {
        let obj = {name: "Stephan"};
        const oclExpression = `context Object inv: self.name->size() = 7`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});