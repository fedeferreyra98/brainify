import User from '../models/user.model.js';
import {generateToken} from '../utils/tokenManager.js';

class AuthenticationService{
    async createUser(user){
        const newUser = new User(user);
        await newUser.save();
        return newUser.toObject();
    }
    async authenticateUser(userId){
        const {token, expiresIn} = generateToken(userId);
        return {token, expiresIn};
    }
    async findUserById(userId){
        return await User.findById(userId);
    }
    async findUserByEmail(email){
        return await User.findOne({email});
    }
    async comparePassword(user, password){
        return await user.comparePassword(password);
    }

    async changePassword(userId, originalPass, newPass){
        const user = await this.findUserById(userId);
        const isMatch = await this.comparePassword(user, originalPass);
        if (!isMatch) {
            throw new Error("Credenciales Invalidas.");
        }
        user.password = newPass;
        await user.save();
    }
}

export default new AuthenticationService();