import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { outline: 1px solid #666; }',
    },
    {
      code: '$primary-color: #333; .bar { outline: 1px solid $primary-color; }',
    },
  ],

  reject: [
    {
      code: '.foo1 { outline: none; } .foo2 { outline: 1px solid red; }',
      message: messages.expected('.foo1'),
      line: 1,
      column: 4,
    },
    {
      code: '.bar { outline: none; }',
      message: messages.expected('.bar'),
      line: 1,
      column: 4,
    },
    {
      code: '.baz { outline: 0; }',
      message: messages.expected('.baz'),
      line: 1,
      column: 4,
    },
    {
      code: '.quux { .quuux { outline: 0; } }',
      message: messages.expected('.quuux'),
      line: 1,
      column: 12,
    },
  ],
});
