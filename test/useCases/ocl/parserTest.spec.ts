import * as fs from 'fs';
import * as path from 'path';
import { expect, describe, it } from 'vitest';
import { OclParser } from '../../../lib/components/parser/OclParser';

describe.skipIf(!process.env.RUN_SLOW_TESTS)('Example', () => {
    describe('real world', () => {
        it('parses calendar.ocl', { timeout: 5000 }, () => {
            expect(() => OclParser.parse(readOclFile('calendar.ocl'))).not.toThrow();
        });

        it('parses company.ocl', { timeout: 5000 }, () => {
            expect(() => OclParser.parse(readOclFile('company.ocl'))).not.toThrow();
        });
    });
});

function readOclFile(oclFileName): string {
    return fs.readFileSync(path.join(__dirname, oclFileName), 'utf8');
}
