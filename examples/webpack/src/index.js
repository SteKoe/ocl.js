import './css/skeleton.css';
import './css/normalize.css';

const hljs = require('highlight.js');
const ocl = require('./hljs.ocl');
hljs.registerLanguage('ocl', ocl);
hljs.initHighlightingOnLoad();

// ========================================================================
const element = document.getElementById('examples');

import example_001 from './examples/001';
element.appendChild(example_001);

import example_002 from './examples/002';
element.appendChild(example_002);

import example_003 from './examples/003';
element.appendChild(example_003);

import example_004 from './examples/004';
element.appendChild(example_004);

import example_005 from './examples/005';
element.appendChild(example_005);

import example_006 from './examples/006';
element.appendChild(example_006);

import example_007 from './examples/007';
element.appendChild(example_007);

import example_008 from './examples/008';
element.appendChild(example_008);
