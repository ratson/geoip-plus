import test from 'ava'
import Koa from 'koa'
import request from 'supertest'

import geoip from '.'

test('ctx.geoip.lookupByIPv4', async t => {
  const app = new Koa()

  app.use(geoip())
  app.use(async ctx => {
    ctx.body = await ctx.geoip.lookupByIPv4('67.183.57.64')
  })

  const res = await request(app.callback()).get('/')

  t.is(res.body.country.iso_code, 'US')
  t.truthy(res.body.location.latitude)
  t.truthy(res.body.location.longitude)
  t.is(res.body.location.time_zone, 'America/Los_Angeles')
})
