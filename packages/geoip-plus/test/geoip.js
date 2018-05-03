'use strict'

const { expect } = require('chai')
const geoip = require('..')

describe('geoip', () => {
  context('with the default geoip database', () => {
    before(() => {
      geoip.init()
    })
    describe('#lookupSimpleSync', () => {
      it('returns a record with the expected values', () => {
        const result = geoip.lookupSimpleSync('67.183.57.64')
        expect(result.subdivision).to.equal('WA')
        expect(result.country).to.equal('US')
        expect(result.continent).to.equal('NA')
        expect(result.postal).to.equal('98012')
        expect(result.location.latitude).to.be.a('number')
        expect(result.location.longitude).to.be.a('number')
      })
      it('throws an exception when an invalid ip address is entered', () => {
        try {
          geoip.lookupSimpleSync('asdf')
        } catch (error) {
          expect(error).to.exist
          return
        }
        expect.fail('Expected lookupSimpleSync to throw')
      })
    })

    describe('#lookupSimple', () => {
      it('returns a record with the expected values', done => {
        geoip.lookupSimple('67.183.57.64', (error, result) => {
          expect(result.subdivision).to.equal('WA')
          expect(result.country).to.equal('US')
          expect(result.continent).to.equal('NA')
          expect(result.postal).to.equal('98012')
          expect(result.location.latitude).to.be.a('number')
          expect(result.location.longitude).to.be.a('number')
          done()
        })
      })
    })
  })
})
