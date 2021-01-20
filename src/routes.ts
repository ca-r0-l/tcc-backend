import { Router } from 'express';

import UserController from "./rest-api/UserController";
import UserService from "./usecases/UserService";
import UserRepositoryImpl from "./persistence/postgresql/implementation/UserRepositoryImpl";

const routes = Router();
const userController = new UserController(new UserService(new UserRepositoryImpl()));

routes.post('/user', userController.save.bind(userController));

export default routes;