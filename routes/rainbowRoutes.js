const express = require("express")
const rateLimit = require("express-rate-limit")
const {
    postRainbow,
    getAllRainbow,
    getSingleRainbow,
    getLast,
    getWeek,
    getToday
} = require('../controllers/rainbowController')

const router = express.Router()

const apiLimiter = rateLimit({
    windowMs: 86400000, //24 hours is  86400000
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    store: new rateLimit.MemoryStore(),
})

const apiLimiter2 = rateLimit({
    windowMs: 10000, //10 secs
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    store: new rateLimit.MemoryStore(),
})



// post to DB
router.post('/', apiLimiter, postRainbow)
// router.post('/', postRainbow)

    // fetch from DB
// get total submissions + average
router.get('/', apiLimiter2, getAllRainbow)

router.get('/single/:id', getSingleRainbow)

//get all from most recent
router.get('/last', getLast)

router.get('/week', apiLimiter2, getWeek)

router.get('/today', getToday)


// router.get('/', getLatestRainbow)



// addtional
// router.get('/', printAverageNumber)


module.exports = router