import User from "../entities/User";

export default interface UserRepository {
    save(user: User): Promise<User>
    
    findAll(): Promise<User[]>

    findById(id: string): Promise<User>

    findByEmail(email: string): Promise<User | null>
}