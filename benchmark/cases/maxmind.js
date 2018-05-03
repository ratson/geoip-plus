'use strict'

module.exports = ({ randip, DB_FILE }) => {
  const maxmind = require('maxmind').openSync(DB_FILE)
  return () => {
    maxmind.get(randip())
  }
}
