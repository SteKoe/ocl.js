import { describe, it, expect, beforeEach } from 'vitest';
import { OclEngine } from '../../lib';
import { expectOclRuleValidatesToTrue, expectOclRuleValidatesToFalse } from '../matcher';

/**
 * Tests for AtDispatchExpression - runtime dispatcher for at() operation
 * that resolves ambiguity between String.at() and Collection.at()
 */
describe('AtDispatchExpression', () => {
    let oclEngine: OclEngine;

    beforeEach(() => {
        oclEngine = OclEngine.create();
    });

    describe('String dispatch', () => {
        it('should delegate to StringAtExpression for string literals', () => {
            const obj = {};
            const expression = oclEngine.createQuery("'hello'.at(1)");
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('h');
        });

        it('should delegate to StringAtExpression for string properties', () => {
            const obj = { name: 'world' };
            const expression = oclEngine.createQuery('self.name.at(3)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('r');
        });

        it('should handle string concatenation result', () => {
            const obj = { first: 'hello', last: 'world' };
            const expression = oclEngine.createQuery("(self.first.concat(' ').concat(self.last)).at(7)");
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('w');
        });

        it('should handle substring result', () => {
            const obj = { text: 'hello world' };
            // substring(1, 5) returns 'ello', .at(2) returns 'l' (second character)
            const expression = oclEngine.createQuery('self.text.substring(1, 5).at(2)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('l');
        });

        it('should return empty string for out of bounds on string', () => {
            const obj = { name: 'hi' };
            const expression = oclEngine.createQuery('self.name.at(10)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('');
        });

        it('should return empty string for zero index on string', () => {
            const obj = { name: 'test' };
            const expression = oclEngine.createQuery('self.name.at(0)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('');
        });

        it('should return empty string for negative index on string', () => {
            const obj = { name: 'test' };
            const expression = oclEngine.createQuery('self.name.at(-1)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('');
        });
    });

    describe('Collection dispatch', () => {
        it('should delegate to Collection.at() for arrays', () => {
            const obj = { items: ['a', 'b', 'c'] };
            const expression = oclEngine.createQuery('self.items->at(2)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('b');
        });

        it('should work with collect result', () => {
            const obj = { 
                people: [
                    { name: 'Alice' },
                    { name: 'Bob' },
                    { name: 'Charlie' }
                ]
            };
            const expression = oclEngine.createQuery('self.people->collect(name)->at(3)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('Charlie');
        });

        it('should work with select result', () => {
            const obj = { numbers: [1, 2, 3, 4, 5] };
            const expression = oclEngine.createQuery('self.numbers->select(n | n > 2)->at(2)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(4);
        });

        it('should return undefined for out of bounds on collection', () => {
            const obj = { items: ['a', 'b'] };
            const expression = oclEngine.createQuery('self.items->at(10)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBeUndefined();
        });

        it('should return undefined for zero index on collection', () => {
            const obj = { items: ['a', 'b', 'c'] };
            const expression = oclEngine.createQuery('self.items->at(0)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBeUndefined();
        });

        it('should return undefined for negative index on collection', () => {
            const obj = { items: ['a', 'b', 'c'] };
            const expression = oclEngine.createQuery('self.items->at(-1)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBeUndefined();
        });
    });

    describe('Mixed scenarios', () => {
        it('should handle array of strings with chained at() calls', () => {
            const obj = { words: ['hello', 'world', 'test'] };
            // Get the second word ('world'), then get its 3rd character ('r')
            const expression = oclEngine.createQuery('self.words->at(2).at(3)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('r');
        });

        it('should work in invariant context with strings', () => {
            const obj = { code: 'ABC123' };
            const oclExpression = 'context Object inv: self.code.at(1) = \'A\'';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work in invariant context with collections', () => {
            const obj = { priorities: [1, 2, 3] };
            const oclExpression = 'context Object inv: self.priorities->at(1) = 1';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should handle accessing collection element properties', () => {
            const obj = {
                users: [
                    { name: 'Alice' },
                    { name: 'Bob' }
                ]
            };
            // Get first user object
            const expression = oclEngine.createQuery('self.users->at(1)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toEqual({ name: 'Alice' });
            expect(result.name).toBe('Alice');
        });
    });

    describe('Edge cases', () => {
        it('should handle empty string', () => {
            const obj = { value: '' };
            const expression = oclEngine.createQuery('self.value.at(1)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('');
        });

        it('should handle empty collection', () => {
            const obj = { items: [] };
            const expression = oclEngine.createQuery('self.items->at(1)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBeUndefined();
        });

        it('should handle single character string', () => {
            const obj = { char: 'x' };
            const expression = oclEngine.createQuery('self.char.at(1)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('x');
        });

        it('should handle single element collection', () => {
            const obj = { items: ['only'] };
            const expression = oclEngine.createQuery('self.items->at(1)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('only');
        });

        it('should handle numeric collection', () => {
            const obj = { numbers: [10, 20, 30] };
            const expression = oclEngine.createQuery('self.numbers->at(2)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(20);
        });

        it('should handle boolean collection', () => {
            const obj = { flags: [true, false, true] };
            const expression = oclEngine.createQuery('self.flags->at(2)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(false);
        });

        it('should handle nested collections', () => {
            const obj = { matrix: [[1, 2], [3, 4], [5, 6]] };
            const expression = oclEngine.createQuery('self.matrix->at(2)->at(1)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(3);
        });
    });
});
