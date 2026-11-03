const assert = require('assert');
const { Book } = require('./book');

const TOTAL_TESTS = 3;
let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log(`  ok - ${name}`);
}

test('un livre neuf est Available', () => {
  const book = new Book('ISBN-1', 'Clean Code', 'Robert C. Martin');
  assert.strictEqual(book.status, 'Available');
});

test('markIssued() fait passer Available -> Issued, et refuse un 2e issue', () => {
  const book = new Book('ISBN-1', 'Clean Code', 'Robert C. Martin');
  book.markIssued();
  assert.strictEqual(book.status, 'Issued');
  assert.throws(() => book.markIssued());
});

test('markReturned() fait passer Issued -> Available, et refuse un return sans issue', () => {
  const book = new Book('ISBN-1', 'Clean Code', 'Robert C. Martin');
  assert.throws(() => book.markReturned());
  book.markIssued();
  book.markReturned();
  assert.strictEqual(book.status, 'Available');
});

assert.strictEqual(passed, TOTAL_TESTS, `attendu ${TOTAL_TESTS}, ${passed} exécutés`);
console.log(`\n${passed}/${TOTAL_TESTS} tests passent`);
