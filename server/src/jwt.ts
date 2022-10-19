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

const createToken = (header : JWTHeader, payload : Payload) : Token => {
    const toSign = [header, payload]
        .map(obj => JSON.stringify(obj))
        .map(json => base64url.encode(json))
        .join('.') as HeaderPayload;
    
    const signature = signToken(toSign, SECRET);

    return `${toSign}.${signature}` as Token;
}

type HeaderPayload = `${string}.${string}`
const signToken = (hp : HeaderPayload, secret: string) => {
    const header64 : string = hp.split(".").at(0) || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" // { "alg" : "HS256", "typ": "JWT"}
    const header : JWTHeader = JSON.parse(base64url.decode(header64));
    const alg : Alg = header.alg;
    
    //implement more algorythms?
    switch (alg) {
        case "HS256":
            return hs256(hp, secret).toString()
            break;
    }
}

type Token = `${string}.${string}.${string}`
const readToken = (tk : Token) => {
    const [header64, payload64, signature] = tk.split('.');
    const [header, payload] = [header64, payload64]
        .map(b64url => base64url.decode(b64url))
        .map(json => JSON.parse(json)) 

    return [header, payload, signature] as [JWTHeader, Payload, string]
}

const verifyToken = (tk : Token) => {
    const [header64, payload64, signature] = tk.split('.');
    return signToken(`${header64}.${payload64}`, SECRET) === signature;
}

const header : JWTHeader = {
    alg: "HS256",
    typ: "JWT"
}

const payload : Payload = {
    sub: 1
}

const tk = createToken(header, payload)
console.log(`Token: ${tk}`);
console.log(`Verify: ${verifyToken(tk)}`);