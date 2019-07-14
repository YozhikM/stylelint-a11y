import { utils } from 'stylelint';
import { parse } from 'postcss';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule';
import isStandardSyntaxSelector from 'stylelint/lib/utils/isStandardSyntaxSelector';
import isStandardSyntaxAtRule from 'stylelint/lib/utils/isStandardSyntaxAtRule';
import isCustomSelector from 'stylelint/lib/utils/isCustomSelector';

export const ruleName = 'a11y/media-prefers-reduced-motion';

export const messages = utils.ruleMessages(ruleName, {
  expected: selector => `Expected ${selector} is used with @media (prefers-reduced-motion)`,
});
const targetProperties = ['transition', 'animation', 'animation-name'];

function checkChildrenNodes(childrenNodes, currentSelector, parentNode) {
  return childrenNodes.some(declaration => {
    const index = targetProperties.indexOf(declaration.prop);
    if (currentSelector === 'animation-name' && targetProperties[index] === 'animation')
      return true;
    if (currentSelector !== targetProperties[index]) return false;
    if (declaration.value !== 'none') return false;

    return index >= 0 && parentNode.params.indexOf('prefers-reduced-motion') >= 0;
  });
}

function check(selector, node) {
  const declarations = node.nodes;
  const params = node.parent.params;
  const parentNodes = node.parent.nodes;

  if (!declarations) return true;

  if (!isStandardSyntaxSelector(selector)) {
    return true;
  }

  if (isCustomSelector(selector)) {
    return true;
  }

  let currentSelector = null;

  const declarationsIsMatched = declarations.some(declaration => {
    const noMatchedParams = !params || params.indexOf('prefers-reduced-motion') === -1;
    const index = targetProperties.indexOf(declaration.prop);
    currentSelector = targetProperties[index];
    if (targetProperties.indexOf(declaration.prop) >= 0 && declaration.value === 'none') {
      return false;
    }

    return index >= 0 && noMatchedParams;
  });

  if (!declarationsIsMatched) return true;

  if (declarationsIsMatched) {
    const parentMatchedNode = parentNodes.some(parentNode => {
      if (!parentNode || !parentNode.nodes) return;
      return parentNode.nodes.some(childrenNode => {
        const childrenNodes = childrenNode.nodes;

        if (
          childrenNode.type === 'atrule' &&
          childrenNode.params.indexOf('prefers-reduced-motion') >= 0
        ) {
          return childrenNodes.some(declaration => {
            const index = targetProperties.indexOf(declaration.prop);
            if (currentSelector === 'animation-name' && targetProperties[index] === 'animation')
              return true;
            if (currentSelector !== targetProperties[index]) return false;
            if (declaration.value !== 'none') return false;

            return index >= 0;
          });
        }

        if (
          !parentNode.params ||
          !Array.isArray(childrenNodes) ||
          selector !== childrenNode.selector
        )
          return false;

        return checkChildrenNodes(childrenNodes, currentSelector, parentNode);
      });
    });

    if (!parentMatchedNode) return false;

    return true;
  }

  return true;
}

export default function(actual, _, context) {
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

      const isAccepted = check(selector, node);

      if (context.fix && !isAccepted) {
        const media = parse('@media screen and (prefers-reduced-motion: reduce) {}');
        media.nodes.forEach(o => {
          o.raws.after = '\n';
        });
        const cloneRule = node.clone();
        cloneRule.raws = {
          ...cloneRule.raws,
          before: '\n',
          after: '\n',
          semicolon: true,
        };
        cloneRule.nodes.forEach(o => {
          if (o.prop === 'animation-name') {
            o.prop = 'animation';
          }
          if (targetProperties.indexOf(o.prop) >= 0) {
            o.value = 'none';
          }
        });
        media.first.append(cloneRule);
        node.before(media);
        return;
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
