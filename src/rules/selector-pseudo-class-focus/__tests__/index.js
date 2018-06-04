import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: 'a:focus { }',
    },
    {
      code: 'a:hover, a:focus { }',
    },
    {
      code: 'a:hover { } a:focus { }',
    },
  ],

  reject: [
    {
      code: 'a:hover { }',
      message: messages.expected('a:hover'),
      line: 1,
      column: 4,
    },
  ],
});
