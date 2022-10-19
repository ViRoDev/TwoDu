import { Err, Ok, Result } from '../Result'
import { SignTokenError } from './createToken'
import {create, verify} from './jwt'
import {JWTHeader, Payload} from './jwt.types'

const header : JWTHeader = {
    alg: "HS256",
    typ: "JWT"
}

const payload : Payload = {
    sub: 1
}

const test = () : Result<boolean, SignTokenError> => {
    const tk = create(header, payload)
    if(!tk.ok) return Err(tk.error);
    console.log(`Token: ${tk.data}`);

    const verified = verify(tk.data);
    if (!verified.ok) return Err(verified.error);

    console.log(`Verify: ${verified.data}`);

    return Ok(true);
}
test();

