const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const authConfig = {
    domain: 'https://dev-bxpbdydalm6tmklv.us.auth0.com',
    audience: 'https://www.rainbowdarkness-api.com',
}

const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-bxpbdydalm6tmklv.us.auth0.com/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ['RS256']
})

// module.exports = {checkJwt};