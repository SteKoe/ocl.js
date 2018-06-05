import fs from "fs";
import path from "path";
import { expect } from "chai";
import { OclParser } from '../../../lib/components/parser/OclParser'

require('../../../generator/oclParserGenerator');

if (process.env.RUN_SLOW_TESTS) {
    describe('Example', () => {
        describe('real world', () => {
            it('parses calendar.ocl', () => {
                expect(() => OclParser.parse(readOclFile('calendar.ocl'))).to.not.throw()
            });

            it('parses company.ocl', () => {
                expect(() => OclParser.parse(readOclFile('company.ocl'))).to.not.throw()
            }).timeout(5000);
        });
    });
}

function readOclFile(oclFileName) {
    return fs.readFileSync(path.join(__dirname, oclFileName), 'utf8')
}
