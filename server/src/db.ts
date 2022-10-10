import {Pool} from 'pg';

//TODO: add retry functionality for failing DB connection
const createConnectionToDataBase = async () => {
     const DB_CONNECTION_DATA = {
         user: "postgres",
         password: "postgres",
         host: "db",
         port: 5432,
         database: "twodu"
     }
     return new Pool(DB_CONNECTION_DATA);
    // let triesLeft = 5;
    // let test;
    // while(triesLeft) {
    //     try {
    //         test = new Pool(DB_CONNECTION_DATA);
    //     }
    //     catch (err) {
    //         console.log(err);
    //         triesLeft -= 1;
    //         console.log('Retrying...');
    //         await new Promise(res => setTimeout(res, 5000));
    //     }
    // }
    
    // return test ? test : new Pool();
}

export const pool = createConnectionToDataBase();