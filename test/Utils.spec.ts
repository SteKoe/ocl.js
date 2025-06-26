import {expect} from 'chai';
import {ucfirst} from "../lib/utils/ucfirst";

describe('ucfirst', () => {
    it('should capitalize the first letter of a lowercase word', () => {
        expect(ucfirst("sample")).to.equal("Sample");
    });

    it('should not change the first letter if it is already uppercase', () => {
        expect(ucfirst('Test')).to.equal('Test');
    });

    it('should handle mixed case words', () => {
        expect(ucfirst('forAll')).to.equal('ForAll');
    });

    it('should handle empty string', () => {
        expect(ucfirst('')).to.equal('');
    });

    it('should handle single character', () => {
        expect(ucfirst('a')).to.equal('A');
    });

    it('should handle non-letter first character', () => {
        expect(ucfirst('1test')).to.equal('1test');
    });
});