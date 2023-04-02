const express = require('express')
const {postRainbowMemo, getSingleRainbowMemo, getLastMemo} = require('../controllers/rainbowMemoController')
const router = express.Router()


router.post('/', postRainbowMemo)
router.get('/single/:id', getSingleRainbowMemo)
router.get('/last', getLastMemo)

module.exports = router