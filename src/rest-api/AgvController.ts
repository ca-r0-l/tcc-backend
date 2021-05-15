import { Request, Response } from "express";
import * as yup from 'yup';
import Agv from "../entities/Agv";
import AgvService from "../usecases/AgvService";

export default class AgvController {
    constructor(private agvService: AgvService) {}
    
    public async save(req: Request, res: Response) {
        const {
            name,
            helixId
        } = req.body;

        const data = {
            name,
            helixId
        };

        const schema = yup.object().shape({
            name: yup.string().required(),
            helixId: yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        return res.status(201).json(
            await this.agvService.save(new Agv(data))
        );
    }

    public async findAll(req: Request, res: Response) {
        return res.status(200).json(await this.agvService.findAll());
    }

    public async findById(req: Request, res: Response) {
        const { id } = req.params;

        const data = { id };

        const schema = yup.object().shape({
            id: yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        return res.status(200).json(await this.agvService.findById(id));
    }

    public async findByHelixId(req: Request, res: Response) {
        const { id } = req.params;

        const data = { id };

        const schema = yup.object().shape({
            id: yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        return res.status(200).json(await this.agvService.findByHelixId(id));
    }
    
    public async findAllFromHelix(req: Request, res: Response) {
        return res.status(200).json(await this.agvService.findAllFromHelix());
    }
    
    public async getLastLocationFromHelix(req: Request, res: Response) {
        const { id } = req.params;

        const data = { id };

        const schema = yup.object().shape({
            id: yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        return res.status(200).json(await this.agvService.getLastAgvStatusById(id));
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;

        const data = { id };

        const schema = yup.object().shape({
            id: yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });
        
        return res.status(200).json(await this.agvService.delete(id));
    }
}
