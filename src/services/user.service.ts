import User from '../models/User';
import bcrypt from 'bcrypt';

export class UserService {
    async createUser(userData: any): Promise<any> {
        const newUser = await User.create(userData);
        return newUser;
    }

    async getUserById(id: string): Promise<any> {
        const user = await User.findOne({ identifiantUtilisateur: id });
        return user;
    }

    async updateUser(id: string, updateData: any): Promise<any> {
        if (updateData.hashMotDePasse) {
            updateData.hashMotDePasse = await bcrypt.hash(updateData.hashMotDePasse, 12);
        }
        const updatedUser = await User.findOneAndUpdate({ identifiantUtilisateur: id }, updateData, { new: true });
        return updatedUser;
    }

    async deleteUser(id: string): Promise<any> {
        const deletedUser = await User.findOneAndDelete({ identifiantUtilisateur: id });
        return deletedUser;
    }
}
