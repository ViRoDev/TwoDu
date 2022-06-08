import {Pool} from 'pg';

const pool: Pool = new Pool(
    {
        user: "postgres",
        password: "",
        host: "localhost",
        port: 3001,
        database: "todo"
    }
)