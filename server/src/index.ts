import express from 'express'
import { listRouter } from './listRouter';

const app = express()
const PORT = process.env.PORT || 3001;
//Express can't parse JSON without it
app.use(express.json());

const main = async () => {
    app.use('/list',listRouter);
    app.listen(PORT, () => {
        console.log(`Server has started at port ${PORT}`);
    })
} 

main().catch((e) => {
    console.log(e);
});
