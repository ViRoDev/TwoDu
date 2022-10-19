import { createToken, SignTokenError } from './createToken'
import { signToken } from './signToken'
import { verifyToken } from './verifyToken'
import { readToken } from './readToken'

export const create = createToken;
export const sign = signToken;
export const verify = verifyToken;
export const read = readToken;