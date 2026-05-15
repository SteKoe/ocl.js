import { expectOclRuleValidatesToTrue, expectOclRuleValidatesToFalse } from '../../matcher';
import { OclEngine } from '../../../lib';
import { expect } from 'vitest';

describe('Collection->excludes', () => {
    describe('with invariant expressions', () => {
        it('should return true when element does not exist in collection', () => {
            const obj = { seq: [1, 2, 3, 4, 5] };
            const oclExpression = 'context Object inv: self.seq->excludes(99)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false when element exists in collection', () => {
            const obj = { seq: [1, 2, 3, 4, 5] };
            const oclExpression = 'context Object inv: self.seq->excludes(3)';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should work with string collections', () => {
            const obj = { names: ['Alice', 'Bob', 'Charlie'] };
            const oclExpression = 'context Object inv: self.names->excludes(\'David\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false for string in collection', () => {
            const obj = { names: ['Alice', 'Bob', 'Charlie'] };
            const oclExpression = 'context Object inv: self.names->excludes(\'Bob\')';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should work with object collections', () => {
            const obj = {
                employees: [
                    { name: 'Alice', id: 1 },
                    { name: 'Bob', id: 2 },
                    { name: 'Charlie', id: 3 }
                ]
            };
            const oclExpression = 'context Object inv: self.employees->collect(name)->excludes(\'David\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return true for empty collection', () => {
            const obj = { seq: [] };
            const oclExpression = 'context Object inv: self.seq->excludes(1)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should handle null element check', () => {
            const obj = { seq: [1, 2, 3], target: null };
            const oclExpression = 'context Object inv: self.seq->excludes(self.target)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with boolean values', () => {
            const obj = { flags: [true, true, true] };
            const oclExpression = 'context Object inv: self.flags->excludes(false)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false when boolean value exists', () => {
            const obj = { flags: [true, false, true] };
            const oclExpression = 'context Object inv: self.flags->excludes(false)';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });
    });

    describe('with query expressions', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should return true when element does not exist', () => {
            const obj = { seq: [1, 2, 3, 4, 5] };
            const expression = oclEngine.createQuery('self.seq->excludes(99)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should return false when element exists', () => {
            const obj = { seq: [1, 2, 3, 4, 5] };
            const expression = oclEngine.createQuery('self.seq->excludes(3)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(false);
        });

        it('should work with negative numbers', () => {
            const obj = { seq: [1, 2, 3] };
            const expression = oclEngine.createQuery('self.seq->excludes(-1)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should work with decimal numbers', () => {
            const obj = { seq: [1.5, 2.3, 3.7] };
            const expression = oclEngine.createQuery('self.seq->excludes(4.2)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should return true for non-array source', () => {
            const expression = oclEngine.createQuery('self.name->excludes(\'a\')');
            const result = oclEngine.evaluateQuery({ name: 'test' }, expression);
            expect(result).toBe(true);
        });
    });

    describe('edge cases', () => {
        it('should handle collections with duplicate elements', () => {
            const obj = { seq: [1, 2, 2, 3, 3, 3] };
            const oclExpression = 'context Object inv: self.seq->excludes(99)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with single element collection', () => {
            const obj = { seq: [42] };
            const oclExpression = 'context Object inv: self.seq->excludes(99)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should handle zero as element', () => {
            const obj = { seq: [1, 2, 3] };
            const oclExpression = 'context Object inv: self.seq->excludes(0)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work in complex expressions', () => {
            const obj = { 
                seq1: [1, 2, 3],
                seq2: [4, 5, 6],
                value: 99
            };
            const oclExpression = 'context Object inv: self.seq1->excludes(self.value) and self.seq2->excludes(self.value)';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with logical negation of includes', () => {
            const obj = { seq: [1, 2, 3] };
            const oclExpression = 'context Object inv: self.seq->excludes(99) = (not self.seq->includes(99))';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });
    });
});
