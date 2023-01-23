const express = require("express")
const {
    postRainbow,
    getAllRainbow
} = require('../controllers/rainbowController')

const router = express.Router()





// post to DB
router.post('/', postRainbow)

// fetch from DB
router.get('/', getAllRainbow)



// addtional
// router.get('/', printAverageNumber)


module.exports = router