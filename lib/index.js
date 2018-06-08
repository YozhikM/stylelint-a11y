'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stylelint = require('stylelint');

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rulesPlugins = Object.keys(_rules2.default).map(function (ruleName) {
  return (0, _stylelint.createPlugin)('a11y/' + ruleName, _rules2.default[ruleName]);
});

exports.default = rulesPlugins;