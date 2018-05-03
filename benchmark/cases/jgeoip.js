'use strict'

module.exports = ({ randip, DB_FILE }) => {
  const jgeoip = new (require('jgeoip'))(DB_FILE)
  return () => {
    jgeoip.getRecord(randip())
  }
}
