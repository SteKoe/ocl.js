import ExampleBuilder from "./exampleBuilder";

export default class Example {
    /**
     * @returns {ExampleBuilder}
     */
    static builder() {
        return new ExampleBuilder();
    }

    run() {
        const elemTitle = document.createElement('h5');
        elemTitle.onclick = () => this._toggleClass(elemTitle, 'visible');
        elemTitle.innerHTML = this.title.trim();

        const elemPreJs = document.createElement('pre');
        const elemCodeJs = document.createElement('code');
        elemCodeJs.innerText = this.ctx.trim();
        elemPreJs.appendChild(elemCodeJs);

        const elemPreOcl = document.createElement('pre');
        const elemCodeOcl = document.createElement('code');
        elemCodeOcl.innerText = this.oclExpression.trim();
        elemPreOcl.appendChild(elemCodeOcl);

        const elemResult = document.createElement('p');
        if (elemResult) {
            let resultObject = this.fn.apply(this);
            let actual = resultObject.getResult();
            elemResult.innerHTML = `The result of the above rule should ${result(this.expected)} and does ${result(actual)}.`;

            if(this.expected === false && actual === false) {
                const failedInvs = resultObject.getNamesOfFailedInvs().filter(name => name !== 'anonymous');

                if(failedInvs.length > 0) {
                    elemResult.innerHTML += ` The following invariants have failed: ${failedInvs.join(', ')}`
                }
            }
        }

        const elemDivCodeWrapper = document.createElement('div');
        elemDivCodeWrapper.appendChild(elemPreJs);
        elemDivCodeWrapper.appendChild(elemPreOcl);
        elemDivCodeWrapper.appendChild(elemResult);

        const elemDivExampleWrapper = document.createElement('div');
        elemDivExampleWrapper.appendChild(elemTitle);
        elemDivExampleWrapper.appendChild(elemDivCodeWrapper);

        return elemDivExampleWrapper;

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
