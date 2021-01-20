import User from "../entities/User";
import UserRepository from "../gateways/UserRepository";

export default class UserService {

    constructor(private userRepository: UserRepository) {}

    public async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}
