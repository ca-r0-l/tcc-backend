import { getRole, Role } from "../entities/Role";
import User from "../entities/User";
import UserRepository from "../gateways/UserRepository";
import InputError from "../errors/InputError";
import { checkHashPassword, saltHashPassword } from "../services/LoginService";
import { response } from "express";
import EmailNotFoundError from "../errors/EmailNotFoundError";
import PasswordNotMatchError from "../errors/PasswordNotMatchError";

export default class UserService {

    constructor(private userRepository: UserRepository) {}

    public async save(user: User): Promise<User> {

        var plainPassword = user.password;  
        var hashData = saltHashPassword(plainPassword);  
        var password = hashData.passwordHash;  
        var salt = hashData.salt;

        if (this.verifyRoleNotExists(user)) {
            throw new InputError("Role not exists");
        }
        
        if (!await this.verifyEmailAlreadyExists(user.email)) {
            throw new InputError("Email already exists");
        }
        
        return await this.userRepository.save({
            id: user.id,
            name: user.name,
            department: user.department,
            role: user.role,
            email: user.email,
            password: password,
            salt: salt
        } as User);
    }

    private verifyRoleNotExists(user: User): boolean {
        return getRole(user.role) !== Role.ADMIN && getRole(user.role) !== Role.COMMON;
    }

    private async verifyEmailAlreadyExists(email: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        if (user === null) return true;
        return false;
    }

    public async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }

    public async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    public async login(email: string, password: string, salt: string): Promise<boolean> {
        const user = await this.findByEmail(email);

        if (user) {
            const hashed_password = checkHashPassword(password, salt).passwordHash;
            const encrypted_password = user.password;
            if (hashed_password === encrypted_password) {  
                return true;
            } else {  
                throw new PasswordNotMatchError("Senha incorreta");
            }  
        } else {
            throw new EmailNotFoundError("Usuário com esse email não encontrado");
        }
    }
}
