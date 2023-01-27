/* eslint-disable no-undef */
import request from 'supertest'
const app = require('../../src/index').default

describe('POST /generate', () => {
  it('should generate tokens', async () => {
    const res = await request(app)
      .post('/generate')
      .query({ tokens: 2 })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('created')
    expect(res.body).toHaveProperty('tokens')
    expect(res.body.tokens.length).toBe(2)
  })
})

describe('GET /check/:token', () => {
  it('should return status code 200 and the status of the token', async () => {
    // Generate a token and redeem it
    const tokenRes = await request(app)
      .post('/generate')
      .query({ tokens: 1 })

    const token = tokenRes.body.tokens[0]

    // Test the checkToken endpoint
    const res = await request(app).get(`/check/${token}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual('available')
  })
})

describe('PUT /redeem/:token', () => {
  it('should return status code 200 and the token has been redeemed', async () => {
    // Generate a token and redeem it
    const tokenRes = await request(app)
      .post('/generate')
      .query({ tokens: 1 })

    const token = tokenRes.body.tokens[0]

    // Test the redeemToken endpoint
    const res = await request(app).put(`/redeem/${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.result).toEqual('ok')
  })
})
