import { expectOclRuleValidatesToTrue, expectOclRuleValidatesToFalse } from '../../matcher';
import { OclEngine } from '../../../lib';
import { expect } from 'vitest';

describe('Collection->excludesAll', () => {
    describe('with invariant expressions', () => {
        it('should return true when no elements from collection exist in source', () => {
            const obj = {
                seq: [1, 2, 3],
                subset: [4, 5, 6]
            };
            const oclExpression = 'context Object inv: self.seq->excludesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false when some elements exist', () => {
            const obj = {
                seq: [1, 2, 3, 4, 5],
                subset: [2, 3, 99]
            };
            const oclExpression = 'context Object inv: self.seq->excludesAll(self.subset)';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should return true for empty subset', () => {
            const obj = {
                seq: [1, 2, 3],
                subset: []
            };
            const oclExpression = 'context Object inv: self.seq->excludesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return true when source is empty', () => {
            const obj = {
                seq: [],
                subset: [1, 2]
            };
            const oclExpression = 'context Object inv: self.seq->excludesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with string collections', () => {
            const obj = {
                names: ['Alice', 'Bob', 'Charlie'],
                excluded: ['David', 'Eve']
            };
            const oclExpression = 'context Object inv: self.names->excludesAll(self.excluded)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false for string subset with one common element', () => {
            const obj = {
                names: ['Alice', 'Bob', 'Charlie'],
                subset: ['Bob', 'David']
            };
            const oclExpression = 'context Object inv: self.names->excludesAll(self.subset)';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should return false when all elements match', () => {
            const obj = {
                seq: [1, 2, 3],
                subset: [1, 2, 3]
            };
            const oclExpression = 'context Object inv: self.seq->excludesAll(self.subset)';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should handle collections with duplicate elements in source', () => {
            const obj = {
                seq: [1, 2, 2, 3, 3, 3],
                subset: [4, 5]
            };
            const oclExpression = 'context Object inv: self.seq->excludesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should handle collections with duplicate elements in subset', () => {
            const obj = {
                seq: [1, 2, 3],
                subset: [4, 4, 5, 5]
            };
            const oclExpression = 'context Object inv: self.seq->excludesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with nested property access', () => {
            const obj = {
                employee: { name: 'Alice', skills: ['Java', 'Python', 'JavaScript'] },
                forbiddenSkills: ['PHP', 'COBOL']
            };
            const oclExpression = 'context Object inv: self.employee.skills->excludesAll(self.forbiddenSkills)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false when any forbidden skill exists', () => {
            const obj = {
                employee: { name: 'Alice', skills: ['Java', 'Python', 'PHP'] },
                forbiddenSkills: ['PHP', 'COBOL']
            };
            const oclExpression = 'context Object inv: self.employee.skills->excludesAll(self.forbiddenSkills)';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });
    });

    describe('with query expressions', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should return true when no elements exist', () => {
            const obj = {
                source: [1, 2, 3],
                subset: [4, 5, 6]
            };
            const expression = oclEngine.createQuery('self.source->excludesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should return false when some elements exist', () => {
            const obj = {
                source: [1, 2, 3, 4],
                subset: [3, 4, 5]
            };
            const expression = oclEngine.createQuery('self.source->excludesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(false);
        });

        it('should return true for single element not in collection', () => {
            const obj = {
                source: [1, 2, 3],
                subset: [99]
            };
            const expression = oclEngine.createQuery('self.source->excludesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should work with negative numbers', () => {
            const obj = {
                source: [1, 2, 3],
                subset: [-1, -2, -3]
            };
            const expression = oclEngine.createQuery('self.source->excludesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should work with decimal numbers', () => {
            const obj = {
                source: [1.1, 2.2, 3.3],
                subset: [4.4, 5.5]
            };
            const expression = oclEngine.createQuery('self.source->excludesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should return true for non-array source', () => {
            const obj = {
                source: 'not an array',
                subset: [1, 2]
            };
            const expression = oclEngine.createQuery('self.source->excludesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should return true for non-array subset', () => {
            const obj = {
                source: [1, 2, 3],
                subset: 'not an array'
            };
            const expression = oclEngine.createQuery('self.source->excludesAll(self.subset)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });
    });

    describe('edge cases', () => {
        it('should handle null values in collections', () => {
            const obj = {
                seq: [1, 2, 3],
                subset: [null, undefined]
            };
            const oclExpression = 'context Object inv: self.seq->excludesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with boolean values', () => {
            const obj = {
                flags: [true],
                subset: [false]
            };
            const oclExpression = 'context Object inv: self.flags->excludesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should handle zero in collections', () => {
            const obj = {
                seq: [1, 2, 3],
                subset: [0]
            };
            const oclExpression = 'context Object inv: self.seq->excludesAll(self.subset)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work in complex boolean expressions', () => {
            const obj = {
                seq1: [1, 2, 3],
                seq2: [4, 5, 6],
                seq3: [7, 8, 9]
            };
            const oclExpression = 'context Object inv: self.seq1->excludesAll(self.seq2) and self.seq2->excludesAll(self.seq3)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with filtered collections', () => {
            const obj = {
                numbers: [1, 2, 3, 4, 5, 6],
                oddNumbers: [1, 3, 5]
            };
            const oclExpression = 'context Object inv: self.numbers->select(n | n mod 2 = 0)->excludesAll(self.oddNumbers)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should support collect operations', () => {
            const obj = {
                employees: [
                    { name: 'Alice', age: 30 },
                    { name: 'Bob', age: 25 },
                    { name: 'Charlie', age: 35 }
                ],
                forbiddenAges: [40, 50, 60]
            };
            const oclExpression = 'context Object inv: self.employees->collect(age)->excludesAll(self.forbiddenAges)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should be inverse of includesAll for disjoint sets', () => {
            const obj = {
                seq1: [1, 2, 3],
                seq2: [4, 5, 6]
            };
            const oclExpression = 'context Object inv: self.seq1->excludesAll(self.seq2) = (not self.seq1->includesAll(self.seq2))';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });
    });
});
