'use strict'

module.exports = ({ randip, DB_FILE }) => {
  const mmdbReader = require('mmdb-reader')(DB_FILE)
  return () => {
    mmdbReader.lookup(randip())
  }
}
