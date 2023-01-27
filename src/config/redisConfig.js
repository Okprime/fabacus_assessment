import * as redis from 'redis'

require('dotenv').config()

const redisClient = redis.createClient({
  socket: {
    host: 'redis',
    port: 6379
  }
})

redisClient.connect()

redisClient.on('connect', () => {
  console.log('Connected to Redis')
})

redisClient.on('error', (err) => {
  console.log(`Redis error: ${err}`)
})

export default redisClient
