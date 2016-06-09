'use strict';
const glob = require('glob');
describe('Expressions', () => glob.sync(`${__dirname}/expressions/**/*.js`).forEach(require));
describe('oclInterpreter', () => glob.sync(`${__dirname}/oclInterpreter/**/*.js`).forEach(require));
describe('oclParser', () => glob.sync(`${__dirname}/oclParser/**/*.js`).forEach(require));
describe('useCases', () => glob.sync(`${__dirname}/useCases/**/*.js`).forEach(require));
describe('OclEngine', () => glob.sync(`${__dirname}/oclEngine/**/*.js`).forEach(require));
