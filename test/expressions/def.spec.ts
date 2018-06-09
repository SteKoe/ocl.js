import {expectOclRuleValidatesToTrue} from '../matcher'

describe('def', () => {
    it('should set simple string variable', () => {
        const obj = {};
        const oclExpression = `
            context Object
                def: variable = "test"
                inv: self.variable = "test"
        `;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should assign ->size() call', () => {
        const mother = {
            children: [1, 2]
        };
        const oclExpression = `
            context Object
                def: childCount = self.children->size()
                inv: self.childCount = 2
        `;
        expectOclRuleValidatesToTrue(oclExpression, mother);
    });

    it('should process union', () => {
        const obj = {
            a: [1, 2],
            b: [3, 4]
        };
        const oclExpression = `
            context Object
                def: concat = self.a->union(self.b)
                inv: self.concat->size() = 4
        `;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should set simple string variable with data type', () => {
        const obj = {};
        const oclExpression = `
            context Object
                def: variable : String = "test"
                inv: self.variable = "test"
        `;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
