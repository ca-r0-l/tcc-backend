import { Request, Response } from "express";
import * as yup from 'yup';
import ZoneService from "../usecases/ZoneService";
import Zone from "../entities/Zone";

export default class ZoneController {
    constructor(private zoneService: ZoneService) {}
    
    public async save(req: Request, res: Response) {
        const {
            name,
            rfid
        } = req.body;

        const data = {
            name,
            rfid
        };

        const schema = yup.object().shape({
            name: yup.string().required(),
            rfid: yup.object({
                id: yup.string().required(),
                name: yup.string().required(),
                helixId: yup.string().required()
            }).required()
        });

        await schema.validate(data, {
            abortEarly: false
        });
        return res.status(201).json(
            await this.zoneService.save(new Zone(data))
        );
    }

    public async findAll(req: Request, res: Response) {
        return res.status(200).json(await this.zoneService.findAll());
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
        return res.status(200).json(await this.zoneService.findById(id));
    }

    public async findByName(req: Request, res: Response) {
        const { name } = req.body;

        const data = { name };

        const schema = yup.object().shape({
            name: yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });
        return res.status(200).json(await this.zoneService.findByName(name));
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
        return res.status(200).json(await this.zoneService.delete(id));
    }
}
