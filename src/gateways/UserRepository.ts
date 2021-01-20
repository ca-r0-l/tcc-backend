import User from "../entities/User";

export default interface UserRepository {
    save(user: User): Promise<User>
    
    findAll(): Promise<User[]>

    findById(is: string): Promise<User>
}