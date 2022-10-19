import base64url from 'base64url'
import { HmacSHA256 as hs256} from 'crypto-js'
require('dotenv').config()

const SECRET = process.env.SECRET || "123"

type Alg = "HS256" // | "SHA256"
type JWTHeader = {
    alg: Alg,
    typ: "JWT"
}

type Payload = {
    sub: number
}

const createToken = () => {
    const header : JWTHeader = {
        alg: "HS256",
        typ: "JWT"
    }
    const payload : Payload = {
        sub: 1
    }

    const toSign = [header, payload]
        .map(obj => JSON.stringify(obj))
        .map(json => base64url(json))
        .join('.')
    
    const signature = hs256(toSign, SECRET).toString()

    return `${toSign}.${signature}`
}

console.log(createToken())