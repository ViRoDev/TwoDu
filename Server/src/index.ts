import express from 'express'
import { taskRouter } from './taskRouter';

const app = express()
const PORT = process.env.PORT || 3001;
//Express can't parse JSON without it
app.use(express.json());

const main = async () => {
    app.use(taskRouter);
    app.listen(PORT, () => {
        console.log("Server has started");
    })
} 

main().catch((e) => {
    console.log(e);
});
