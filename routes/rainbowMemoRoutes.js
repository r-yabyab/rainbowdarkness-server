const express = require('express')
const {postRainbowMemo} = require('../controllers/rainbowController')
const router = express.Router()


router.post('/', postRainbowMemo)
router.get('/', getAllRainbowMemo)

module.exports = router