import { utils } from 'stylelint';

export const ruleName = 'a11y/no-outline-none';

export const messages = utils.ruleMessages(ruleName, {
  expected: value => `Unexpected using "outline" property in ${value}`,
});

function check(node) {
  if (node.type !== 'rule') {
    return true;
  }

  const hasOutlineNone = node.nodes.some(
    o => o.type === 'decl' && o.prop === 'outline' && ['0', 'none'].indexOf(o.value) >= 0
  );
  if (hasOutlineNone) return false;

  return true;
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
        selector = node.selector;
      } else if (node.type === 'atrule' && node.name === 'page' && node.params) {
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
