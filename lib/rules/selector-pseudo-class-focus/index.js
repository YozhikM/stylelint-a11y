'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.messages = exports.ruleName = undefined;

exports.default = function(actual) {
  return function(root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, { actual: actual });

    if (!validOptions || !actual) {
      return;
    }

    root.walk(function(node) {
      var selector = null;

      if (node.type === 'rule') {
        if (!(0, _isStandardSyntaxRule2.default)(node)) {
          return;
        }

        selector = node.selector;
      } else if (node.type === 'atrule' && node.name === 'page' && node.params) {
        if (!(0, _isStandardSyntaxAtRule2.default)(node)) {
          return;
        }

        selector = node.params;
      }

      if (!selector) {
        return;
      }

      if (selector.indexOf(':') === -1) {
        return;
      }

      var parentNodes = node.parent.nodes;
      var isAccepted = null;

      if (parentNodes.length > 1) {
        var checkParentNodes = parentNodes
          .map(function(parentNode) {
            return check(parentNode.selector);
          })
          .filter(Boolean);

        isAccepted = !!checkParentNodes;
      } else {
        isAccepted = check(selector);
      }

      if (!isAccepted) {
        _stylelint.utils.report({
          index: node.lastEach,
          message: messages.expected(selector),
          node: node,
          ruleName: ruleName,
          result: result,
        });
      }
    });
  };
};

var _stylelint = require('stylelint');

var _isStandardSyntaxRule = require('stylelint/lib/utils/isStandardSyntaxRule');

var _isStandardSyntaxRule2 = _interopRequireDefault(_isStandardSyntaxRule);

var _isStandardSyntaxSelector = require('stylelint/lib/utils/isStandardSyntaxSelector');

var _isStandardSyntaxSelector2 = _interopRequireDefault(_isStandardSyntaxSelector);

var _isStandardSyntaxAtRule = require('stylelint/lib/utils/isStandardSyntaxAtRule');

var _isStandardSyntaxAtRule2 = _interopRequireDefault(_isStandardSyntaxAtRule);

var _isCustomSelector = require('stylelint/lib/utils/isCustomSelector');

var _isCustomSelector2 = _interopRequireDefault(_isCustomSelector);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var ruleName = (exports.ruleName = 'a11y/selector-pseudo-class-focus');

var messages = (exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: function expected(value) {
    return 'Expected that ' + value + ' is used together with :focus pseudo-class';
  },
}));

function check(selector) {
  if (
    selector.match(/:focus/gi) ||
    (selector.match(/:hover/gi) && selector.match(/:focus/gi)) ||
    (!selector.match(/:hover/gi) && !selector.match(/:focus/gi))
  ) {
    return true;
  }

  if (!(0, _isStandardSyntaxSelector2.default)(selector)) {
    return true;
  }

  if ((0, _isCustomSelector2.default)(selector)) {
    return true;
  }

  return false;
}
