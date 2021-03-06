#!/usr/bin/env node

'use strict'

let debug = require('debug')
let spawn = require('child_process').spawn
let minimist = require('minimist')
const VALID_TIMEOUT = /^\d+$/

let log = debug('garcom')

function parseCommand (command) {
  return command.reduce((accum, arg) => {
    return accum.concat(arg.split(' '))
  }, [])
}

function parseArgs (args) {
  let timeout = args.splice(0, 1)
  if (!VALID_TIMEOUT.test(timeout)) {
    throw(new Error(`Invalid timeout specified ${timeout}. Please specify an integer like '30' as the first argument`))
  }

  let parsed = minimist(args, {
    stopEarly: true,
    boolean: ['silent', 'invert'],
    default: {
      delay: '0.5',
      message: '',
      invert: false,
      silent: false
    }
  })
  parsed.timeout = parseFloat(timeout, 10) * 1000
  parsed.delay = parseFloat(parsed.delay, 10) * 1000

  return parsed
}

function isSuccess (status, options) {
  let isZero = status === 0
  return options.invert ? !isZero : isZero
}

function runCommand (command, options) {
  let procOptions = {}
  if (!options.silent) {
    procOptions.stdio = 'inherit'
  }

  let proc = spawn(command[0], command.slice(1), procOptions)

  proc.on('close', (status) => {
    if (isSuccess(status, options)) {
      log('success')
      process.exit(0)
    }

    setTimeout(() => {
      log('re-running')
      runCommand(command, options)
    }, options.delay)
  })
}

function main (args) {
  let options = parseArgs(args)
  let command = parseCommand(options['_'])

  setTimeout(function () {
    if (options.message) { process.stderr.write(options.message + '\n') }
    process.exit(1)
  }, options.timeout)

  log(`Running ${command}`)
  runCommand(command, options)
}

if (require.main === module) {
  main(process.argv.slice(2))
}

module.exports = {
  main: main,
  runCommand: runCommand,
  parseCommand: parseCommand,
  parseArgs: parseArgs,
  isSuccess: isSuccess
}
