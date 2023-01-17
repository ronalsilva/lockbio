import jwt from 'jsonwebtoken';
import config from '../../config/Auth';

export default async (req:any, res:any, next:any) => {
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).json({
        error: true,
        message: 'Invalid authentication token'
    })

    const token = auth.split(' ')[0];
    try {
        const decoded = jwt.verify(token, config.secret);
        if(!decoded) {
            return res.status(401).json({
                error: true,
                message: 'The token is expired'
            })
        } else {
            req.id = decoded;
            next();
        }
    } catch {
        return res.status(401).json({
            error: true,
            message: 'The token is invalid'
        })
    }
}