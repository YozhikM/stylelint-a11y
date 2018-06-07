import { utils } from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule';
import isStandardSyntaxSelector from 'stylelint/lib/utils/isStandardSyntaxSelector';
import isStandardSyntaxAtRule from 'stylelint/lib/utils/isStandardSyntaxAtRule';
import isCustomSelector from 'stylelint/lib/utils/isCustomSelector';

export const ruleName = 'a11y/selector-pseudo-class-focus';

export const messages = utils.ruleMessages(ruleName, {
  expected: value => `Expected that ${value} is used together with :focus pseudo-class`,
});

function check(selector) {
  if (
    selector.match(/:focus/gi) ||
    (selector.match(/:hover/gi) && selector.match(/:focus/gi)) ||
    (!selector.match(/:hover/gi) && !selector.match(/:focus/gi))
  ) {
    return true;
  }

  if (!isStandardSyntaxSelector(selector)) {
    return true;
  }

  if (isCustomSelector(selector)) {
    return true;
  }

  return false;
}

export default function(actual) {
  return (root, result) => {
    const validOptions = utils.validateOptions(result, ruleName, { actual });

    if (!validOptions || !actual) {
      return;
    }

    root.walk(node => {
      let selector = null;

      if (node.type === 'rule') {
        if (!isStandardSyntaxRule(node)) {
          return;
        }

        selector = node.selector;
      } else if (node.type === 'atrule' && node.name === 'page' && node.params) {
        if (!isStandardSyntaxAtRule(node)) {
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

      const parentNodes = node.parent.nodes;
      let isAccepted = null;

      if (parentNodes.length > 1) {
        const checkParentNodes = parentNodes
          .map(parentNode => {
            return check(parentNode.selector);
          })
          .filter(Boolean);

        isAccepted = !!checkParentNodes;
      } else {
        isAccepted = check(selector);
      }

      if (!isAccepted) {
        utils.report({
          index: node.lastEach,
          message: messages.expected(selector),
          node,
          ruleName,
          result,
        });
      }
    });
  };
}
