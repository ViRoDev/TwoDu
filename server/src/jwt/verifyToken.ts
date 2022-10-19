import { SignTokenError } from "./createToken";
import { Err, Ok, Result } from "../Result";
import { SECRET } from "./secretJWT";
import { signToken } from "./signToken";

//TODO: token check function 
export const verifyToken = (tk : Token) : Result<boolean, SignTokenError> => {
    const [header64, payload64, signature] = tk.split('.');
    const correctSigature = signToken(header64, payload64, SECRET);

    if(correctSigature.ok) return Ok(correctSigature.data === signature);
    return Err(correctSigature.error);
}