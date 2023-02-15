const express = require("express")
const rateLimit = require("express-rate-limit")
const {
    postRainbow,
    getAllRainbow,
    getLatestRainbow
} = require('../controllers/rainbowController')

const router = express.Router()


const apiLimiter = rateLimit({
    windowMs: 86400000, //24 hours is  86400000
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    store: new rateLimit.MemoryStore(),
})


// post to DB
router.post('/', apiLimiter, postRainbow)
// router.post('/', postRainbow)

// fetch from DB
router.get('/', getAllRainbow)

router.get('/', getLatestRainbow)



// addtional
// router.get('/', printAverageNumber)


module.exports = router