'use strict'

let test = require('ava')
let parseArgs = require('../').parseArgs

test('defaults', t => {
  let parsedArgs = parseArgs([1])
  t.deepEqual(parsedArgs, {
    _: [],
    delay: 500,
    timeout: 1000,
    message: '',
    invert: false,
    silent: false
  })
})

test('throws an error if no timeout value is provided', t => {
  t.throws(() => parseArgs(['--message', 'foo']) , /Invalid timeout specified/)
})

test('throws an error if an invalid timeout value is provided', t => {
  t.throws(() => parseArgs(['xx', '--message', 'foo']), /Invalid timeout specified/)
})

test('--message', t => {
  let parsedArgs = parseArgs(['1', '--message', 'foo'])
  t.is(parsedArgs.message, 'foo')
})

test('--delay:integer', t => {
  let parsedArgs = parseArgs(['1', '--delay', '1'])
  t.is(parsedArgs.delay, 1000)
})

test('--delay:float', t => {
  let parsedArgs = parseArgs(['1', '--delay', '1.5'])
  t.is(parsedArgs.delay, 1500)
})

test('--silent: true', t => {
  let parsedArgs = parseArgs(['1', '--silent', 'true'])
  t.true(parsedArgs.silent)
})

test('command', t => {
  let parsedArgs = parseArgs(['1', '--delay', '1.5', 'my', 'command', 'stuff'])
  t.deepEqual(parsedArgs['_'], ['my', 'command', 'stuff'])
})

test('command:with flags', t => {
  let parsedArgs = parseArgs(['1', '--delay', '1.5', 'command', '--flag', 'stuff', 'thing'])
  t.deepEqual(parsedArgs.flag, undefined)
  t.deepEqual(parsedArgs['_'], ['command', '--flag', 'stuff', 'thing'])
})
