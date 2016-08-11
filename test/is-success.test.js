'use strict'

let test = require('ava')
let isSuccess = require('../').isSuccess

test('inverted: false. Status of 0', t => {
  t.deepEqual(
    isSuccess(0, { invert: false }),
    true
  )
})

test('inverted: false. Status of 2', t => {
  t.deepEqual(
    isSuccess(2, { invert: false }),
    false
  )
})

test('inverted: true. Status of 0', t => {
  t.deepEqual(
    isSuccess(2, { invert: true }),
    true
  )
})

test('inverted: true. Status of 2', t => {
  t.deepEqual(
    isSuccess(0, { invert: true }),
    false
  )
})
