import {Router} from 'express';
import listController from './listController';

export const listRouter = Router();

//Create
listRouter.post('/:listId', listController.createTask);
//Get All Tasks for List
listRouter.get('/:listId', listController.getListTasks);
//Mark Done
listRouter.put('/:listId/:taskId', listController.setDone);