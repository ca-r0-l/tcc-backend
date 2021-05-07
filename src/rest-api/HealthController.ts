import { Request, Response } from "express";

export default class HealthController {
    constructor() {}
    
    public async health(req: Request, res: Response) {
        return res.status(200).json("Sistema funcionando...");
    }
}
