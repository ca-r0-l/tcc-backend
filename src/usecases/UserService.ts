import { getRole, Role } from "../entities/Role";
import jwt from "jsonwebtoken";
import User from "../entities/User";
import UserRepository from "../gateways/UserRepository";
import InputError from "../errors/InputError";
import { checkHashPassword, saltHashPassword } from "../services/LoginService";
import EmailNotFoundError from "../errors/EmailNotFoundError";
import PasswordNotMatchError from "../errors/PasswordNotMatchError";
import UserLoggedIn from "../entities/UserLoggedIn";

export default class UserService {

    constructor(private userRepository: UserRepository) {}

    public async save(user: User): Promise<User> {

        var plainPassword = user.password;  
        var hashData = saltHashPassword(plainPassword);  
        var password = hashData.passwordHash;  
        var salt = hashData.salt;

        this.checkRoleExist(user);
        
        await this.checkEmailNotExist(user.email);
        
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

    public async update(user: User): Promise<User> {

        var plainPassword = user.password;  
        var hashData = saltHashPassword(plainPassword);  
        var password = hashData.passwordHash;  
        var salt = hashData.salt;

        this.checkRoleExist(user);
        
        return await this.userRepository.update({
            id: user.id,
            name: user.name,
            department: user.department,
            role: user.role,
            email: user.email,
            password: password,
            salt: salt
        } as User);
    }

    private checkRoleExist(user: User): void {
        if (getRole(user.role) !== Role.ADMIN && getRole(user.role) !== Role.COMMON) {
            throw new InputError("Tipo de conta não existe");
        }
    }

    private async checkEmailNotExist(email: string): Promise<void> {
        const user = await this.findByEmail(email);
        if (user !== null) {
            throw new InputError("Email já existe");
        }
    }

    public async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }

    public async findById(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    public async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    public async login(email: string, password: string): Promise<UserLoggedIn> {
        const user = await this.findByEmail(email);

        if (user) {
            const hashedPassword = checkHashPassword(password, user.salt).passwordHash;
            const encryptedPassword = user.password;
            if (hashedPassword === encryptedPassword) {  
                return new UserLoggedIn(user, jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '1d' }));
            } else {  
                throw new PasswordNotMatchError("Senha incorreta");
            }  
        } else {
            throw new EmailNotFoundError("Usuário com esse email não encontrado");
        }
    }

    public async delete(id: string): Promise<void> {
        return await this.userRepository.delete(id);
    }
}
