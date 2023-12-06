import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import * as jwt from 'jsonwebtoken';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.getUser = this.getUser.bind(this);
        this.login = this.login.bind(this);
    }

    async createUser(req: Request, res: Response) {
        try {
            const newUser = await this.userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const user = await this.userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async login(req: Request, res: Response) {
        try {
            const user = await this.userService.getUserByEmailAndPassword(req.body.courriel, req.body.password);

            const token = await jwt.sign(
                { id: user._id, firstName: user.firstName, lastName: user.lastName },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
          
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const updatedUser = await this.userService.updateUser(req.params.id, req.body);
            if (!updatedUser) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const deletedUser = await this.userService.deleteUser(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json({ message: 'Utilisateur supprimé' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
