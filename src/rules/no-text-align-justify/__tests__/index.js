import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { font-align: center; }',
    },
    {
      code: '.foo { font-align: left; }',
    },
    {
      code: '.foo { font-align: right; }',
    },
    {
      code: '.foo { font-align: start; }',
    },
    {
      code: '.foo { font-align: end; }',
    },
    {
      code: '.foo { FONT-ALIGN: CENTER; }',
    },
  ],

  reject: [
    {
      code: '.foo { font-align: justify; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 4,
    },
    {
      code: '.foo { FONT-ALIGN: JUSTIFY; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 4,
    },
  ],
});
