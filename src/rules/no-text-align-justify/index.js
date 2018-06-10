import { utils } from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule';

export const ruleName = 'a11y/no-text-align-justify';

export const messages = utils.ruleMessages(ruleName, {
  expected: selector => `Unexpected using "{ text-align: justify; }" in ${selector}`,
});

function check(node) {
  if (node.type !== 'rule') {
    return true;
  }

  return !node.nodes.some(
    o =>
      o.type === 'decl' &&
      o.prop.toLowerCase() === 'text-align' &&
      o.value.toLowerCase() === 'justify'
  );
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

      const isAccepted = check(node);

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
