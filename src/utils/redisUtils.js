import redisClient from '../config/redisConfig'

const set = async (key, value) => {
  try {
    // save the key in redis
    return await redisClient.set(key, value)
  } catch (err) {
    throw new Error(err)
  }
}

const get = async (key) => {
  try {
    // retrieve record from redis with that key
    return await redisClient.get(key)
  } catch (err) {
    throw new Error(err)
  }
}

const expire = async (key, seconds) => {
  try {
    // set a ttl so the record will expire after 10 days
    await redisClient.expire(key, seconds)
  } catch (err) {
    throw new Error(err)
  }
}

export { set, get, expire }
