'use strict'

module.exports = ({ randip, DB_FILE }) => {
  let m
  try {
    m = require('geoip2')
  } catch (err) {
    return false
  }

  const geoip2 = m.init(DB_FILE)
  return () => {
    geoip2.lookupSync(randip())
  }
}
