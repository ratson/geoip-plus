'use strict'

const { promisify } = require('util')
const geoip = require('geoip-plus')
const ipaddr = require('ipaddr.js')

module.exports = ({ dbPath, ctxKey = 'geoip' } = {}) => {
  const db = geoip.init(dbPath)
  const lookupAsync = promisify(db.lookup.bind(db))

  return (ctx, next) => {
    ctx[ctxKey] = {
      db,
      async lookupByIPv4(ip) {
        const ipv4 = ipaddr.process(ip || ctx.ip).toString()
        return lookupAsync(ipv4)
      },
    }

    return next()
  }
}
