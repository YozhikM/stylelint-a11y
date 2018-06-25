import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { }',
    },
    {
      code: '.foo { max-width: 65ch; }',
    },
    {
      code: '.bar { max-width: 100px; }',
    },
    {
      code: '.baz { MAX-WIDTH: 63CH; }',
    },
  ],

  reject: [
    {
      code: '.foo { max-width: 40ch; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 4,
    },
    {
      code: '.bar { MAX-WIDTH: 81CH; }',
      message: messages.expected('.bar'),
      line: 1,
      column: 4,
    },
  ],
});
