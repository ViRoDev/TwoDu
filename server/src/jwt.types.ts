type Token = `${string}.${string}.${string}`

type Alg = "HS256" // | "SHA256"

type HeaderBase64Url = string; 
type JWTHeader = {
    alg: Alg,
    typ: "JWT"
}

type PayloadBase64Url = string;
type Payload = {
    sub: number
}