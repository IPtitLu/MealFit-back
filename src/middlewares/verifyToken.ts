import jwt from 'jsonwebtoken';
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader) {
        return res.status(403).send({ message: 'No token provided.' });
    }
    const token = bearerHeader.split(" ")[1];
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Failed to authenticate token.' });
        }
        //check if accesToken expired
        if (!decoded.exp || decoded.exp < Date.now() / 1000) {
            throw new Error("Invalid access token");
        }

        //find user by id
        const user = User.findOne({ _id: decoded.id });
        req.user = user;

        next();
    });
};