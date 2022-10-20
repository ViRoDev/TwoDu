import { Result, Ok, Err, wrap } from "./Result";

const addOne = (x : number) : Result<number, string> => Ok(x+1);
const numBad = (x : number) : Result<number, string> => Err(`Error 1; Stopped when input was: ${x}`);
const numBad2 = (x : number) : Result<number, string> => Err(`Error 2; Stopped when input was:${x}`);

//TODO: import jest for testing

const test1 = () => {
console.log(
    [0]
    .map(addOne) // => Ok(1)
    .map(wrap(addOne)) // => Ok(2)
    .map(wrap(addOne)) // => Ok(3)
    .map(wrap(addOne)) // => Ok(4)
)}
test1();

const test2 = () => {
console.log(
    [0]
    .map(addOne) // 0 => Ok(1)
    .map(wrap(addOne)) // Ok(1) => Ok(2)
    .map(wrap(numBad)) // Ok(2) => Err('Error 1', stopped at 2)
    .map(wrap(addOne)) // Err('Error 1', stopped at 2) => Err('Error 1', stopped at 2)
)}
test2();

const test3 = () => {
console.log(
    [0]
    .map(addOne)
    .map(wrap(addOne))
    .map(wrap(addOne))
    .map(wrap(addOne))
    .map(wrap(numBad2))
    .map(wrap(addOne))
    .map(wrap(numBad))
    .map(wrap(addOne))
)}
test3();