import {expectOclRuleValidatesToTrue} from '../../matcher';

describe('toInteger', () => {
    it('parses a string to integer', () => {
        const obj = {};
        const oclExpression = 'context Object inv: "3.414".toInteger() = 3';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
