import { Result, Ok, Err } from "../Result";
import { sign } from "./jwt";
import base64url from "base64url";
require('dotenv').config()

const SECRET = process.env.SECRET || "123";

export const createToken = (header : JWTHeader, payload : Payload) : Result<Token,SignTokenError> => {
    const [header64, payload64] = [header, payload]
        .map(obj => JSON.stringify(obj))
        .map(json => base64url.encode(json))
        .join('.');
    
    const signature = sign(header64, payload64, SECRET);
    if(signature.ok) return Ok(`${header64}.${payload64}.${signature}` as Token);
    
    return Err(signature.error);
}

export enum SignTokenError {
    HeaderEmptyError,
    HeaderNotJsonError,
    HeaderNoHashAlgorythmError,
    HeaderWrongHashAlgorythmError
}