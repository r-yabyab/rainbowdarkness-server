const express = require('express')
const {postRainbowMemo} = require('../controllers/rainbowMemoController')
const router = express.Router()


router.post('/', postRainbowMemo)
router.get('/', getAllRainbowMemo)

module.exports = router