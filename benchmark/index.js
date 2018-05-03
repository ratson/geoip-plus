'use strict'

const Benchmark = require('benchmark')
const glob = require('fast-glob')
const Path = require('path')
const Bluebird = require('bluebird')
const execa = require('execa')
const bytes = require('bytes')

const { randip, DB_FILE } = require('./common')

function runBenchmark() {
  const suite = new Benchmark.Suite()
  suite
    .on('cycle', event => {
      console.log(String(event.target))
    })
    .on('complete', event => {
      console.log(
        `Fastest is ${event.currentTarget.filter('fastest').map('name')}`,
      )
    })

  glob
    .sync('*.js', { cwd: Path.join(__dirname, 'cases'), absolute: true })
    .forEach(casePath => {
      const name = Path.basename(casePath, '.js')
      const fn = require(casePath)({ randip, DB_FILE })
      if (fn !== false) {
        suite.add(name, { minSamples: 100, fn })
      }
    })

  console.log('Benchmarking...')
  suite.run()
}

async function printMemoryUsage() {
  console.log('Memory usage')
  await Bluebird.map(glob('cases/*.js', { cwd: __dirname }), async casePath => {
    const { stdout } = await execa('node', ['memory-usage', `./${casePath}`], {
      cwd: __dirname,
    })
    const name = Path.basename(casePath, '.js')
    const info = Object.entries(JSON.parse(stdout))
      .map(([k, v]) => `${k}=${bytes(v)}`)
      .join(' ')
    console.log(`${name.padEnd(20)} ${info}`)
  })
}

async function main() {
  await printMemoryUsage()

  runBenchmark()
}

main()
