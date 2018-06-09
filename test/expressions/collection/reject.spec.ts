import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../../matcher'

describe('Collection->reject ', () => {
    it('checks if there are no children older than 18 years old', () => {
        let obj = {
            children: [
                {age: 1},
                {age: 2},
                {age: 3}
            ]
        };

        let oclExpression = `context Object inv: self.children->reject(child | child.age < 18)->isEmpty()`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('checks if there are no children older than 18 years old', () => {
        let obj = {
            children: [
                {age: 1},
                {age: 2},
                {age: 30}
            ]
        };
        let oclExpression = `context Object inv: self.children->reject(child | child.age < 18)->size() = 0`;
        expectOclRuleValidatesToFalse(oclExpression, obj);
    });

    it('removes all elements from array that are odd', () => {
        let obj = {seq: [1, 3, 5, 8, 10]};
        let oclExpression = `context Object inv: self.seq->reject(a mod 2 = 0)->size() = 3`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});