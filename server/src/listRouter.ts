import {Router} from 'express';
import listController from './listController';

export const listRouter = Router();

//Create
listRouter.post('/', listController.createTask);
//Get All Tasks for List
listRouter.get('/', listController.getListTasks);
//Mark Done
listRouter.put('/', listController.setDone);