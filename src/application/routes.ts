import { Router } from 'express';

import UserController from "./../rest-api/UserController";
import UserService from "./../usecases/UserService";
import UserRepositoryImpl from "./../persistence/postgresql/implementation/UserRepositoryImpl";
import ZoneService from "../usecases/ZoneService";
import ZoneController from "../rest-api/ZoneController";
import ZoneRepositoryImpl from "../persistence/postgresql/implementation/ZoneRepositoryImpl";

const routes = Router();
const userController = new UserController(new UserService(new UserRepositoryImpl()));
const zoneController = new ZoneController(new ZoneService(new ZoneRepositoryImpl()));

routes.get('/user', userController.findAll.bind(userController));
routes.get('/user/:id', userController.findById.bind(userController));
routes.post('/user', userController.save.bind(userController));
routes.post('/login', userController.login.bind(userController));


routes.get('/zone', zoneController.findAll.bind(zoneController));
routes.get('/zone/:id', zoneController.findById.bind(zoneController));
routes.post('/zone', zoneController.save.bind(zoneController));

export default routes;
