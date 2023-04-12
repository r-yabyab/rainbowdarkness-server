// const {expressjwt: jwt} = require('express-jwt')
// const jwks = require('jwks-rsa')


// const { auth } = require('express-oauth2-jwt-bearer')

// const checkJwt = auth({
//     audience: 'https://www.rainbowdarkness-api.com',
//     issuerBaseURL: 'https://dev-bxpbdydalm6tmklv.us.auth0.com/',
//     client_id: 'oZoxA3tZVzg4W4bFQctFITiXj9RuV0mO',
//     client_secret: '78HUH5f8l71CakSJhUdQTGCdPMD92nk0eLmP1qLwAUlt06B5amCT-G_qqzfB-Wxz',
//     tokenSigningAlg: 'RS256'
//   });

// module.exports = checkJwt



// const authConfig = {
//     domain: 'https://dev-bxpbdydalm6tmklv.us.auth0.com',
//     audience: 'https://www.rainbowdarkness-api.com',
// }

// const checkJwt = jwt({
//     secret: jwks.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: `https://dev-bxpbdydalm6tmklv.us.auth0.com/.well-known/jwks.json`
//     }),

//     audience: 'https://www.rainbowdarkness-api.com',
//     issuer: `https://dev-bxpbdydalm6tmklv.us.auth0.com/`,
//     algorithms: ['RS256']
// })

// module.exports = checkJwt