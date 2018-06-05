import { OclParser } from "../../lib/components/parser/OclParser";
import { Book, Library, Writer } from "../fixture.factory";

const { expect } = require('chai');

require('../../generator/oclParserGenerator');

describe('Example', () => {
    describe('Library', () => {
        it('parent is same', () => {
            let library = new Library();

            const julesVerne = new Writer("Jules Verne");
            julesVerne.books.push(new Book("Le Tour du monde en quatre-vingts jours"));
            julesVerne.books.push(new Book("Vingt mille lieues sous les mers"));

            library.writers.push(julesVerne);
            library.writers.push(new Writer("Unknown Author"));

            const oclExpression = `
            context Library 
                def: unpublishedWriters = writers->select(books->isEmpty())
                inv: unpublishedWriters->isEmpty()
        `;
            const oclRule = OclParser.parse(oclExpression);
            expect(oclRule.evaluate(library)).to.be.false;
        });

        it('parent is same', () => {
            let library = new Library();

            const julesVerne = new Writer("Jules Verne");
            julesVerne.books.push(new Book("Le Tour du monde en quatre-vingts jours"));
            julesVerne.books.push(new Book("Vingt mille lieues sous les mers"));

            library.writers.push(julesVerne);
            library.writers.push(new Writer("Unknown Author"));

            const oclExpression = `
            context Library
            -- we can define additional operations and attributes to assist
            -- in the formulation of our constraints
            def: unpublishedWriters : Set(Writer) = writers->select(books->isEmpty())
            -- so, here we use one such definition
            inv writers_have_written: unpublishedWriters->isEmpty()
        `;
            const oclRule = OclParser.parse(oclExpression);
            expect(oclRule.evaluate(library)).to.be.false;
        });
    });
});

