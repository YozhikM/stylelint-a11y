'use strict';

const stylelint = require('stylelint');
const getTestRule = require('jest-preset-stylelint/getTestRule');

global.testRule = getTestRule(stylelint, { plugins: ['./src'] });
