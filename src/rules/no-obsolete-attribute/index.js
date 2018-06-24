import { utils } from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule';
import { obsoleteAttributes } from './obsoleteAttributes';

export const ruleName = 'a11y/no-obsolete-attribute';

export const messages = utils.ruleMessages(ruleName, {
  expected: selector => `Unexpected using obsolete attribute "${selector}"`,
});

function check(selector, node) {
  if (node.type !== 'rule') {
    return true;
  }

  return !node.selectors.some(sel => {
    return obsoleteAttributes.has(sel);
  });
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
      } else if (node.type === 'atrule' && node.name.toLowerCase() === 'page' && node.params) {
        selector = node.params;
      }

      if (!selector) {
        return;
      }

      const isAccepted = check(selector, node);

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
