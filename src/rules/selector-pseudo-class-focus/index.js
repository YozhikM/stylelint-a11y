import { utils } from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule';

export const ruleName = 'a11y/selector-pseudo-class-focus';

export const messages = utils.ruleMessages(ruleName, {
  expected: value => `Expected that ${value} is used together with :focus pseudo-class`,
});

function hasAlready(parent, selector) {
  return parent.nodes.some(i => {
    return i.type === 'rule' && i.selectors.indexOf(selector) !== -1;
  });
}

export default function(actual, _, context) {
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

      if (selector.indexOf(':') === -1) {
        return;
      }

      if (selector.indexOf(':hover') === -1) {
        return;
      }

      if (selector.indexOf(':hover') >= 0 && selector.indexOf(':focus') >= 0) {
        return;
      }

      const isAccepted = hasAlready(rule.parent, selector.replace(/:hover/g, ':focus'));

      if (context.fix && !isAccepted) {
        rule.parent.nodes.forEach(node => {
          if (node.type === 'rule' && node.selector === selector) {
            node.selector = `${node.selector}, ${node.selector.replace(/:hover/g, ':focus')}`;
          }
        });
      }

      if (!isAccepted) {
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
