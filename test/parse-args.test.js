'use strict'

let test = require('ava')
let parseArgs = require('../').parseArgs

test('defaults', t => {
  let parsedArgs = parseArgs([])
  t.deepEqual(parsedArgs, {
    _: [],
    delay: 500,
    wait: 5000,
    message: '',
    invert: false,
    silent: false
  })
})

test('--message', t => {
  let parsedArgs = parseArgs(['--message', 'foo'])
  t.is(parsedArgs.message, 'foo')
})

test('--delay:integer', t => {
  let parsedArgs = parseArgs(['--delay', '1'])
  t.is(parsedArgs.delay, 1000)
})

test('--delay:float', t => {
  let parsedArgs = parseArgs(['--delay', '1.5'])
  t.is(parsedArgs.delay, 1500)
})

test('--silent: true', t => {
  let parsedArgs = parseArgs(['--silent', 'true'])
  t.true(parsedArgs.silent)
})

test('command', t => {
  let parsedArgs = parseArgs(['--delay', '1.5', 'my', 'command', 'stuff'])
  t.deepEqual(parsedArgs['_'], ['my', 'command', 'stuff'])
})

test('command:with flags', t => {
  let parsedArgs = parseArgs(['--delay', '1.5', 'command', '--flag', 'stuff', 'thing'])
  t.deepEqual(parsedArgs.flag, undefined)
  t.deepEqual(parsedArgs['_'], ['command', '--flag', 'stuff', 'thing'])
})
