
import { Request, Response } from "express";
import * as yup from 'yup';
import User from "../entities/User";
import UserService from "../usecases/UserService";

export default class UserController {
    constructor(private userService: UserService) {}
    
    public async save(req: Request, res: Response) {

        const {
            name,
            department,
            role,
            email,
            password
        } = req.body;

        return res.json(await this.userService.save(new User({name,
            department,
            role,
            email,
            password
        })));
    }
}
