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
import HelixService from "../services/HelixService";
import AgvService from "../usecases/AgvService";
import AgvRepositoryImpl from "../persistence/postgresql/implementation/AgvRepositoryImpl";
import AgvController from "../rest-api/AgvController";
import HealthController from "../rest-api/HealthController";

const routes = Router();

const helixService = new HelixService();
const userService = new UserService(new UserRepositoryImpl());
const zoneService = new ZoneService(new ZoneRepositoryImpl());
const rfidService = new RfidService(new RfidRepositoryImpl());
const agvService = new AgvService(new AgvRepositoryImpl(), helixService, rfidService, zoneService);

const userController = new UserController(userService);
const zoneController = new ZoneController(zoneService);
const rfidController = new RfidController(rfidService);
const agvController = new AgvController(agvService);
const healthController = new HealthController();

routes.get('/user/:id', userController.findById.bind(userController));
routes.delete('/user/:id', userController.delete.bind(userController));
routes.get('/user', userController.findAll.bind(userController));
routes.post('/user', userController.save.bind(userController));
routes.put('/user', userController.update.bind(userController));
routes.post('/login', userController.login.bind(userController));


routes.get('/zone/:id', zoneController.findById.bind(zoneController));
routes.delete('/zone/:id', zoneController.delete.bind(zoneController));
routes.get('/zone', zoneController.findAll.bind(zoneController));
routes.post('/zone', zoneController.save.bind(zoneController));


routes.get('/rfid/:id', rfidController.findById.bind(rfidController));
routes.delete('/rfid/:id', rfidController.delete.bind(rfidController));
routes.get('/rfid/helix/:id', rfidController.findByHelixId.bind(rfidController));
routes.get('/rfid', rfidController.findAll.bind(rfidController));
routes.post('/rfid', rfidController.save.bind(rfidController));
routes.post('/zone', zoneController.save.bind(zoneController));


routes.get('/agv/helix', agvController.findAllFromHelix.bind(agvController));
routes.get('/agv/helix/last/:id', agvController.getLastLocationFromHelix.bind(agvController));
routes.get('/agv/:id', agvController.findById.bind(agvController));
routes.get('/agv/helix/:id', agvController.findByHelixId.bind(agvController));
routes.delete('/agv/:id', agvController.delete.bind(agvController));
routes.get('/agv', agvController.findAll.bind(agvController));
routes.post('/agv', agvController.save.bind(agvController));

routes.get('/health', healthController.health.bind(healthController));

export default routes;
