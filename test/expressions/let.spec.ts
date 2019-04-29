import { expect } from 'chai';
import { OclEngine } from '../../lib';
import { expectOclRuleValidatesToTrue } from '../matcher';

describe('let', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = new OclEngine();
    });

    it('sets variable in specific expression 1', () => {
        const result = oclEngine.evaluateQuery({}, oclEngine.createQuery('let anObject : String = null in anObject.oclIsUndefined()'));
        expect(result).to.equal(true);
    });

    it('sets variable in specific expression 2', () => {
        const result = oclEngine.evaluateQuery({}, oclEngine.createQuery('let anObject : String = undefined in anObject.oclIsUndefined()'));
        expect(result).to.equal(true);
    });

    it('sets variable in specific expression 3', () => {
        const result = oclEngine.evaluateQuery({}, oclEngine.createQuery('let anObject : String = \'null\' in anObject.oclIsUndefined()'));
        expect(result).to.equal(false);
    });

    it('sets variable in specific expression without type 1', () => {
        const result = oclEngine.evaluateQuery({}, oclEngine.createQuery('let anObject = null in anObject.oclIsUndefined()'));
        expect(result).to.equal(true);
    });

    it('sets variable in specific expression without type 2 ', () => {
        const result = oclEngine.evaluateQuery({}, oclEngine.createQuery('let anObject = \'null\' in anObject.oclIsUndefined()'));
        expect(result).to.equal(false);
    });

    it('meeting', () => {
        const oclExpression = `
            context Meeting inv:
                let noConflict: Boolean = participants.meetings->forAll(m | m <> self and m.isConfirmed implies not self.inConflict(m))
                    in isConfirmed implies noConflict
        `;

        const meeting = new Meeting('Relevant Meeting');
        meeting.addParticipant(new Participant('A').addMeeting(meeting));
        meeting.addParticipant(new Participant('B').addMeeting(new Meeting('Conflicting')));

        expectOclRuleValidatesToTrue(oclExpression, meeting);
    });
});

class Meeting {
    isConfirmed = true;
    participants: Set<Participant> = new Set();

    constructor(public name) {
    }

    addParticipant(p: Participant): void {
        this.participants.add(p);
    }

    inConflict(m: Meeting): boolean {
        return m.name === 'Conflicting';
    }
}

class Participant {
    meetings: Set<Meeting> = new Set();

    constructor(public name) {
    }

    addMeeting(m: Meeting): Participant {
        this.meetings.add(m);
        m.participants.add(this);

        return this;
    }
}
