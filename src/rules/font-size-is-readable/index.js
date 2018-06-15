import { utils } from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule';

export const ruleName = 'a11y/font-size-is-readable';

export const messages = utils.ruleMessages(ruleName, {
  expected: selector => `Expected a larger font-size in ${selector}`,
});

export default function(actual) {
  return (root, result) => {
    const validOptions = utils.validateOptions(result, ruleName, { actual });

    if (!validOptions || !actual) {
      return;
    }

    root.walkRules(rule => {
      let selector = null;
      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      selector = rule.selector;

      if (!selector) {
        return;
      }

      const isRejected = rule.nodes.some(o => {
        return (
          o.type === 'decl' &&
          o.prop.toLowerCase() === 'font-size' &&
          o.value.toLowerCase().endsWith('px') &&
          parseFloat(o.value) < 15
        );
      });

      if (isRejected) {
        utils.report({
          index: rule.lastEach,
          message: messages.expected(selector),
          node: rule,
          ruleName,
          result,
        });
      }
    });
  };
}
