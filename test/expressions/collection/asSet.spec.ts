import { expectOclRuleValidatesToTrue } from '../../matcher';
import {OclParser} from "../../../lib/components/parser/OclParser";

describe('Collection->asSet', () => {
    it('should return a set', () => {
        const obj = {seq: [1, 2, 2, 3, 3, 3]};
        const oclExpression = 'context Object inv: self.seq->asSet()->size() = 3';
        let packageDeclaration = OclParser.parse(oclExpression);
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
