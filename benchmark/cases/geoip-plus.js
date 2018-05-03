'use strict'

module.exports = ({ randip, DB_FILE }) => {
  const geoipPlus = require('geoip-plus').init(DB_FILE)
  return () => {
    geoipPlus.lookupSync(randip())
  }
}
