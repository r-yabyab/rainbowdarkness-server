require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path")
const rainbowRoutes = require('./routes/rainbowRoutes')
const rateLimit = require("express-rate-limit")


const app = express()

const apiLimiter = rateLimit({
    windowMs: 86400000, //24 hours
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
})

//middleware
app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


app.use('/api/rainbows', apiLimiter)
app.use('/api/rainbows', rainbowRoutes)

// app.get('/api/rainbows', (req, res) => {
//     res.send("test")
// })

const _dirname = path.dirname("")
const buildPath = path.join(_dirname , "../client/build")
app.use(express.static(buildPath))

// gets frontend running through backend
app.get("/*", function(req, res) {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    )
})

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

//      heroku sucks, don't use
// if running on heroku (node.env), then fire code
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('../client/build'))
// }



// app.listen(process.env.PORT, () => {
//     console.log('listening on port 4000!', process.env.PORT)
// })