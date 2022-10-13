import {ErrorRequestHandler, Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

class taskController {
    private prisma : PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    //TODO: Timestamps, isDone, etc.
    async createTask(req: Request, res: Response) {
        const {title, comment, list_id} = req.body;
        try {
            const createResults = await this.prisma
            .task.create({
                data: {
                    title: title,
                    comment: comment,
                    list_id: list_id
                },
            });
            res.json(createResults);    
        }
        catch(err) {
            console.log(err);
            res.status(404).json({error: "Bad list id"})
        }
    }

    async getAllTasks(req: Request, res: Response) {
        const {list_id} = req.body;
        try {
            const tasks = await this.prisma
            .task.findMany({
                where: {
                    list_id: list_id,
                },
            });
            res.json(tasks);
        }
        //TODO: normal error logic
        catch(err) {
            console.log(err);
            res.status(418).json({error: "error"});
        }
    }

    async setDone(req: Request, res: Response) {
        const {task_id} = req.body;
        try {
            const upd = await this.prisma
            .task.update({
                where: {
                    id: task_id,
                },
                data: {
                    is_done: true,
                },
            })
            res.json(upd);
        }
        //TODO: normal error logic
        catch(err) {
            console.log(err);
            res.status(418).json("error")
        }
    }
}

const appendHeaders = (res: Response): Response => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    return res;
}
export default new taskController;