import {ErrorRequestHandler, Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

class listController {
    private prisma : PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    //TODO: Timestamps, isDone, etc.
    public createTask = async (req: Request, res: Response) => {
        const id = Number(req.params.listId);
        const {title, comment} = req.body;
        try {
            const createResults = await this.prisma
            .task.create({
                data: {
                    title: title,
                    comment: comment,
                    list_id: id,
                    is_done: false,
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
        console.log(req.params)
        const id = Number(req.params.listId);
        console.log(id);
        try {
            const tasks = await this.prisma
            .task.findMany({
                where: {
                    list_id: id,
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
        const listId = Number(req.params.listId)
        const taskId = Number(req.params.task)

        try {
            const upd = await this.prisma
            .task.updateMany({
                where: {
                    id: taskId,
                    list_id: listId,
                },
                data: { is_done: true },
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