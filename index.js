require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const rainbowRoutes = require('./routes/rainbowRoutes')
const rainbowMemoRoutes = require('./routes/rainbowMemoRoutes')
const { Configuration, OpenAIApi } = require('openai')
const rateLimit = require('express-rate-limit')
// const path = require("path")
// const { auth } = require('express-oauth2-jwt-bearer')

// const guard = require('express-jwt-permissions')()


const app = express()

const apiLimiter = rateLimit({
        windowMs: 10000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        store: new rateLimit.MemoryStore(),
    })


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

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_KEY,
    })
    const openai = new OpenAIApi(configuration)

app.get('/aicomment', cors(), apiLimiter, async (req, res) => {
    const todayNumber = req.query.todaynumber
    const yesterdayNumber = req.query.yesterdaynumber

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: 
        [
            // {role:'system', content: `Don't make any comments, keep things accurate and factual.`},
            // {role:'user', content: `Can you give me 1 happiness question (higher than 0.5) from published psychology peer reviewed articles. Include inline citation in parenthesis after the question. Also make sure the question can be answered based on current day from 0-10, and can be repeated everyday. (IMPORTANT: GIVE ME ONLY THE QUESTION, CITATION, AND R VALUE IN ONE SENTENCE with only the full citation in the 2nd sentence and nothing else. These are scientific journals, please don't compromise their findings by making things up.)`},
            {
                role: 'user',
                content: `For the question "How happy are you today?" I am a ${todayNumber}, before was a ${yesterdayNumber}. In your response, give me a single sentence response in regards to my number, don't give me any advice, just give me a comment.`
            },
        ],
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    res.send(completion.data.choices[0].message)
    // console.log(completion.data.choices[0].message)
    // console.log(todayNumber + "today number")
    // console.log(yesterdayNumber + "yesterday number")
})

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


    //staging