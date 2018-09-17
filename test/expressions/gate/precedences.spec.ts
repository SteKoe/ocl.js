import { expectOclRuleValidatesToTrue } from '../../matcher';

describe('precedences', () => {
    it('monotone laws', () => {
        const invs = [
            'context Object inv: (a and b) = (b and a)',
            'context Object inv: ((a and b) and c) = (a and (b and c))',
            'context Object inv: (a and a) = (a or a)',
            'context Object inv: (a and (b or c)) = ((a and b) or (a and c))',
            'context Object inv: (a and true) = a',
            'context Object inv: (a and false) = false',
            'context Object inv: (not(not a)) = a',
            'context Object inv: (not (a and b)) = (not a or not b)',
            'context Object inv: (a and not a) = false',
            'context Object inv: not false = true',
            'context Object inv: (a or (a and b)) = a',

            'context Object inv: (a or b) = (b or a)',
            'context Object inv: ((a or b) or c) = (a or (b or c))',
            'context Object inv: (a or a) = a',
            'context Object inv: (a or (b and c)) = ((a or b) and (a or c))',
            'context Object inv: (a or false) = a',
            'context Object inv: (a or true) = true',
            'context Object inv: (not (a or b)) = not a and not b',
            'context Object inv: (a or not a) = true',
            'context Object inv: not true = false',
            'context Object inv: (a and (a or b)) = a'
        ];

        invs.forEach(inv => {
            expectOclRuleValidatesToTrue(inv, {
                a: true,
                b: false,
                c: true
            });
        });
    });
});
