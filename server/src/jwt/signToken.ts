import base64url from "base64url";
import { HmacSHA256 } from "crypto-js";
import { Err, Ok, Result } from "../Result";
import { Alg, HeaderBase64Url, JWTHeader, PayloadBase64Url } from "./jwt.types";

export enum SignTokenError {
    UncaughtError = "UncaughtError",
    HeaderEmptyError = "Header is empty or undefined",
    HeaderNotJsonError = "Header isn't JSON",
    HeaderNoHashAlgorythmError = "There is no algorythm defined",
    HeaderWrongHashAlgorythmError = "This algorythm isn't supported, if it exists"
}

export const signToken = (header : HeaderBase64Url, payload: PayloadBase64Url, secret: string) : Result<string,SignTokenError> =>  {
    if(header === "") return Err(SignTokenError.HeaderEmptyError);
    
    const decode = decodeBase64url(header);
    if (!decode.ok) return Err(decode.error);
    const json = decode.data;

    const parse = parseJson(json);
    if (!parse.ok) return Err(parse.error);
    const obj = parse.data;

    if(obj.alg === undefined) return Err(SignTokenError.HeaderNoHashAlgorythmError);
    
    const algorythm = obj.alg as Alg;

    switch (algorythm) {
        case 'HS256':
            return Ok(HmacSHA256(`${header}.${payload}`, secret).toString());
            break;
        default:
            return Err(SignTokenError.HeaderWrongHashAlgorythmError);
            break;
    }
}

const decodeBase64url = (str : string) : Result<string, SignTokenError> => {
    try {
        if(str.length < 1) return Err(SignTokenError.HeaderEmptyError);
        const decoded = base64url.decode(str);
        return Ok(decoded);

    } catch { return Err(SignTokenError.UncaughtError); }
}

const parseJson = (json : string) : Result<JWTHeader, SignTokenError> => {
    try {
        const obj = JSON.parse(json);
        return Ok(obj)
    } catch { return Err(SignTokenError.HeaderNotJsonError); }
}