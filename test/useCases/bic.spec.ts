import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../matcher';

class AstSequenceFlow {
    source: object;
    target: object;
}

describe('Example', () => {
    describe('BIC', () => {
        it('parent is same', () => {
            const ast = new AstSequenceFlow();
            ast.source = {_parent: {_id: 1}};
            ast.target = {_parent: {_id: 1}};

            const oclExpression = 'context AST_SEQUENCE_FLOW inv: self.source._parent._id = self.target._parent._id';
            expectOclRuleValidatesToTrue(oclExpression, ast);
        });

        it('parent is not same', () => {
            const ast = new AstSequenceFlow();
            ast.source = {_parent: {_id: 1}};
            ast.target = {_parent: {_id: 2}};

            const oclExpression = 'context AST_SEQUENCE_FLOW inv: self.source._parent._id = self.target._parent._id';
            expectOclRuleValidatesToFalse(oclExpression, ast);
        });
    });
});
