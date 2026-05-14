import { expect } from 'vitest';
import {ucfirst} from "../lib/utils/ucfirst";

describe('ucfirst', () => {
    it('should capitalize the first letter of a lowercase word', () => {
        expect(ucfirst("sample")).toBe("Sample");
    });

    it('should not change the first letter if it is already uppercase', () => {
        expect(ucfirst('Test')).toBe('Test');
    });

    it('should handle mixed case words', () => {
        expect(ucfirst('forAll')).toBe('ForAll');
    });

    it('should handle empty string', () => {
        expect(ucfirst('')).toBe('');
    });

    it('should handle single character', () => {
        expect(ucfirst('a')).toBe('A');
    });

    it('should handle non-letter first character', () => {
        expect(ucfirst('1test')).toBe('1test');
    });
});
