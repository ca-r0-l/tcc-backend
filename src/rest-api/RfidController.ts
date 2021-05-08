import { Request, Response } from "express";
import * as yup from 'yup';
import Rfid from "../entities/Rfid";
import RfidService from "../usecases/RfidService";

export default class RfidController {
    constructor(private rfidService: RfidService) {}
    
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
            await this.rfidService.save(new Rfid(data))
        );
    }

    public async findAll(req: Request, res: Response) {
        return res.status(200).json(await this.rfidService.findAll());
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
        return res.status(200).json(await this.rfidService.findById(id));
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
        return res.status(200).json(await this.rfidService.delete(id));
    }
}
