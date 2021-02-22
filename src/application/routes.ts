import { Router } from 'express';

import UserController from "./../rest-api/UserController";
import UserService from "./../usecases/UserService";
import UserRepositoryImpl from "./../persistence/postgresql/implementation/UserRepositoryImpl";

import ZoneService from "../usecases/ZoneService";
import ZoneController from "../rest-api/ZoneController";
import ZoneRepositoryImpl from "../persistence/postgresql/implementation/ZoneRepositoryImpl";

import RfidRepositoryImpl from "../persistence/postgresql/implementation/RfidRepositoryImpl";
import RfidController from "../rest-api/RfidController";
import RfidService from "../usecases/RfidService";

const routes = Router();

const userService = new UserService(new UserRepositoryImpl());
const zoneService = new ZoneService(new ZoneRepositoryImpl());
const rfidService = new RfidService(new RfidRepositoryImpl(), zoneService);

const userController = new UserController(userService);
const zoneController = new ZoneController(zoneService);
const rfidController = new RfidController(rfidService);

routes.get('/user/:id', userController.findById.bind(userController));
routes.get('/user', userController.findAll.bind(userController));
routes.post('/user', userController.save.bind(userController));
routes.put('/user', userController.update.bind(userController));
routes.post('/login', userController.login.bind(userController));
routes.delete('/user/:id', userController.delete.bind(userController));


routes.get('/zone', zoneController.findAll.bind(zoneController));
routes.get('/zone/:id', zoneController.findById.bind(zoneController));
routes.post('/zone', zoneController.save.bind(zoneController));


routes.get('/rfid', rfidController.findAll.bind(rfidController));
routes.get('/rfid/:id', rfidController.findById.bind(rfidController));
routes.post('/rfid', rfidController.save.bind(rfidController));

export default routes;
