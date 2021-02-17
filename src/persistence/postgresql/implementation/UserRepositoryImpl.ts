import { getConnection, getRepository, UpdateResult } from "typeorm";
import { getRole } from "../../../entities/Role";
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
            role: user.role,
            email: user.email,
            password: user.password,
            salt: user.salt
        } as UserModel
        
        return this.toUser(await userRepository.save(
            userRepository.create(userToSave)
        ));
    }
    
    public async update(user: User): Promise<User> {
        const userRepository = getRepository(UserModel);

        const userToSave = {
            name: user.name,
            department: user.department,
            role: user.role,
            email: user.email,
            password: user.password,
            salt: user.salt
        } as UserModel;
        
        await userRepository.update(
            {id: user.id},
            userToSave
        );
        
        return await this.findById(user.id);
    }

    public async findAll(): Promise<User[]> {
        const userRepository = getRepository(UserModel);
        
        const allUsers = await userRepository.find();
        return allUsers.map(user => this.toUser(user));
    }

    public async findById(id: string): Promise<User> {
        const userRepository = getRepository(UserModel);
        
        return this.toUser(await userRepository.findOne({ where : {id: id}}));
    }
    
    public async findByEmail(email: string): Promise<User> {
        const userRepository = getRepository(UserModel);

        return this.toUser(await userRepository.findOne({ where : {email: email}}));
    }

    private toUser(userModel?: UserModel): User | null{
        if (userModel !== null && userModel !== undefined) {
            return {
                id: userModel.id,
                name: userModel.name,
                department: userModel.department,
                role: getRole(userModel.role),
                email: userModel.email,
                password: userModel.password,
                salt: userModel.salt,
            } as User;
        } else {
            return null;
        }
    }
}
