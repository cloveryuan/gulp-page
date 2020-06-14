import test from 'ava'
import gulpJsj from '..'

// TODO: Implement module test
test('<test-title>', t => {
  const err = t.throws(() => gulpJsj(100), TypeError)
  t.is(err.message, 'Expected a string, got number')

  t.is(gulpJsj('w'), 'w@zce.me')
  t.is(gulpJsj('w', { host: 'wedn.net' }), 'w@wedn.net')
})
