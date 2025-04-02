import {auth} from "express-oauth2-jwt-bearer"

const jwtCheck = auth({
    audience:"https://dev-w4gdvyd3ugiug370.us.auth0.com/api/v2/",
    issuerBaseURL:"https://dev-w4gdvyd3ugiug370.us.auth0.com", //it is my domain name
    tokenSigningAlg:"RS256"//it is standard methode
})

export default jwtCheck