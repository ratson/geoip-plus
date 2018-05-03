'use strict'

const { randip, DB_FILE } = require('./common')

const casePath = process.argv[2]
const fn = require(casePath)({ randip, DB_FILE })

if (fn) {
  fn()
}

console.log(JSON.stringify(process.memoryUsage()))
