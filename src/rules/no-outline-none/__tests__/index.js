import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { outline: 0; }',
    },
    {
      code: '$primary-color: #333; .bar:focus { outline: 1px solid $primary-color; }',
    },
    {
      code: '.baz:focus { outline: 1px solid #333; }',
    },
    {
      code: '.quux:focus { outline: 0; border: 1px solid #000; }',
    },
  ],

  reject: [
    {
      code: '.foo1:focus { outline: none; } .foo2:focus { outline: 1px solid red; }',
      message: messages.expected('.foo1:focus'),
      line: 1,
      column: 4,
    },
    {
      code: '.bar:focus { outline: none; }',
      message: messages.expected('.bar:focus'),
      line: 1,
      column: 4,
    },
    {
      code: '.quux { .quuux:focus { outline: 0; } }',
      message: messages.expected('.quuux:focus'),
      line: 1,
      column: 12,
    },
  ],
});
