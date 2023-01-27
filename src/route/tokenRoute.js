import express from 'express'
import * as tokenController from '../controller/tokenController'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to FABACUS server API')
})
router.post('/generate', tokenController.generateTokens)
router.get('/check/:token', tokenController.checkToken)
router.put('/redeem/:token', tokenController.redeemToken)

export default router
