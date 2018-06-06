import { expect } from "chai";
import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../matcher'

class AST_SEQUENCE_FLOW {
}

describe('Example', () => {
    describe('BIC', () => {
        it('parent is same', () => {
            let ast = new AST_SEQUENCE_FLOW();
            ast.source = { _parent: { _id: 1 } };
            ast.target = { _parent: { _id: 1 } };

            const oclExpression = `context AST_SEQUENCE_FLOW inv: self.source._parent._id = self.target._parent._id`;
            expectOclRuleValidatesToTrue(oclExpression, ast);
        });

        it('parent is not same', () => {
            let ast = new AST_SEQUENCE_FLOW();
            ast.source = { _parent: { _id: 1 } };
            ast.target = { _parent: { _id: 2 } };

            const oclExpression = `context AST_SEQUENCE_FLOW inv: self.source._parent._id = self.target._parent._id`;
            expectOclRuleValidatesToFalse(oclExpression, ast);
        });
    });
});

