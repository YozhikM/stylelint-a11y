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

      var isAccepted = check(selector, node);

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

var _postcss = require('postcss');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var ruleName = (exports.ruleName = 'a11y/media-prefers-reduced-motion');

var messages = (exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: function expected(selector) {
    return 'Expected ' + selector + ' is used with @media (prefers-reduced-motion)';
  },
}));

function check(selector, node) {
  var declarations = node.nodes;
  var params = node.parent.params;
  var parentNodes = node.parent.nodes;
  var targetProperties = ['transition', 'animation'];

  if (!declarations) return true;

  if (!(0, _isStandardSyntaxSelector2.default)(selector)) {
    return true;
  }

  if ((0, _isCustomSelector2.default)(selector)) {
    return true;
  }

  var currentSelector = null;

  var declarationsIsMatched = declarations.some(function(declaration) {
    var noMatchedParams = !params || params.indexOf('prefers-reduced-motion') === -1;
    var index = targetProperties.indexOf(declaration.prop);
    currentSelector = targetProperties[index];

    return index >= 0 && noMatchedParams;
  });

  if (!declarationsIsMatched) return true;

  if (declarationsIsMatched) {
    var parentMatchedNode = parentNodes.some(function(parentNode) {
      return parentNode.nodes.some(function(childrenNode) {
        var childrenNodes = childrenNode.nodes;

        if (
          !parentNode.params ||
          !Array.isArray(childrenNodes) ||
          selector !== childrenNode.selector
        )
          return false;

        var matchedChildrenNodes = childrenNodes.some(function(declaration) {
          var index = targetProperties.indexOf(declaration.prop);

          if (currentSelector !== targetProperties[index]) return false;

          return index >= 0 && parentNode.params.indexOf('prefers-reduced-motion') >= 0;
        });

        return matchedChildrenNodes;
      });
    });

    if (!parentMatchedNode) return false;

    return true;
  }

  return true;
}
