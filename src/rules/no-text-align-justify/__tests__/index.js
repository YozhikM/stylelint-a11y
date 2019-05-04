import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { text-align: center; }',
    },
    {
      code: '.foo { text-align: left; }',
    },
    {
      code: '.foo { text-align: right; }',
    },
    {
      code: '.foo { text-align: start; }',
    },
    {
      code: '.foo { text-align: end; }',
    },
    {
      code: '.foo { TEXT-ALIGN: CENTER; }',
    },
  ],

  reject: [
    {
      code: '.foo { text-align: justify; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
    {
      code: '.foo { TEXT-ALIGN: JUSTIFY; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
  ],
});
