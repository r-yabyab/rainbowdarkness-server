require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const rateLimit = require('express-rate-limit')
// const path = require("path")
const rainbowRoutes = require('./routes/rainbowRoutes')
const rainbowMemoRoutes = require('./routes/rainbowMemoRoutes')

// const { auth } = require('express-oauth2-jwt-bearer')

// const guard = require('express-jwt-permissions')()

// const { Configuration, OpenAIApi } = require('openai')

const app = express()

// const apiLimiter = rateLimit({
//         windowMs: 10000,
//         max: 10,
//         standardHeaders: true,
//         legacyHeaders: false,
//         store: new rateLimit.MemoryStore(),
//     })
//     const configuration = new Configuration({
//         apiKey: process.env.OPENAI_KEY,
//     })
//     const openai = new OpenAIApi(configuration)

//middleware()
app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    console.log(req.path, req.method)
    next()
})


// const jwtCheck = auth({
//     audience: 'https://www.rainbowdarkness-api.com',
//     issuerBaseURL: 'https://dev-bxpbdydalm6tmklv.us.auth0.com/',
//     // tokenSigningAlg: 'RS256'
//   });

// app.get('/memos', jwtCheck, guard.check(['read:memos']), function (req, res) {
//     res.send('Secured Resource')
//     res.json({
//         json1: 'This is the first json',
//         json2: 'this is json2'
//     })
// })
app.use('/api/rainbows', rainbowRoutes)

app.use('/api/memos', rainbowMemoRoutes)
// app.use('/api/memos', jwtCheck, rainbowMemoRoutes)



// app.get('/aineg', cors(), apiLimiter, async (req, res) => {
//     const completion = await openai.createChatCompletion({
//         model:'gpt-3.5-turbo',
//         messages:[
//             {role:'system', content: `Don't make any comments, keep things accurate and factual.`},
//             // {role:'user', content: `Can you give me 1 negative question that is inversely correlated  with happiness (higher than -0.5) from published psychology peer reviewed articles. Include inline citation in parenthesis after the question. Also make sure the question can be answered based on current day from 0-10, and can be repeated everyday. (IMPORTANT: GIVE ME ONLY THE QUESTION, CITATION, AND R VALUE IN ONE SENTENCE with only the full citation in the 2nd sentence and nothing else. These are scientific journals, please don't compromise their findings by making things up.)`},
//             {role:'user', content: `Can you give me 1 negative question that is inversely correlated  with happiness (higher than -0.5) from published psychology peer reviewed articles. Include inline citation in parenthesis after the question. Also make sure the question can be answered based on current day from 0-10, and can be repeated everyday. (IMPORTANT: GIVE ME ONLY A ONE SENTENCE RESPONSE --THE QUESTION AND PARENTHETICAL CITATION(AUTHORS AND YEAR ONLY) . These are scientific journals, please don't compromise their findings by making things up.)`},
//         ],
//         temperature: 0.7,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//     })
//     res.send(completion.data.choices[0].message)
//     console.log(completion.data.choices[0].message)
// })

// app.get('/aipos', cors(), apiLimiter, async (req, res) => {
//     const completion = await openai.createChatCompletion({
//         model:'gpt-3.5-turbo',
//         messages:[
//             {role:'system', content: `Don't make any comments, keep things accurate and factual.`},
//             // {role:'user', content: `Can you give me 1 happiness question (higher than 0.5) from published psychology peer reviewed articles. Include inline citation in parenthesis after the question. Also make sure the question can be answered based on current day from 0-10, and can be repeated everyday. (IMPORTANT: GIVE ME ONLY THE QUESTION, CITATION, AND R VALUE IN ONE SENTENCE with only the full citation in the 2nd sentence and nothing else. These are scientific journals, please don't compromise their findings by making things up.)`},
//             {role:'user', content: `Can you give me 1 happiness question (higher than 0.5) from published psychology peer reviewed articles. Include inline citation in parenthesis after the question. Also make sure the question can be answered based on current day from 0-10, and can be repeated everyday. (IMPORTANT: GIVE ME ONLY A ONE SENTENCE RESPONSE --THE QUESTION AND PARENTHETICAL CITATION(AUTHORS AND YEAR ONLY). These are scientific journals, please don't compromise their findings by making things up.)`},
//         ],
//         temperature: 0.9,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//     })
//     res.send(completion.data.choices[0].message)
//     console.log(completion.data.choices[0].message)
// })


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



// const _dirname = path.dirname("")
// const buildPath = path.join(_dirname , "../client/build")
// app.use(express.static(buildPath))

// // gets frontend running through backend
// app.get("/*", function(req, res) {
//     res.sendFile(
//         path.join(__dirname, "../client/build/index.html"),
//         function (err) {
//             if (err) {
//                 res.status(500).send(err);
//             }
//         }
//     )
// })