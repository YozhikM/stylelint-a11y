import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],
  fix: true,

  accept: [
    {
      code: 'a { }',
    },
    {
      code: 'div { transition: none; }',
    },
    {
      code:
        '.foo { transition: none } @media screen and (prefers-reduced-motion: reduce) { .foo { transition: none } }',
    },
    {
      code:
        '.bar { animation: none } @media screen and (prefers-reduced-motion) { .bar { animation: none } }',
    },
    {
      code:
        'a { animation-name: skew; } @media screen and (prefers-reduced-motion) { a { animation: none } }',
    },
    {
      code:
        '.foo { transition: all; @media (prefers-reduced-motion: reduce) { transition: none; } }',
    },
  ],

  reject: [
    {
      code: 'a { animation-name: skew; }',
      fixed:
        '@media screen and (prefers-reduced-motion: reduce) {\na { animation: none;\n}\n}\na { animation-name: skew; }',
      message: messages.expected('a'),
      line: 1,
      column: 3,
    },
    {
      code:
        'a { animation-name: skew; } @media screen and (prefers-reduced-motion) { a { transition: none; } }',
      fixed:
        '@media screen and (prefers-reduced-motion: reduce) {\na { animation: none;\n}\n} a { animation-name: skew; } @media screen and (prefers-reduced-motion) { a { transition: none; } }',
      message: messages.expected('a'),
      line: 1,
      column: 3,
    },
    {
      code:
        '.foo { animation: 1s ease-in; } @media screen and (prefers-reduced-motion) { .foo { animation: 1s ease-in; } }',
      fixed:
        '@media screen and (prefers-reduced-motion: reduce) {\n.foo { animation: none;\n}\n} .foo { animation: 1s ease-in; } @media screen and (prefers-reduced-motion) { .foo { animation: 1s ease-in; } }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
  ],
});
