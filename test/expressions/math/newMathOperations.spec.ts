import { describe, it, expect, beforeEach } from 'vitest';
import { OclEngine } from '../../../lib';
import { expectOclRuleValidatesToTrue } from '../../matcher';

describe('Math Operations - New Features', () => {
    describe('Number.floor()', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should return floor of positive decimal', () => {
            const obj = { value: 3.7 };
            const expression = oclEngine.createQuery('self.value.floor()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(3);
        });

        it('should return floor of negative decimal', () => {
            const obj = { value: -3.7 };
            const expression = oclEngine.createQuery('self.value.floor()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(-4);
        });

        it('should return same value for integer', () => {
            const obj = { value: 5 };
            const expression = oclEngine.createQuery('self.value.floor()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(5);
        });

        it('should handle zero', () => {
            const obj = { value: 0.0 };
            const expression = oclEngine.createQuery('self.value.floor()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(0);
        });

        it('should handle small positive decimal', () => {
            const obj = { value: 0.1 };
            const expression = oclEngine.createQuery('self.value.floor()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(0);
        });

        it('should handle small negative decimal', () => {
            const obj = { value: -0.1 };
            const expression = oclEngine.createQuery('self.value.floor()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(-1);
        });

        it('should work with literal values', () => {
            const obj = {};
            const expression = oclEngine.createQuery('3.7.floor()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(3);
        });

        it('should work in invariant context', () => {
            const obj = { price: 19.99 };
            const oclExpression = 'context Object inv: self.price.floor() = 19';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with arithmetic expressions', () => {
            const obj = { a: 5, b: 2 };
            const expression = oclEngine.createQuery('(self.a / self.b).floor()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(2);
        });
    });

    describe('Number.ceil()', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should return ceiling of positive decimal', () => {
            const obj = { value: 3.2 };
            const expression = oclEngine.createQuery('self.value.ceil()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(4);
        });

        it('should return ceiling of negative decimal', () => {
            const obj = { value: -3.2 };
            const expression = oclEngine.createQuery('self.value.ceil()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(-3);
        });

        it('should return same value for integer', () => {
            const obj = { value: 5 };
            const expression = oclEngine.createQuery('self.value.ceil()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(5);
        });

        it('should handle zero', () => {
            const obj = { value: 0.0 };
            const expression = oclEngine.createQuery('self.value.ceil()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(0);
        });

        it('should handle small positive decimal', () => {
            const obj = { value: 0.1 };
            const expression = oclEngine.createQuery('self.value.ceil()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(1);
        });

        it('should handle small negative decimal', () => {
            const obj = { value: -0.1 };
            const expression = oclEngine.createQuery('self.value.ceil()');
            const result = oclEngine.evaluateQuery(obj, expression);
            // Math.ceil(-0.1) returns -0 in JavaScript, which is technically correct
            expect(result).toBe(-0);
        });

        it('should work with literal values', () => {
            const obj = {};
            const expression = oclEngine.createQuery('3.2.ceil()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(4);
        });

        it('should work in invariant context', () => {
            const obj = { price: 19.01 };
            const oclExpression = 'context Object inv: self.price.ceil() = 20';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with arithmetic expressions', () => {
            const obj = { a: 5, b: 2 };
            const expression = oclEngine.createQuery('(self.a / self.b).ceil()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(3);
        });
    });

    describe('Number.toString()', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should convert positive integer to string', () => {
            const obj = { value: 42 };
            const expression = oclEngine.createQuery('self.value.toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('42');
        });

        it('should convert negative integer to string', () => {
            const obj = { value: -5 };
            const expression = oclEngine.createQuery('self.value.toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('-5');
        });

        it('should convert zero to string', () => {
            const obj = { value: 0 };
            const expression = oclEngine.createQuery('self.value.toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('0');
        });

        it('should convert decimal to string', () => {
            const obj = { value: 3.14 };
            const expression = oclEngine.createQuery('self.value.toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('3.14');
        });

        it('should convert negative decimal to string', () => {
            const obj = { value: -2.5 };
            const expression = oclEngine.createQuery('self.value.toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('-2.5');
        });

        it('should work with literal values', () => {
            const obj = {};
            const expression = oclEngine.createQuery('100.toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('100');
        });

        it('should allow string operations on result', () => {
            const obj = { value: 42 };
            const expression = oclEngine.createQuery('self.value.toString().size()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(2);
        });

        it('should work in invariant context', () => {
            const obj = { id: 123 };
            const oclExpression = 'context Object inv: self.id.toString() = \'123\'';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should work with arithmetic result', () => {
            const obj = { a: 10, b: 5 };
            const expression = oclEngine.createQuery('(self.a + self.b).toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('15');
        });

        it('should concatenate with other strings', () => {
            const obj = { count: 5 };
            const expression = oclEngine.createQuery("'Count: '.concat(self.count.toString())");
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('Count: 5');
        });

        it('should handle very large numbers', () => {
            const obj = { value: 999999999 };
            const expression = oclEngine.createQuery('self.value.toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('999999999');
        });

        it('should handle very small decimals', () => {
            const obj = { value: 0.001 };
            const expression = oclEngine.createQuery('self.value.toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('0.001');
        });
    });

    describe('Combined math operations', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should chain floor and toString', () => {
            const obj = { value: 3.7 };
            const expression = oclEngine.createQuery('self.value.floor().toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('3');
        });

        it('should chain ceil and toString', () => {
            const obj = { value: 3.2 };
            const expression = oclEngine.createQuery('self.value.ceil().toString()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('4');
        });

        it('should use floor in comparison', () => {
            const obj = { value: 5.8 };
            const oclExpression = 'context Object inv: self.value.floor() < 6';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should use ceil in comparison', () => {
            const obj = { value: 5.2 };
            const oclExpression = 'context Object inv: self.value.ceil() > 5';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should combine floor and ceil', () => {
            const obj = { low: 2.3, high: 7.8 };
            const expression = oclEngine.createQuery('self.high.ceil() - self.low.floor()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(6); // 8 - 2
        });
    });
});
