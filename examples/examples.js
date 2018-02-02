const hljs = require('../node_modules/highlight.js/lib/highlight');
const ocl = require('./hljs.ocl');
hljs.registerLanguage('ocl', ocl);
hljs.initHighlightingOnLoad();

// ========================================================================
const element = document.getElementById('examples');

element.appendChild(require('./examples/001'));
element.appendChild(require('./examples/002'));
element.appendChild(require('./examples/003'));
element.appendChild(require('./examples/004'));
element.appendChild(require('./examples/005'));
element.appendChild(require('./examples/006'));
element.appendChild(require('./examples/007'));
