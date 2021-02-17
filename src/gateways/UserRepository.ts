import User from "../entities/User";

export default interface UserRepository {
    save(user: User): Promise<User>

    update(user: User): Promise<User>
    
    findAll(): Promise<User[]>

    findById(id: string): Promise<User | null>

    findByEmail(email: string): Promise<User | null>
}