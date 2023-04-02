const express = require('express')
const {postRainbowMemo, getSingleRainbowMemo} = require('../controllers/rainbowMemoController')
const router = express.Router()


router.post('/', postRainbowMemo)
router.get('/', getSingleRainbowMemo)

module.exports = router