import { getRole, Role } from "../entities/Role";
import User from "../entities/User";
import UserRepository from "../gateways/UserRepository";
import InputError from "../errors/InputError";

export default class UserService {

    constructor(private userRepository: UserRepository) {}

    public async save(user: User): Promise<User> {

        if (this.verifyRoleNotExists(user)) {
            throw new InputError("Role not exists");
        }
        
        if (!await this.verifyEmailAlreadyExists(user.email)) {
            throw new InputError("Email already exists");
        }

        return await this.userRepository.save(user);
    }

    private verifyRoleNotExists(user: User): boolean {
        return getRole(user.role) !== Role.ADMIN && getRole(user.role) !== Role.COMMON;
    }

    private async verifyEmailAlreadyExists(email: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        if (user != null) return true;
        return false;
    }

    public async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }

    public async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}
