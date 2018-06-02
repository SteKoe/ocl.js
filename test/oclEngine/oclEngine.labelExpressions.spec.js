'use strict';
import {expect} from 'chai';
import {OclEngine} from "../../lib/components/OclEngine";

require('../../generator/oclParserGenerator');

describe('OclEngine', function () {
    it('should allow to label expressions', function () {
        const oclEngine = OclEngine.create()
            .addOclExpression('context Object inv: false', ['label-1'])
            .addOclExpression('context Object inv: false', ['label-1'])
            .addOclExpression('context Object inv: false', ['label-2']);
    });

    it('should allow to execute expressions having specific labels', function() {
        const oclEngine = OclEngine.create()
            .addOclExpression('context Object inv: false', ['label-1'])
            .addOclExpression('context Object inv: false', ['label-1'])
            .addOclExpression('context Object inv: false', ['label-2']);

        expect(oclEngine.getOclExpressionsForType('Object', ['label-1']).length).to.eql(2);
        expect(oclEngine.evaluate({}, ['label-1']).namesOfFailedInvs.length).to.eql(2);
    })
});
