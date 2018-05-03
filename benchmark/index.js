const { city } = require('geoip-database')

const randip = () =>
  `${Math.ceil(Math.random() * 254)}.${Math.ceil(
    Math.random() * 254,
  )}.${Math.ceil(Math.random() * 254)}.${Math.ceil(Math.random() * 254)}`

const DB_FILE = city

const Benchmark = require('benchmark')

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

const experiment = (name, fn) => {
  suite.add(name, { minSamples: 100, fn })
}

/** ***************** maxmind ********************** */
const maxmind = require('maxmind').openSync(DB_FILE)
experiment('maxmind', () => {
  maxmind.get(randip())
})

/** *************** mmdb-reader ******************** */
const mmdbReader = require('mmdb-reader')(DB_FILE)
experiment('mmdb-reader', () => {
  mmdbReader.lookup(randip())
})

/** *********** maxmind-db-reader ****************** */
const maxmindDbReader = require('maxmind-db-reader').openSync(DB_FILE)
experiment('maxmind-db-reader', () => {
  maxmindDbReader.getGeoDataSync(randip())
})

/** ***************** geoip-plus  ********************** */
const geoipPlus = require('geoip-plus').init(DB_FILE)
experiment('geoip-plus', () => {
  geoipPlus.lookupSync(randip())
})

/** ***************** geoip2  ********************** */
try {
  const geoip2 = require('geoip2').init(DB_FILE)
  experiment('geoip2', () => {
    geoip2.lookupSync(randip())
  })
} catch (err) {}

/** ***************** jgeoip  ********************** */
const jgeoip = new (require('jgeoip'))(DB_FILE)
experiment('jgeoip', () => {
  jgeoip.getRecord(randip())
})

console.log('Benchmarking...')
suite.run()
