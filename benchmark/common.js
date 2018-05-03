'use strict'

const { city } = require('geoip-database')

const randip = () =>
  `${Math.ceil(Math.random() * 254)}.${Math.ceil(
    Math.random() * 254,
  )}.${Math.ceil(Math.random() * 254)}.${Math.ceil(Math.random() * 254)}`

exports.randip = randip

exports.DB_FILE = city
