import { Request, Response } from "express";
import BrokerService from "../services/BrokerService";

export default class BrokerController {
    constructor(private brokerService: BrokerService) {}
    
    public async receiveBrokerUpdate(req: Request, res: Response) {
        console.log("\n\nBody =>" + JSON.stringify(req.body))
        return res.status(200).json(await this.brokerService.receiveBrokerUpdate(req.body));
    }
}
