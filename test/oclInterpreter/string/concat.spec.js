'use strict';
import { expect } from "chai";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('String->concat', () => {
    it('should concat string with string', () => {
        const oclExpression = `
            context Object inv:
                self.name->concat(" Köninger") = "Stephan Köninger"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: "Stephan" })).to.be.true;
    });

    it('should concat string with number', () => {
        const oclExpression = `
            context Object inv:
                self.name->concat(123) = "ABC123"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: "ABC" })).to.be.true;
    });

    it('should concat number with string', () => {
        const oclExpression = `
            context Object inv:
                self.name->concat("456") = "123456"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: 123 })).to.be.true;
    });

    it('should concat number with number', () => {
        const oclExpression = `
            context Object inv:
                self.name->concat(456) = "123456"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: 123 })).to.be.true;
    });

    it('should concat string with string using PLUS operator', () => {
        const oclExpression = `
            context Object inv:
                self.name + " Köninger" = "Stephan Köninger"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: "Stephan" })).to.be.true;
    });
});