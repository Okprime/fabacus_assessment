/* eslint-disable no-undef */
import { generateTokens } from '../../src/controller/tokenController'
import { set, expire, get } from '../../src/utils/redisUtils'
import * as redis from 'redis'

jest.mock('redis', () => {
  return {
    createClient: jest.fn().mockReturnValue({
      flushall: jest.fn(),
      quit: jest.fn()
    })
  }
})

beforeEach(() => {
  jest.clearAllMocks()
  redis.createClient().flushall.mockReset()
})

jest.mock('../../src/utils/redisUtils', () => {
  return {
    set: jest.fn().mockReturnValue(Promise.resolve()),
    expire: jest.fn().mockReturnValue(Promise.resolve()),
    get: jest.fn()
  }
})

describe('generateTokens', () => {
  it('should generate the specified number of tokens and set them in Redis', async () => {
    const req = {
      query: { tokens: 3 }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await generateTokens(req, res)

    expect(set).toHaveBeenCalledTimes(3)
    expect(expire).toHaveBeenCalledTimes(3)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return an error if an invalid number of tokens is specified', async () => {
    const req = {
      query: { tokens: -3 }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await generateTokens(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'invalid number of tokens' })
  })
})

describe('checkToken', () => {
  it('should return "valid" for a valid token', async () => {
    get.mockResolvedValueOnce('available')
    expect(get).toHaveBeenCalledTimes(0)
  })

  it('should return "invalid" for an invalid token', async () => {
    get.mockResolvedValueOnce(null)
    expect(get).toHaveBeenCalledTimes(0)
  })
})

describe('redeemToken', () => {
  it('should return "redeemed" for a valid token', async () => {
    get.mockResolvedValueOnce('available')
    expect(get).toHaveBeenCalledTimes(0)
  })

  it('should return "invalid" for an invalid token', async () => {
    get.mockResolvedValueOnce(null)
    expect(get).toHaveBeenCalledTimes(0)
  })

  it('should return "already redeemed" for a token that has already been redeemed', async () => {
    get.mockResolvedValueOnce('redeemed')
    expect(get).toHaveBeenCalledTimes(0)
  })
})

afterAll(() => {
  redis.createClient().quit()
})
