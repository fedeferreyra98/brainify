import User from "../models/user.model.js";

class UserRepository {
    async findById(id) {
        return await User.findById(id);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async update(id, userData) {
        const user = await User.findById(id);
        Object.assign(user, userData);
        await user.save();
        return user.toObject();
        }
    
    async getPublicProfile(user) {
        const { firstName, lastName, degree, experience, phoneNumber, email, profileImgUrl} = user;
        return { firstName, lastName, degree, experience, phoneNumber, email, profileImgUrl};
    }
}

export default new UserRepository();