const express = require("express")
const rateLimit = require("express-rate-limit")
const {
    postRainbow,
    postRainbowUser,
    getAllRainbow,
    getSingleRainbow,
    getLast,
    getLastNumUser,
    getWeek,
    getToday,
    putRainbowUserNum,
    putRainbowDetails
} = require('../controllers/rainbowController')
// const checkJwt = require("../middleware/auth")

const router = express.Router()

const apiLimiter = rateLimit({
    windowMs: 86400000, //24 hours is  86400000
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    store: new rateLimit.MemoryStore(),
})

const apiLimiter2 = rateLimit({
    windowMs: 10000, //10 secs
    // windowMs: 100000, //10 secs
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    store: new rateLimit.MemoryStore(),
})



// post to DB
router.post('/postnum', apiLimiter, postRainbow)
router.post('/postnumuser', apiLimiter, postRainbowUser)
// router.post('/', postRainbow)

router.patch('/:id', putRainbowUserNum)

router.patch('/:id', putRainbowDetails)

    // fetch from DB
// get total submissions + average
router.get('/', apiLimiter2, getAllRainbow)

// get single, currently not in use
router.get('/single/:id', apiLimiter2, getSingleRainbow)

//get all from most recent
router.get('/last', apiLimiter2, getLast)

//get user's numbers and all the other fields
router.get('/lastnumuser', apiLimiter2, getLastNumUser)

router.get('/week', apiLimiter2, getWeek)

router.get('/today', apiLimiter2, getToday)


// router.get('/', getLatestRainbow)



// addtional
// router.get('/', printAverageNumber)


module.exports = router