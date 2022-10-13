import {Router} from 'express';
import taskController from './taskController';

export const taskRouter = Router();

//Create
taskRouter.post('/', taskController.createTask);
//Get All Tasks for List
taskRouter.get('/', taskController.getAllTasks);
//Mark Done
taskRouter.put('/', taskController.setDone);