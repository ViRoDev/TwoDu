import {ErrorRequestHandler, Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

class listController {
    private prisma : PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    //TODO: Timestamps, isDone, etc.
    public createTask = async (req: Request, res: Response) => {
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

    public getListTasks = async (req: Request, res: Response) => {
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

    public setDone = async (req: Request, res: Response) => {
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
export default new listController;