import {Request, Response} from 'express'
import { pool } from './db';

class taskController {
    //TODO: Timestamps, isDone, etc.
    async createTask(req: Request, res: Response) {
        const {title, comment, list_id} = req.body;
        pool.query("INSERT INTO task (title, comment, list_id, is_done, created) \
                    VALUES ($1, $2, $3, false, current_timestamp) \
                    RETURNING *;", 
                    [title, comment, list_id], 
                    (error, results) => {
                        if(error) throw error
                        res = appendHeaders(res);
                        //[0] for returning a single object, not an array
                        res.json(results.rows[0])
                    });
    }

    async getAllTasks(req: Request, res: Response) {
        console.log(req.query);
        pool.query("SELECT * \
                    FROM task \
                    WHERE task.list_id = $1", 
                    [req.query.list_id],
                    (error, results) => {
                        if(error) throw error
                        res = appendHeaders(res);
                        res.json(results.rows)
                    });
    }

    async setDone(req: Request, res: Response) {
        const task_id : number = req.body
        pool.query("UPDATE task \
                    SET is_done = true, done = current_timestamp \
                    WHERE id = $1",
                    [task_id],
                    (error, results) => {
                        if(error) throw error
                        res = appendHeaders(res);
                        res.json(results.rows)
                    });
    }
}

const appendHeaders = (res: Response): Response => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    return res;
}
export default new taskController;