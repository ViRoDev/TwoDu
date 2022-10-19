import { createToken, SignTokenError } from './createToken'
import { signToken } from './signToken'
import { verifyToken } from './verifyToken'
import { readToken } from './readToken'

export const create = createToken;
export const sign = signToken;
export const verify = verifyToken;
export const read = readToken;

const header : JWTHeader = {
    alg: "HS256",
    typ: "JWT"
}

const payload : Payload = {
    sub: 1
}

const tk = create(header, payload)
console.log(`Token: ${tk}`);
//console.log(`Verify: ${verifyToken(tk)}`);