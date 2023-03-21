import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

//me gjeneru token kjo metode
export const getToken = (user: any) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, JWT_SECRET, {
        expiresIn: '48h'
    })
}

export const isAuth = (req: any, res: any, next: any) => {
    const token = req.headers.authorization; //ketu rrin tokeni ne authorization t headerit
    if (token) {
        const onlyToken = token.slice(7, token.length); //per me marr veq pjesen e tokenit me fshi ata Bearer
        jwt.verify(onlyToken, JWT_SECRET, (err: any, decode: any) => {
            if (err) {
                return res.status(401).send({
                    msg: 'Invalid token. Token expired!'
                })
            }
            req.user = decode;
            next();
            return
        });
    } else {
        return res.status(401).send({
            msg: 'Token is not supplied.'
        });
    }
}

export const isAdmin = (req: any, res: any, next: any) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({
        msg: 'Admin Token is not valid.'
    })
}