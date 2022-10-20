//type Ok<T> = {ok: true, data: T};
export interface Ok<T> {
    ok: true,
    data: T
}
export const Ok = <T, >(data: T) : Ok<T> => ({ok: true, data: data})

//type Err<E> = {ok: false, error: E};
export interface Err<E> {
    ok: false,
    error: E
}

export const Err = <E, >(error: E) : Err<E> => ({ok: false, error: error})

export type Result<T,E> = Ok<T> | Err<E>

const wrap = <Input, Output>(fn : (_:Input) => Result<Output, any>) => 
  (res: Result<Input, any>) : Result<Output, any> => 
    res.ok ? fn(res.data) : res