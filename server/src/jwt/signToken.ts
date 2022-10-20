import base64url from "base64url";
import { HmacSHA256 } from "crypto-js";
import { Err, Ok, Result, wrap } from "../Result";
import { Alg, HeaderBase64Url, JWTHeader, PayloadBase64Url } from "./jwt.types";

export enum SignTokenError {
    UncaughtError = "UncaughtError",
    HeaderEmptyError = "Header is empty or undefined",
    HeaderNotJsonError = "Header isn't JSON",
    HeaderNoHashAlgorythmError = "There is no algorythm defined",
    HeaderWrongHashAlgorythmError = "This algorythm isn't supported, if it exists"
}

export const signToken = (header : HeaderBase64Url, payload: PayloadBase64Url, secret: string) : Result<string,SignTokenError> =>  {
    if(typeof header === undefined || header === "") return Err(SignTokenError.HeaderEmptyError);

    const jwtHeader = [header]
        .map(decodeBase64url)
        .map(wrap(parseJson))
        .at(0)
    
    if(typeof jwtHeader === 'undefined') return Err(SignTokenError.HeaderNotJsonError);
    if(!jwtHeader.ok) return Err(jwtHeader.error) 

    const algorythm = jwtHeader.data.alg
    switch (algorythm) {
        case 'HS256':
            const signature = HmacSHA256(`${header}.${payload}`, secret).toString();
            return Ok(signature)
        default:
            return Err(SignTokenError.HeaderWrongHashAlgorythmError);
    }
}

const decodeBase64url = (str : string) : Result<string, SignTokenError> => {
    try {
        if(str.length < 1) return Err(SignTokenError.HeaderEmptyError);
        const decoded = base64url.decode(str);
        return Ok(decoded);

    } catch { return Err(SignTokenError.UncaughtError); }
}

const checkAlgorythm = (obj : {alg: string}) : obj is JWTHeader => {
    switch(obj.alg) {
        case "HS256":
            return true;
        default:
            return false;
    }
}

const objectIsHeader = (obj : any) : obj is {alg : string} => 
obj !== undefined 
&& (obj.alg) !== undefined 
&& typeof(obj.alg) === "string";

const parseJson = (json : string) : Result<JWTHeader, SignTokenError> => {
    try {
        const obj = JSON.parse(json);
        if(!objectIsHeader(obj)) return Err(SignTokenError.HeaderNotJsonError);
        if(!checkAlgorythm(obj)) return Err(SignTokenError.HeaderWrongHashAlgorythmError);

        return Ok(obj)
    } catch { return Err(SignTokenError.UncaughtError); }
}