'use strict';
import {expectOclRuleValidatesToTrue} from '../../matcher'

describe('String->toLowerCase', () => {
    it('should return string in lower case', () => {
        let obj = {name: "StEpHaN"};
        const oclExpression = `context Object inv: self.name->toLowerCase() = "stephan"`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});