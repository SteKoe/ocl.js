import Example from "./example";

export default class ExampleBuilder {
    constructor() {
        this.example = new Example();
    }

    /**
     * @param title
     * @returns {ExampleBuilder}
     */
    title(title) {
        this.example.title = title;
        return this;
    }

    /**
     * @param ctx
     * @returns {ExampleBuilder}
     */
    context(ctx) {
        this.example.ctx = ctx;
        return this;
    }

    /**
     * @param oclExpression
     * @returns {ExampleBuilder}
     */
    oclExpression(oclExpression) {
        this.example.oclExpression = oclExpression;
        return this;
    }

    /**
     * @param expected
     * @returns {ExampleBuilder}
     */
    expected(expected) {
        this.example.expected = expected;
        return this;
    }

    /**
     * @param fn
     * @returns {ExampleBuilder}
     */
    fn(fn) {
        this.example.fn = fn;
        return this;
    }

    /**
     * @returns {Example}
     */
    build() {
        return this.example.run.apply(this.example);
    }
}
