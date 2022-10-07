import {Pool} from 'pg';

export const pool: Pool = new Pool(
    {
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: 5432,
        database: "twodu"
    }
)