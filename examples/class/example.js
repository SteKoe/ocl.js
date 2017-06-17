import ExampleBuilder from "./exampleBuilder";

export default class Example {
    /**
     * @returns {ExampleBuilder}
     */
    static builder() {
        return new ExampleBuilder();
    }

    run() {
        const elementById = document.getElementById(`example${this.id}`);
        const elemTitle = elementById.getElementsByClassName('title')[0];
        elemTitle.onclick = () => this._toggleClass(elemTitle, 'visible');
        elemTitle.innerHTML = this.title.trim();
        elementById.getElementsByTagName('code')[0].innerText = this.ctx.trim();
        elementById.getElementsByTagName('code')[1].innerText = this.oclExpression.trim();
        const resultTag = elementById.getElementsByClassName('result')[0];
        if (resultTag) {
            let resultObject = this.fn.apply(this);
            console.log(resultObject);
            let actual = resultObject.getResult();
            let resultIsExpectedResult = actual === this.expected;
            resultTag.innerHTML = `The result of the above rule should ${result(this.expected)} and does ${result(actual)}.`;
        }

        function result(boolean) {
            const clazz = boolean ? 'pass' : 'not-pass';

            return `<strong class="status ${clazz}">${boolean ? 'PASS' : 'NOT PASS'}</strong>`
        }
    }

    _toggleClass(elem, className) {
        var currentClassName = elem.className;
        if (currentClassName.indexOf(className) !== -1) {
            currentClassName = currentClassName.replace(className, '');
        } else {
            currentClassName += ` ${className}`;
        }

        elem.className = currentClassName;
    }
}
