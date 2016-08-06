'use strict'

let test = require('ava')
let parseCommand = require('../').parseCommand

test('single string commands', t => {
  t.deepEqual(
    parseCommand(['curl -I http://localhost:4567']),
    ['curl', '-I', 'http://localhost:4567']
  )
})

test('arrays of commands', t => {
  t.deepEqual(
    parseCommand(['curl', '-I', 'http://localhost:4567']),
    ['curl', '-I', 'http://localhost:4567']
  )
})
