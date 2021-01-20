import { getRepository } from "typeorm";
import { Role } from "../../../entities/Role";
import User from "../../../entities/User";
import UserRepository from "../../../gateways/UserRepository";
import UserModel from "../models/UserModel";

export default class UserRepositoryImpl implements UserRepository {
    
    public async save(user: User): Promise<User> {
        const userRepository = getRepository(UserModel);

        const userToSave = {
            id: user.id,
            name: user.name,
            department: user.department,
            role: user.role.toString(),
            email: user.email,
            password: user.password
        } as UserModel
        
        return this.toUser(await userRepository.save(
            userRepository.create(userToSave)
        ));
    }

    async findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    private toUser(userModel: UserModel): User {
        return {
            id: userModel.id,
            name: userModel.name,
            department: userModel.department,
            role: Role[userModel.role],
            email: userModel.email,
            password: userModel.password,
        } as User;
    }
}
