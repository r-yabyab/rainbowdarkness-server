const express = require("express")
const rateLimit = require("express-rate-limit")
const {
    postRainbow,
    getAllRainbow
} = require('../controllers/rainbowController')

const router = express.Router()


const apiLimiter = rateLimit({
    windowMs: 86400000, //24 hours
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
})


// post to DB
router.post('/', postRainbow && apiLimiter)

// fetch from DB
router.get('/', getAllRainbow)



// addtional
// router.get('/', printAverageNumber)


module.exports = router