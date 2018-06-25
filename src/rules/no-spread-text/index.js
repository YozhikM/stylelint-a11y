import { utils } from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule';

export const ruleName = 'a11y/no-spread-text';

export const messages = utils.ruleMessages(ruleName, {
  expected: selector => `Unexpected max-width in ${selector}`,
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
          o.prop.toLowerCase() === 'max-width' &&
          o.value.toLowerCase().endsWith('ch') &&
          (parseFloat(o.value) < 45 || parseFloat(o.value) > 80)
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
