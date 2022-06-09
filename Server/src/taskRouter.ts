import {Router} from 'express';
import taskController from './taskController';

export const taskRouter = Router();

//Create
taskRouter.post('/task', taskController.createTask);
//Get All Tasks for List
taskRouter.get('/task', taskController.getAllTasks);
//Mark Done
taskRouter.put('/task', taskController.setDone);