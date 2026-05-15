import { expectOclRuleValidatesToTrue, expectOclRuleValidatesToFalse } from '../../matcher';
import { OclEngine } from '../../../lib';
import { expect } from 'vitest';

describe('String Operations - New Features', () => {
    describe('String.characters()', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should split string into array of characters', () => {
            const obj = { name: 'hello' };
            const expression = oclEngine.createQuery('self.name.characters()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toEqual(['h', 'e', 'l', 'l', 'o']);
        });

        it('should handle empty string', () => {
            const obj = { name: '' };
            const expression = oclEngine.createQuery('self.name.characters()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toEqual([]);
        });

        it('should handle single character', () => {
            const obj = { name: 'a' };
            const expression = oclEngine.createQuery('self.name.characters()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toEqual(['a']);
        });

        it('should handle special characters', () => {
            const obj = { name: '!@#' };
            const expression = oclEngine.createQuery('self.name.characters()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toEqual(['!', '@', '#']);
        });
    });

    describe('String.equalsIgnoreCase()', () => {
        it('should return true for same strings with different case', () => {
            const obj = { name: 'Hello' };
            const oclExpression = 'context Object inv: self.name.equalsIgnoreCase(\'hello\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false for different strings', () => {
            const obj = { name: 'Hello' };
            const oclExpression = 'context Object inv: self.name.equalsIgnoreCase(\'world\')';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should handle uppercase comparison', () => {
            const obj = { name: 'HELLO' };
            const oclExpression = 'context Object inv: self.name.equalsIgnoreCase(\'hello\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should handle mixed case', () => {
            const obj = { name: 'HeLLo WoRLd' };
            const oclExpression = 'context Object inv: self.name.equalsIgnoreCase(\'hello world\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });
    });

    describe('String.at()', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should return character at 1-based index', () => {
            const obj = { name: 'hello' };
            const expression = oclEngine.createQuery('self.name.at(1)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('h');
        });

        it('should return second character', () => {
            const obj = { name: 'hello' };
            const expression = oclEngine.createQuery('self.name.at(2)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('e');
        });

        it('should return last character', () => {
            const obj = { name: 'hello' };
            const expression = oclEngine.createQuery('self.name.at(5)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('o');
        });

        it('should return empty string for out of bounds index', () => {
            const obj = { name: 'hello' };
            const expression = oclEngine.createQuery('self.name.at(10)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('');
        });

        it('should return empty string for zero index', () => {
            const obj = { name: 'hello' };
            const expression = oclEngine.createQuery('self.name.at(0)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('');
        });

        it('should work with invariant expressions', () => {
            const obj = { name: 'test' };
            const oclExpression = 'context Object inv: self.name.at(1) = \'t\'';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should still work for collections', () => {
            const obj = { items: ['a', 'b', 'c'] };
            const expression = oclEngine.createQuery('self.items->at(2)');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('b');
        });
    });

    describe('String.toBoolean()', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should convert "true" to boolean true', () => {
            const obj = { value: 'true' };
            const expression = oclEngine.createQuery('self.value.toBoolean()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should convert "false" to boolean false', () => {
            const obj = { value: 'false' };
            const expression = oclEngine.createQuery('self.value.toBoolean()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(false);
        });

        it('should handle uppercase TRUE', () => {
            const obj = { value: 'TRUE' };
            const expression = oclEngine.createQuery('self.value.toBoolean()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should handle mixed case False', () => {
            const obj = { value: 'False' };
            const expression = oclEngine.createQuery('self.value.toBoolean()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(false);
        });

        it('should handle whitespace', () => {
            const obj = { value: '  true  ' };
            const expression = oclEngine.createQuery('self.value.toBoolean()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(true);
        });

        it('should return false for invalid strings', () => {
            const obj = { value: 'invalid' };
            const expression = oclEngine.createQuery('self.value.toBoolean()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(false);
        });
    });

    describe('String.lastIndexOf()', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should return last occurrence index (1-based)', () => {
            const obj = { text: 'hello world' };
            const expression = oclEngine.createQuery('self.text.lastIndexOf(\'o\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(8); // 'o' in 'world' at position 8 (1-based)
        });

        it('should return 0 if not found', () => {
            const obj = { text: 'hello' };
            const expression = oclEngine.createQuery('self.text.lastIndexOf(\'x\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(0);
        });

        it('should find substring', () => {
            const obj = { text: 'hello hello' };
            const expression = oclEngine.createQuery('self.text.lastIndexOf(\'hello\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(7); // second 'hello' starts at position 7 (1-based)
        });

        it('should return 0 for empty search string', () => {
            const obj = { text: 'hello' };
            const expression = oclEngine.createQuery('self.text.lastIndexOf(\'\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe(0);
        });
    });

    describe('String.replace()', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should replace first occurrence only', () => {
            const obj = { text: 'hello hello' };
            const expression = oclEngine.createQuery('self.text.replace(\'hello\', \'hi\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('hi hello');
        });

        it('should replace substring in middle', () => {
            const obj = { text: 'hello world' };
            const expression = oclEngine.createQuery('self.text.replace(\'world\', \'universe\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('hello universe');
        });

        it('should return unchanged if pattern not found', () => {
            const obj = { text: 'hello' };
            const expression = oclEngine.createQuery('self.text.replace(\'x\', \'y\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('hello');
        });

        it('should handle empty replacement', () => {
            const obj = { text: 'hello world' };
            const expression = oclEngine.createQuery('self.text.replace(\'world\', \'\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('hello ');
        });

        it('should work with invariant expressions', () => {
            const obj = { text: 'hello world' };
            const oclExpression = 'context Object inv: self.text.replace(\'world\', \'OCL\') = \'hello OCL\'';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });
    });

    describe('String.replaceAll()', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should replace all occurrences', () => {
            const obj = { text: 'hello hello hello' };
            const expression = oclEngine.createQuery('self.text.replaceAll(\'hello\', \'hi\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('hi hi hi');
        });

        it('should replace all characters', () => {
            const obj = { text: 'aaa' };
            const expression = oclEngine.createQuery('self.text.replaceAll(\'a\', \'b\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('bbb');
        });

        it('should return unchanged if pattern not found', () => {
            const obj = { text: 'hello' };
            const expression = oclEngine.createQuery('self.text.replaceAll(\'x\', \'y\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('hello');
        });

        it('should handle empty replacement', () => {
            const obj = { text: 'a b c' };
            const expression = oclEngine.createQuery('self.text.replaceAll(\' \', \'\')');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('abc');
        });

        it('should work with invariant expressions', () => {
            const obj = { text: 'foo foo foo' };
            const oclExpression = 'context Object inv: self.text.replaceAll(\'foo\', \'bar\') = \'bar bar bar\'';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });
    });

    describe('String.matches()', () => {
        it('should match simple pattern', () => {
            const obj = { text: 'hello123' };
            const oclExpression = 'context Object inv: self.text.matches(\'[a-z]+[0-9]+\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should not match when pattern fails', () => {
            const obj = { text: 'hello' };
            const oclExpression = 'context Object inv: self.text.matches(\'[0-9]+\')';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should match email-like pattern', () => {
            const obj = { email: 'test@example.com' };
            const oclExpression = 'context Object inv: self.email.matches(\'.+@.+\\\\..+\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should handle complex regex', () => {
            const obj = { phone: '123-456-7890' };
            const oclExpression = 'context Object inv: self.phone.matches(\'[0-9]{3}-[0-9]{3}-[0-9]{4}\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });
    });

    describe('String.trim()', () => {
        let oclEngine: OclEngine;

        beforeEach(() => {
            oclEngine = OclEngine.create();
        });

        it('should remove leading and trailing spaces', () => {
            const obj = { text: '  hello  ' };
            const expression = oclEngine.createQuery('self.text.trim()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('hello');
        });

        it('should preserve internal spaces', () => {
            const obj = { text: '  hello world  ' };
            const expression = oclEngine.createQuery('self.text.trim()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('hello world');
        });

        it('should handle tabs and newlines', () => {
            const obj = { text: '\t\nhello\n\t' };
            const expression = oclEngine.createQuery('self.text.trim()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('hello');
        });

        it('should return unchanged if no whitespace', () => {
            const obj = { text: 'hello' };
            const expression = oclEngine.createQuery('self.text.trim()');
            const result = oclEngine.evaluateQuery(obj, expression);
            expect(result).toBe('hello');
        });
    });

    describe('String.startsWith()', () => {
        it('should return true when string starts with prefix', () => {
            const obj = { text: 'hello world' };
            const oclExpression = 'context Object inv: self.text.startsWith(\'hello\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false when string does not start with prefix', () => {
            const obj = { text: 'hello world' };
            const oclExpression = 'context Object inv: self.text.startsWith(\'world\')';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should handle single character prefix', () => {
            const obj = { text: 'hello' };
            const oclExpression = 'context Object inv: self.text.startsWith(\'h\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should be case sensitive', () => {
            const obj = { text: 'hello' };
            const oclExpression = 'context Object inv: self.text.startsWith(\'Hello\')';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should handle empty prefix', () => {
            const obj = { text: 'hello' };
            const oclExpression = 'context Object inv: self.text.startsWith(\'\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });
    });

    describe('String.endsWith()', () => {
        it('should return true when string ends with suffix', () => {
            const obj = { text: 'hello world' };
            const oclExpression = 'context Object inv: self.text.endsWith(\'world\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should return false when string does not end with suffix', () => {
            const obj = { text: 'hello world' };
            const oclExpression = 'context Object inv: self.text.endsWith(\'hello\')';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should handle single character suffix', () => {
            const obj = { text: 'hello' };
            const oclExpression = 'context Object inv: self.text.endsWith(\'o\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });

        it('should be case sensitive', () => {
            const obj = { text: 'hello' };
            const oclExpression = 'context Object inv: self.text.endsWith(\'LO\')';
            expectOclRuleValidatesToFalse(oclExpression, obj);
        });

        it('should handle empty suffix', () => {
            const obj = { text: 'hello' };
            const oclExpression = 'context Object inv: self.text.endsWith(\'\')';
            expectOclRuleValidatesToTrue(oclExpression, obj);
        });
    });
});
