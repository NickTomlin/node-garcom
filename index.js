'use strict'

let debug = require('debug')
let spawn = require('child_process').spawn
let minimist = require('minimist')

let log = debug('snore')
let logBuffer = (b) => debug('snore:out')(b.toString())

function parseCommand (command) {
  return command.reduce((accum, arg) => {
    return accum.concat(arg.split(' '))
  }, [])
}

function parseArgs (args) {
  let parsed = minimist(args, {
    stopEarly: true,
    default: {
      delay: '0.5',
      wait: '5',
      message: ''
    }
  })
  parsed.wait = parseFloat(parsed.wait, 10) * 1000
  parsed.delay = parseFloat(parsed.delay, 10) * 1000

  return parsed
}

function runCommand (command, options) {
  let proc = spawn(command[0], command.slice(1))
  proc.stderr.on('data', logBuffer)
  proc.stdout.on('data', logBuffer)

  proc.on('close', (status) => {
    if (status === 0) {
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
  }, options.wait)

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
  parseArgs: parseArgs
}
