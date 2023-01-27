import { v4 as uuidv4 } from 'uuid'
import { set, get, expire } from '../utils/redisUtils'

export const generateTokens = async (req, res) => {
  try {
    // Get the number of tokens to be generated from the request body
    const tokens = req.query.tokens

    // Validate that the number of tokens is a valid positive number
    if (!tokens || isNaN(tokens) || tokens < 1) throw new Error('invalid number of tokens')

    // Create an empty array to hold the generated tokens
    const tokenList = []

    // Loop through and generate the number of tokens requested
    for (let i = 0; i < tokens; i++) {
      const token = uuidv4()
      // Save each token to the Redis store as available
      await set(token, 'available')
      // Set an expiration time of 10 days for each token
      await expire(token, 864000)
      // Add each generated token to the tokenList array
      tokenList.push(token)
    }

    // Create a response object with the current date and the array of tokens
    const response = {
      created: new Date(),
      tokens: tokenList
    }

    // Send the response object as a JSON response
    return res.status(200).json(response)
  } catch (error) {
    // If there is an error, send a JSON response with the error message
    return res.status(400).json({ message: error.message })
  }
}

export const checkToken = async (req, res) => {
  try {
    // Retrieve the token from the request parameters
    const { token } = req.params

    // Use the get method to check the status of the token
    const status = await get(token)

    // If the token is not found or has expired, throw an error
    if (!status) {
      throw new Error('Invalid token or token has expired')
    }

    // If the token is valid, return its status in the JSON response
    return res.status(200).json({ status })
  } catch (error) {
    // If there is an error, send a JSON response with the error message
    return res.status(400).json({ message: error.message })
  }
}

export const redeemToken = async (req, res) => {
  try {
    // Get the token from the request params
    const { token } = req.params

    // Get the value of the token from the cache
    const tokenValue = await get(token)
    // If the token value is not found, return a 410 status
    if (!tokenValue) {
      return res.status(410).json({ result: 'expired' })
    }

    // If the token value is not 'available', return a 400 status
    if (tokenValue !== 'available') {
      return res.status(400).json({ result: 'already been redeemed' })
    }

    // Set the token value to 'redeemed'
    await set(token, 'redeemed')
    // Return a 200 status with a message
    return res.status(200).json({ result: 'ok' })
  } catch (error) {
    // Log the error
    console.error(error)
    // Return a 500 status with the error message
    return res.status(500).json({ message: error.message })
  }
}
