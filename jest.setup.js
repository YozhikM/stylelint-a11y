'use strict';

const { getTestRule } = require('jest-preset-stylelint');

global.testRule = getTestRule({ plugins: ['./src'] });
