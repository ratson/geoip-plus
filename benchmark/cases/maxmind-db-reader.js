'use strict'

module.exports = ({ randip, DB_FILE }) => {
  const maxmindDbReader = require('maxmind-db-reader').openSync(DB_FILE)
  return () => {
    maxmindDbReader.getGeoDataSync(randip())
  }
}
