import userRepository from "../repositories/user.repository.js";

class UserService {
    async findById(id) {
        return await userRepository.findById(id);
    }

    async findByEmail(email) {
        return await userRepository.findByEmail(email);
    }

    async update(id, userData) {
        return await userRepository.update(id, userData).lean();
    }
}

export default new UserService();