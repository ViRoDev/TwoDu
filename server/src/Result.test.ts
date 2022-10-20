import { Result, Ok, Err, wrap } from "./Result";

const addOne = (x : number) : Result<number, string> => Ok(x+1);
const numBad = (x : number) : Result<number, string> => Err('Error 1');
const numBad2 = (x : number) : Result<number, string> => Err('Error 2');

//TODO: import jest for testing

const test1 = () => {
console.log(
    [0]
    .map(addOne)
    .map(wrap(addOne))
    .map(wrap(addOne))
    .map(wrap(addOne))
)}
test1();

const test2 = () => {
console.log(
    [0]
    .map(addOne)
    .map(wrap(addOne))
    .map(wrap(numBad))
    .map(wrap(addOne))
)}
test2();

const test3 = () => {
console.log(
    [0]
    .map(addOne)
    .map(wrap(addOne))
    .map(wrap(numBad2))
    .map(wrap(addOne))
    .map(wrap(numBad))
    .map(wrap(addOne))
)}
test3();