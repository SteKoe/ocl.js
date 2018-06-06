import { expect } from 'chai'
import { expectOclRuleValidatesToTrue } from '../../matcher'

describe('Collection->collect', () => {
    it('sums up the age using collect', () => {
        let obj = {
            children: [
                { age: 1 },
                { age: 2 },
                { age: 3 }
            ]
        };
        let oclExpression = `context Object inv: self.children->collect(child | child.age)->sum() = 6`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('compares the result of collect->sum and ->sum', () => {
        let obj = {
            children: [
                { age: 10 },
                { age: 20 },
                { age: 30 }
            ]
        };
        let oclExpression = `context Object inv: self.children->collect(child | child.age)->sum() = self.children.age->sum()`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});