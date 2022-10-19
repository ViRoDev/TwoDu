import {Result, Ok, Err} from './Result'
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

const createToken = (header : JWTHeader, payload : Payload) : Result<Token,SignTokenError> => {
    const [header64, payload64] = [header, payload]
        .map(obj => JSON.stringify(obj))
        .map(json => base64url.encode(json))
        .join('.');
    
    const signature = signToken(header64, payload64, SECRET);
    if(signature.ok) return Ok(`${header64}.${payload64}.${signature}` as Token);
    
    return Err(signature.error);
}

enum SignTokenError {
    HeaderEmptyError,
    HeaderNotJsonError,
    HeaderNoHashAlgorythmError,
    HeaderWrongHashAlgorythmError
}
type HeaderBase64Url = string; type PayloadBase64Url = string;
//TODO: get rid of try/catch hell, PLEASE
const signToken = (header : HeaderBase64Url, payload: PayloadBase64Url, secret: string) : Result<string,SignTokenError> =>  {
    if(header === "") return Err(SignTokenError.HeaderEmptyError);
    //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" // { "alg" : "HS256", "typ": "JWT"}
    let json;
    try { 
        json = base64url.decode(header); 
    } catch { return Err(SignTokenError.HeaderNotJsonError) }

    let obj;
    try {
        obj = JSON.parse(json)
    } catch { return Err(SignTokenError.HeaderNotJsonError)}

    if(obj.alg === undefined) return Err(SignTokenError.HeaderNoHashAlgorythmError);
    
    const algorythm = obj.alg as Alg;

    switch (algorythm) {
        case 'HS256':
            return Ok(hs256(`${header}.${payload}`, secret).toString());
            break;
        default:
            return Err(SignTokenError.HeaderWrongHashAlgorythmError);
            break;
    }
}

type Token = `${string}.${string}.${string}`
//TODO: token check function too
//TODO: check values with Result type
const readToken = (tk : Token) => {  
    const [header64, payload64, signature] = tk.split('.');
    const [header, payload] = [header64, payload64]
        .map(b64url => base64url.decode(b64url))
        .map(json => JSON.parse(json)) 

    return [header, payload, signature] as [JWTHeader, Payload, string]
}

//TODO: token check function 
const verifyToken = (tk : Token) : Result<boolean, SignTokenError> => {
    const [header64, payload64, signature] = tk.split('.');
    const correctSigature = signToken(header64, payload64, SECRET);

    if(correctSigature.ok) return Ok(correctSigature.data === signature);
    return Err(correctSigature.error);
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
//console.log(`Verify: ${verifyToken(tk)}`);