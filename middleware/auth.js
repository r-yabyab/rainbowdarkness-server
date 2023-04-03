const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const authConfig = {
    domain: 'dev-bxpbdydalm6tmklv.us.auth0.com',
    audience: 'data-relig',
}

const checkJwt = jwt({
    secret:jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ['RS256']
})

module.exports = {checkJwt};