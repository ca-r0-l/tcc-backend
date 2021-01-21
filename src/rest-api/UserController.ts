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

        const data = {
            name,
            department,
            role,
            email,
            password
        };

        const schema = yup.object().shape({
            name: yup.string().required(),
            department: yup.string().required(),
            role: yup.number().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        return res.status(201).json(
            await this.userService.save(new User(data))
        );
    }

    public async findAll(req: Request, res: Response) {
        return res.status(200).json(await this.userService.findAll());
    }
}
