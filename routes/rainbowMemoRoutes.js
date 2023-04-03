const express = require('express')
const {postRainbowMemo, getSingleRainbowMemo, getLastMemo} = require('../controllers/rainbowMemoController')
// const rateLimit = require('express-rate-limit')
// const { checkJwt } = require('../middleware/auth')
const router = express.Router()

// const apiLimiter = rateLimit({
//     windowMs: 86400000, //24 hours is  86400000
//     max: 1,
//     standardHeaders: true,
//     legacyHeaders: false,
//     store: new rateLimit.MemoryStore(),
// })

// router.post('/', checkJwt, apiLimiter, postRainbowMemo)
router.post('/', postRainbowMemo)
// router.post('/', apiLimiter, postRainbowMemo)
router.get('/single/:id', getSingleRainbowMemo)
router.get('/last', getLastMemo)

module.exports = router