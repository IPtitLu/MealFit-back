import User from '../models/User';
import bcrypt from 'bcrypt';

export class UserService {
    async createUser(userData: any): Promise<any> {
        const newUser = await User.create(userData);
        return newUser;
    }

    async getUserById(id: string): Promise<any> {
        const user = await User.findOne({ _id: id });
        return user;
    }

    async getUserByEmailAndPassword(courriel: string, password: string): Promise<any> {
        const user = await User.findOne({ courriel: courriel });
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return null;
        }

        return user;
    }

    async updateUser(id: string, updateData: any): Promise<any> {
        if (updateData.hashMotDePasse) {
            updateData.hashMotDePasse = await bcrypt.hash(updateData.hashMotDePasse, 12);
        }
        const updatedUser = await User.findOneAndUpdate({ _id: id }, updateData, { new: true });
        return updatedUser;
    }

    async deleteUser(id: string): Promise<any> {
        const deletedUser = await User.findOneAndDelete({ _id: id });
        return deletedUser;
    }
}
