export type Token = `${HeaderBase64Url}.${PayloadBase64Url}.${string}`

export type Alg = "HS256" // | "SHA256"

//TODO: make type be shown not as string in outer modules
export type HeaderBase64Url = string; 
export type JWTHeader = {
    alg: Alg,
    typ: "JWT"
}

export type PayloadBase64Url = string;
export type Payload = {
    sub: number
}