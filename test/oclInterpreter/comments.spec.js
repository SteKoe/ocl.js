'use strict';
import { expect } from "chai";
import { OclParser } from "../../lib/components/parser/OclParser";

require('../../generator/oclParserGenerator');

describe('Comments', () => {
    it('should be allowed using // for single line comments', () => {
        const oclExpression = `
            -- This is a valid comment
            context Person inv:
                self.children->exists(c|c.age > 20) 
        `;

        expect(() => OclParser.parse(oclExpression)).not.to.throw();
    });

    it('should fail when using // containing breaks', () => {
        const oclExpression = `
            -- This is a valid comment
              this is not
            context Person inv:
                self.children->exists(c|c.age > 20) 
        `;

        expect(() => OclParser.parse(oclExpression)).to.throw();
    });
});