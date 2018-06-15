import { utils } from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule';

export const ruleName = 'a11y/line-height-is-vertical-rhythmed';

export const messages = utils.ruleMessages(ruleName, {
  expected: selector => `Expected a vertical rhythmed line-height in ${selector}`,
});

function check(node) {
  if (node.type !== 'rule') {
    return true;
  }

  const checkInPx = o => o.value.toLowerCase().endsWith('px') && parseInt(o.value) % 24 !== 0;
  const checkInRel = o => !isNaN(o.value) && parseFloat(o.value) < 1.5;

  return !node.nodes.some(
    o =>
      o.type === 'decl' && o.prop.toLowerCase() === 'line-height' && (checkInPx(o) || checkInRel(o))
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
