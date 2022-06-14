import { utils } from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule';

export const ruleName = 'a11y/no-outline-none';

export const messages = utils.ruleMessages(ruleName, {
  expected: (selector) => `Unexpected using "outline" property in ${selector}`,
});

function check(selector, node) {
  if (node.type !== 'rule') {
    return true;
  }

  if (!selector.match(/:focus/gi)) {
    return true;
  }

  const hasEmptyOutline = node.nodes.some(
    (o) =>
      o.type === 'decl' &&
      o.prop.toLowerCase() === 'outline' &&
      ['0', 'none'].indexOf(o.value.toLowerCase()) >= 0
  );

  if (hasEmptyOutline) {
    return node.nodes.some(
      (o) =>
        o.type === 'decl' &&
        ['border', 'border-color', 'box-shadow'].indexOf(o.prop.toLowerCase()) >= 0 &&
        !o.value.toLowerCase().match(/transparent/gi)
    );
  }

  return true;
}

export default function (actual) {
  return (root, result) => {
    const validOptions = utils.validateOptions(result, ruleName, { actual });

    if (!validOptions || !actual) {
      return;
    }

    root.walk((node) => {
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
