import User from '../models/User';
import bcrypt from 'bcrypt';

// Créer un utilisateur
export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir un utilisateur par son identifiant
export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ identifiantUtilisateur: req.params.id });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Hacher le mot de passe si présent dans la demande de mise à jour
    if (updateData.hashMotDePasse) {
        updateData.hashMotDePasse = await bcrypt.hash(updateData.hashMotDePasse, 12);
    }

    try {
        const updatedUser = await User.findOneAndUpdate({ identifiantUtilisateur: id }, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ identifiantUtilisateur: req.params.id });
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
