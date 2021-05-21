import { Request, Response } from "express";
import BrokerService from "../services/BrokerService";

export default class BrokerController {
    constructor(private brokerService: BrokerService) {}
    
    public async receiveBrokerUpdate(req: Request, res: Response) {
        return res.status(200).json(await this.brokerService.receiveBrokerUpdate());
    }
}
