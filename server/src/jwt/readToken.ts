import base64url from "base64url";

//TODO: check values with Result type
export const readToken = (tk : Token) => {  
    const [header64, payload64, signature] = tk.split('.');
    const [header, payload] = [header64, payload64]
        .map(b64url => base64url.decode(b64url))
        .map(json => JSON.parse(json)) 

    return [header, payload, signature] as [JWTHeader, Payload, string]
}