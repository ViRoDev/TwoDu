import base64url from "base64url";
import { HmacSHA256 } from "crypto-js";
import { SignTokenError } from "./createToken";
import { Err, Ok, Result } from "../Result";

//TODO: get rid of try/catch hell, PLEASE
export const signToken = (header : HeaderBase64Url, payload: PayloadBase64Url, secret: string) : Result<string,SignTokenError> =>  {
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
            return Ok(HmacSHA256(`${header}.${payload}`, secret).toString());
            break;
        default:
            return Err(SignTokenError.HeaderWrongHashAlgorythmError);
            break;
    }
}