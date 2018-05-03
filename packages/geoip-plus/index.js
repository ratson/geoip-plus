'use strict'

const db = require('geoip-database')
const mmdb = require('./lib/node_mmdb.node')

const _defaultPath = db.city
let _defaultDB = null

exports.MMDB = mmdb.MMDB

exports.init = path => {
  _defaultDB = new mmdb.MMDB(path || _defaultPath)
  return _defaultDB
}

exports.cleanup = () => {
  _defaultDB = null
}

exports.lookup = (address, callback) => {
  if (!_defaultDB) {
    console.log(
      'WARNING: ipgeo2 database not initialized, initializing default now.',
    )
    exports.init()
  }
  _defaultDB.lookup(address, callback)
}

exports.lookupSync = address => {
  if (!_defaultDB) {
    console.log(
      'WARNING: ipgeo2 database not initialized, initializing default now.',
    )
    exports.init()
  }
  return _defaultDB.lookupSync(address)
}

function parseResult(result) {
  return {
    country: result.country ? result.country.iso_code : undefined,
    continent: result.continent ? result.continent.code : undefined,
    postal: result.postal ? result.postal.code : undefined,
    city: result.city && result.city.names ? result.city.names.en : undefined,
    location: result.location,
    subdivision: result.subdivisions
      ? result.subdivisions[0].iso_code
      : undefined,
  }
}

exports.lookupSimple = (address, callback) => {
  exports.lookup(address, (error, result) => {
    if (result) {
      callback(null, parseResult(result))
    } else {
      callback(error, null)
    }
  })
}

exports.lookupSimpleSync = address => {
  const result = exports.lookupSync(address)
  if (result) {
    return parseResult(result)
  }
  return null
}
