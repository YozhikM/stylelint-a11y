import rule, { messages, ruleName } from '../index'; // eslint-disable-line

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: 'a { }',
    },
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
    },
    {
      code: 'a:hover { } b:hover { }',
      message: messages.expected('a:hover'),
    },
    {
      code: 'a:hover { } a:focus { } b:hover { } b { }',
      message: messages.expected('b:hover'),
    },
    {
      code: 'a:hover, a:focus { } b:hover { } b { }',
      message: messages.expected('b:hover'),
    },
  ],
});
