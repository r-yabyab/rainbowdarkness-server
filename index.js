require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const rainbowRoutes = require('./routes/rainbowRoutes')
const rainbowMemoRoutes = require('./routes/rainbowMemoRoutes')
// const rateLimit = require('express-rate-limit')
// const path = require("path")
// const { auth } = require('express-oauth2-jwt-bearer')

// const guard = require('express-jwt-permissions')()

// const { Configuration, OpenAIApi } = require('openai')

const app = express()



//middleware()
app.use(cors());
app.use(express.json())

let count = 0

app.use((req, res, next) => {
    console.log(req.path, req.method, count)
    count++
    next()
})


app.use('/api/rainbows', rainbowRoutes)

app.use('/api/memos', rainbowMemoRoutes)
// app.use('/api/memos', jwtCheck, rainbowMemoRoutes)


const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(port, () => {
            console.log('connected to db & listening on port', port)
        })
    })
    .catch((error) => {
        console.log(error)
    })